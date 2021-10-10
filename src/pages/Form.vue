<template>
  <div class="container max-w-screen-md mx-auto py-2 px-4">
    <form @submit.prevent="submitForm" class="mt-4">
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
      <p v-if="error" class="text-red-600">{{ error }}</p>
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
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

import FileUploadVue from "../components/FileUpload.vue";
export default {
  name: "Form",
  components: { FileUploadVue },
  data: () => ({
    loading: false,
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
  methods: {
    submitForm() {
      console.log(this.$refs.fileUploader.files);
    },
    getInputs() {
      this.loading = true;
      const docRef = doc("responds", this.email);
      getDoc(docRef)
        .then((doc) => {
          if (doc.exists) {
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
  },
};
</script>
