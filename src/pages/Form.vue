<template>
  <div class="container max-w-screen-md mx-auto p-4">
    <Alert v-if="isOffline" type="error" message="you are currently offline" />
    <Alert v-if="error" type="error" :message="error" />
    <form @submit.prevent="submitForm">
      <input-field
        v-model="entry.name"
        required
        label="Full Name"
      ></input-field>

      <input-field
        v-model="entry.phone"
        class="mt-3"
        label="Phone No."
        required
      ></input-field>

      <file-upload-vue
        ref="fileUploader"
        :uploads="dbEntry.files"
      ></file-upload-vue>
      <button
        class="
          rounded-md
          text-white
          bg-indigo-500
          hover:bg-indigo-600
          py-2
          px-4
        "
        :class="[loading ? 'animate-pulse' : '']"
        :disabled="loading"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "../firebase";

import FileUploadVue from "../components/FileUpload.vue";
import Alert from "../components/Alert.vue";
export default {
  name: "Form",
  components: { FileUploadVue, Alert },

  data: () => ({
    loading: false,
    isOffline: false,
    error: "",
    entry: {
      name: "",
      phone: "",
    },
    dbEntry: {
      files: [],
    },
  }),
  computed: {
    email() {
      return this.$store.state.user?.email;
    },
  },
  created() {
    this.getInputs();
  },
  mounted() {
    window.addEventListener("online", this.changedConnection);
    window.addEventListener("offline", this.changedConnection);
  },
  beforeUnmount() {
    window.removeEventListener("online", this.changedConnection);
    window.removeEventListener("offline", this.changedConnection);
  },
  methods: {
    changedConnection(e) {
      if (e.type === "offline") {
        return (this.isOffline = true);
      }
      if (e.type === "online") {
        return (this.isOffline = false);
      }
    },
    submitForm() {
      if (!this.email) {
        this.$store.commit("REGISTER_DIALOG_OPEN");
        return;
      }
      console.log(this.$refs.fileUploader.files);
    },
    getInputs() {
      if (!this.email) return;
      this.loading = true;
      const docRef = doc(db, "responds", this.email);
      getDoc(docRef)
        .then((doc) => {
          this.error = "";
          if (doc.exists()) {
            const { name, phone } = doc.data();
            this.entry = { name, phone };
            this.dbEntry = doc.data();
          }
        })
        .catch((err) => {
          this.error = err.message;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    saveRespond() {},
    async uploadFile(file) {
      const uploads = storageRef(storage, "/uploads/" + this.email);
      const fileRef = storageRef(uploads, file.name);
      const [res, url] = await Promise.all([
        uploadBytes(fileRef, file.objectUrl),
        getDownloadURL(fileRef),
      ]);
      return {
        name: file.name,
        size: file.size,
        url,
        isImg: file.isImg,
      };
    },
  },
};
</script>
