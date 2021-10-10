<template>
  <div class="container max-w-screen-md mx-auto py-2 px-4">
    <form class="mt-4">
      <input-field v-model="candidate.fullName" label="Full Name"></input-field>
      <input-field
        v-model="candidate.email"
        class="mt-3"
        type="email"
        label="E-mail"
      ></input-field>
      <input-field
        v-model="candidate.phone"
        class="mt-3"
        label="Phone No."
      ></input-field>
      <file-upload-vue></file-upload-vue>
      <button
        class="
          rounded-md
          text-white
          bg-indigo-500
          hover:bg-indigo-600
          py-2
          px-4
        "
      >
        Save
      </button>
    </form>
  </div>
</template>

<script>
import FileUploadVue from "../components/FileUpload.vue";
export default {
  name: "Form",
  components: { FileUploadVue },
  data: () => ({
    candidate: {
      fullName: "",
      email: "",
      phone: "",
    },
  }),
};
</script>
