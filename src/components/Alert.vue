<template>
  <div class="p-2">
    <div
      :class="[
        type === 'error'
          ? 'text-red-600 bg-red-50'
          : 'text-green-600 bg-green-50',
      ]"
      class="
        max-w-min
        mx-auto
        flex
        items-center
        leading-none
        rounded-full
        p-2
        text-teal text-sm
      "
    >
      <span
        :class="[type === 'error' ? 'bg-red-600' : 'bg-green-600']"
        class="
          flex-grow-0
          inline-flex
          text-white
          rounded-full
          h-6
          px-3
          justify-center
          items-center
        "
      >
        {{ type === "error" ? "Error" : "Success" }}!
      </span>
      <span class="flex-grow-1 px-2 whitespace-nowrap">
        {{ message }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    type: String,
    message: String,
  },
};
</script>

<style></style>
