<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog :initial-focus="buttonRef" as="div" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              v-if="presistant"
              class="fixed inset-0 bg-black bg-opacity-50"
              @click.stop
            />

            <DialogOverlay
              v-else
              class="fixed inset-0 bg-black bg-opacity-50"
              @click.stop
            />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="
                inline-block
                w-full
                max-w-md
                p-6
                my-8
                overflow-hidden
                text-left
                align-middle
                transition-all
                transform
                bg-white
                shadow-xl
                rounded-2xl
              "
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                <slot name="title"></slot>
              </DialogTitle>
              <div class="mt-2">
                <slot></slot>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  :ref="buttonRef"
                  :disabled="loading"
                  class="
                    inline-flex
                    justify-center
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-blue-900
                    bg-blue-100
                    border border-transparent
                    rounded-md
                    hover:bg-blue-200
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-offset-2
                    focus-visible:ring-blue-500
                  "
                  @click="$emit('okay')"
                >
                  <div
                    v-if="loading"
                    class="
                      animate-spin
                      rounded-full
                      my-0.5
                      h-4
                      w-4
                      border-t-2 border-b-2 border-purple-500
                    "
                  ></div>
                  <span v-else> Okay </span>
                </button>
                <button
                  type="button"
                  class="
                    inline-flex
                    justify-center
                    ml-2
                    px-4
                    py-2
                    text-sm
                    font-medium
                    border border-transparent
                    rounded-md
                    hover:bg-blue-100
                    focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-offset-2
                  "
                  :disabled="loading"
                  @click="closeModal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { toRef, computed, ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  props: { modelValue: Boolean, loading: Boolean, presistant: Boolean },
  emits: ["update:modelValue", "okay"],
  setup(props, { emit }) {
    const open = toRef(props, "modelValue");
    const buttonRef = ref(null);
    const isOpen = computed({
      get() {
        return open.value;
      },
      set() {
        emit("update:modelValue", false);
      },
    });

    return {
      isOpen,
      buttonRef,
      closeModal() {
        isOpen.value = false;
      },
      openModal() {
        isOpen.value = true;
      },
    };
  },
};
</script>
