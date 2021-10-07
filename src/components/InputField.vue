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
      class="
        focus:ring-indigo-500 focus:border-indigo-500
        flex-1
        block
        w-full
        rounded-md
        border-gray-300
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
