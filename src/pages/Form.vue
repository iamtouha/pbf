<template>
  <div class="container max-w-screen-md mx-auto p-4">
    <Alert v-if="isOffline" type="error" message="you are currently offline" />
    <Alert v-if="error" type="error" :message="error" />
    <Alert v-if="success" type="success" :message="success" />
    <form @submit.prevent="submitForm">
      <p class="my-4 py-4 pl-4 border-l-4 border-indigo-600 bg-gray-100">
        Your responses will be saved Automatically
      </p>
      <input-field
        v-model.trim="entry.name"
        :disabled="email && !loaded"
        required
        label="Full Name"
      ></input-field>

      <input-field
        v-model.trim="entry.phone"
        :disabled="email && !loaded"
        class="mt-3"
        label="Phone No."
        required
      ></input-field>

      <file-upload-vue
        ref="fileUploader"
        :uploads="dbEntry.files"
        :disabled="email && !loaded"
        :loading="uploading"
        :removing="removingId"
        @remove-file="removeFile"
        @upload-file="uploadFile"
        @limit-end="
          () => {
            error = 'You can upload max. 5 files. remove existing file(s).';
          }
        "
        @too-large="() => (error = 'file size cannot exceed 1MB.')"
      >
      </file-upload-vue>
    </form>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import {
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase";

import FileUploadVue from "../components/FileUpload.vue";
import Alert from "../components/Alert.vue";
export default {
  name: "Form",
  components: { FileUploadVue, Alert },

  data: () => ({
    loading: false,
    uploading: false,
    isOffline: false,
    removingId: "",
    error: "",
    success: "",
    entry: {
      name: "",
      phone: "",
    },
    loaded: false,
    dbEntry: {
      files: {},
    },
    unsubEntry: null,
  }),
  computed: {
    email() {
      return this.$store.state.user?.email;
    },
  },
  watch: {
    success(val) {
      if (val.length) {
        setTimeout(() => {
          this.success = "";
        }, 5000);
      }
    },
    error(val) {
      if (val.length) {
        setTimeout(() => {
          this.error = false;
        }, 5000);
      }
    },
    email(newVal) {
      if (newVal && !this.loaded) {
        this.getInputs();
      }
    },
    entry: {
      deep: true,
      handler: "saveEntry",
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
    if (this.unsubEntry) {
      this.unsubEntry();
    }
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

    saveEntry: debounce(function (val) {
      if (!this.email) {
        this.$store.commit("REGISTER_DIALOG_OPEN");
        return;
      }

      const { name, phone } = val;
      if (name === this.dbEntry.name && phone === this.dbEntry.phone) {
        return;
      }
      const docRef = doc(db, "responds", this.email);
      updateDoc(docRef, { name, phone })
        .then(() => console.log("saved " + new Date().toLocaleString()))
        .catch((err) => (this.error = err.message));
    }, 1000),
    getInputs() {
      if (!this.email) return;
      const docRef = doc(db, "responds", this.email);
      this.unsubEntry = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const { name, phone } = docSnap.data();
            this.dbEntry = docSnap.data();
            if (!this.loaded) {
              this.entry = { name, phone };
            }
          }
          this.loaded = true;
        },
        (err) => (this.error = err.message)
      );
    },
    async uploadFile(file) {
      if (!this.email) {
        this.$store.commit("REGISTER_DIALOG_OPEN");
        return;
      }
      try {
        this.uploading = true;
        const fileRef = storageRef(
          storage,
          `/uploads/${this.email}/${file.id}.${file.name?.split(".").pop()}`
        );
        const docRef = doc(db, "responds", this.email);
        await uploadBytes(fileRef, file.data);
        const url = await getDownloadURL(fileRef);
        const fileDoc = {
          id: file.id,
          name: file.name,
          size: file.size,
          url,
          isImg: file.isImg,
          storagePath: fileRef.fullPath,
        };
        await updateDoc(docRef, {
          [`files.${fileDoc.id}`]: fileDoc,
        });
      } catch (error) {
        this.error = error.message;
      } finally {
        this.uploading = false;
      }
    },
    removeFile(key) {
      this.removingId = key;
      const file = this.dbEntry.files[key];
      const fileRef = storageRef(storage, file.storagePath);
      const docRef = doc(db, "responds", this.email);
      Promise.all([
        updateDoc(docRef, {
          [`files.${key}`]: deleteField(),
        }),
        deleteObject(fileRef),
      ])
        .then()
        .catch((err) => {
          this.error = err.message;
        });
    },
  },
};
</script>
