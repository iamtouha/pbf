<template>
  <nav-bar-vue />
  <router-view />
  <popup-modal v-model="isOpen" :loading="loading" @okay="sendLoginUrl">
    <template #title> Enter your email </template>
    <input-field
      v-model="email"
      class="py-6"
      placeholder="username@example.com"
    />
  </popup-modal>
  <popup-modal v-model="emailSent" @okay="emailSent = false">
    <template #title> Sign Up email sent</template>
    A sign-up email is sent to your email. please follow the link to fill up the
    form.
  </popup-modal>
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import NavBarVue from "./components/NavBar.vue";
import PopupModal from "./components/PopupModal.vue";

const store = useStore();

const email = ref("");
const emailSent = ref(false);
const loading = ref(false);

const isOpen = computed({
  get: () => store.state["registerDialog"],
  set: (val) =>
    val
      ? store.commit("REGISTER_DIALOG_OPEN")
      : store.commit("REGISTER_DIALOG_CLOSE"),
});

function sendLoginUrl() {
  if (!email.value.trim().length) {
    return;
  }
  loading.value = true;
  isOpen.value = false;
  setTimeout(() => {
    emailSent.value = true;
  }, 500);
}
</script>
