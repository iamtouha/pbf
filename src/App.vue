<template>
  <nav-bar-vue :loading="signingIn" />
  <router-view />
  <popup-modal
    v-model="isOpen"
    presistant
    :loading="loading"
    @okay="sendLoginUrl"
  >
    <template #title> Enter your email </template>
    <input-field
      v-model="email"
      class="pt-6"
      placeholder="username@example.com"
      @keyup.enter="sendLoginUrl"
    />
    <p v-if="!error" class="mb-9"></p>
    <p
      class="text-red-600 ml-2 mb-4 transition-all duration-200"
      :class="[error ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0']"
    >
      {{ error }}
    </p>
  </popup-modal>
  <popup-modal v-if="!user" v-model="emailSent" @okay="emailSent = false">
    <template #title> Sign Up email sent</template>
    A sign-up email is sent to your email. please follow the link to fill up the
    form.
  </popup-modal>
  <popup-modal
    v-if="!user"
    presistant
    v-model="signInEmailModal"
    @okay="emailEntered"
  >
    <template #title> Re-Enter email for verification</template>
    <input-field
      v-model="signinEmail"
      class="py-6"
      placeholder="username@example.com"
      @keyup.enter="emailEntered"
    />
  </popup-modal>
  <popup-modal
    v-if="!user"
    v-model="signInErrorModal"
    @okay="signInErrorModal = false"
  >
    <template #title> Error Occured!</template>
    <p class="text-red-600">
      {{ signInError }}
    </p>
  </popup-modal>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "./firebase";
import NavBarVue from "./components/NavBar.vue";
import PopupModal from "./components/PopupModal.vue";

const user = auth.currentUser;
const store = useStore();
const isOpen = computed({
  get: () => store.state["registerDialog"],
  set: (val) =>
    val
      ? store.commit("REGISTER_DIALOG_OPEN")
      : store.commit("REGISTER_DIALOG_CLOSE"),
});

const email = ref("");
const emailSent = ref(false);
const loading = ref(false);
const error = ref("");

function sendLoginUrl() {
  if (!email.value.trim().length) {
    error.value = "insert an email";
    return;
  }
  loading.value = true;
  error.value = "";
  sendSignInLinkToEmail(auth, email.value, {
    url: window.location.origin,
    handleCodeInApp: true,
  })
    .then(() => {
      localStorage.setItem("email", email.value);
      isOpen.value = false;
      email.value = "";
      setTimeout(() => {
        emailSent.value = true;
      }, 500);
    })
    .catch((err) => (error.value = err.message))
    .finally(() => (loading.value = false));
  loading.value = true;
}

const signinEmail = ref("");
const signInError = ref("");
const signInEmailModal = ref(false);
const signInErrorModal = ref(false);
function checkForSignIn() {
  if (!isSignInWithEmailLink(auth, window.location.href)) {
    return;
  }
  const email = localStorage.getItem("email");
  if (!email) {
    signInEmailModal.value = true;
    return;
  }
  signIn(email);
}

onMounted(checkForSignIn);

const signingIn = ref(false);
const router = useRouter();
function signIn(email) {
  signingIn.value = true;
  signInWithEmailLink(auth, email, window.location.href)
    .then(() => {
      router.push("/form");
    })
    .catch((err) => {
      signInError.value = err.message;
      signInErrorModal.value = true;
    })
    .finally(() => (signingIn.value = false));
}
function emailEntered() {
  if (signinEmail.value.trim().length) {
    signIn(signinEmail.value);
    signinEmail.value = "";
    signInEmailModal.value = false;
  }
}
</script>
