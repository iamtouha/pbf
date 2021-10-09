<template>
  <nav-bar-vue />
  <router-view />
  <popup-modal v-model="isOpen" @okay="sendLoginUrl">
    <template #title> Enter your email </template>
    <input-field
      v-if="step === 0"
      v-model="email"
      class="py-6"
      placeholder="username@example.com"
    />
    <p v-if="step === 1" class="py-6">
      A url is sent to your email. please follow the url to log in.
    </p>
  </popup-modal>
</template>
<script setup>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import NavBarVue from "./components/NavBar.vue";
import PopupModal from "./components/PopupModal.vue";

const store = useStore();

const email = ref("");
const step = ref(0);

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
  step.value = 1;
}
</script>
