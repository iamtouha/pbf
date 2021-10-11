<template>
  <div v-bind="$attrs">
    <label class="block text-sm font-medium text-gray-700"> {{ label }} </label
    ><input
      v-model="input"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :class="[
        error
          ? 'focus:ring-red-500 focus:border-red-500'
          : 'focus:ring-indigo-500 focus:border-indigo-500',
      ]"
      class="
        flex-1
        block
        w-full
        rounded-md
        border-gray-300
        disabled:bg-gray-100
      "
    />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    label: String,
    placeholder: String,
    type: { type: String, default: "text" },
    required: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    error: Boolean,
    modelValue: [String, Boolean, Number],
  },
  emits: ["update:modelValue"],
  computed: {
    input: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>
