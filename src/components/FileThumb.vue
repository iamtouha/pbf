<template>
  <li class="block p-1 w-1/2 sm:w-1/3 lg:w-1/4 h-24">
    <article
      tabindex="0"
      :class="[file.isImg ? 'hasImage text-transparent hover:text-white' : '']"
      class="
        group
        w-full
        h-full
        rounded-md
        focus:outline-none focus:shadow-outline
        bg-gray-100
        cursor-pointer
        relative
        shadow-sm
      "
    >
      <img
        v-if="file.isImg"
        :alt="file.name"
        :src="file.objUrl || file.url"
        class="
          img-preview
          w-full
          h-full
          sticky
          object-cover
          rounded-md
          bg-fixed
        "
      />

      <section
        class="
          flex flex-col
          rounded-md
          text-xs
          break-words
          w-full
          h-full
          z-20
          absolute
          top-0
          py-2
          px-3
        "
      >
        <h1
          :class="['flex-1', file.isImg ? '' : 'group-hover:text-indigo-800']"
        >
          {{ file.name }}
        </h1>
        <div class="flex">
          <span :class="['p-1', file.isImg ? '' : 'text-indigo-800']">
            <i>
              <svg
                class="fill-current w-4 h-4 ml-auto pt-1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
              </svg>
            </i>
          </span>
          <p :class="['p-1', 'text-xs', file.isImg ? '' : 'text-gray-700']">
            {{ Math.ceil(file.size / 1024) }}kb
          </p>
          <button
            :disabled="disabled"
            class="
              delete
              ml-auto
              focus:outline-none
              hover:bg-gray-300
              disabled:bg-gray-300 disabled:text-gray-600
              p-1
              rounded-md
            "
            type="button"
            :class="[file.isImg ? '' : 'text-grey-800']"
            @click="$emit('remove-file')"
          >
            <svg
              class="pointer-events-none fill-current w-4 h-4 ml-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                class="pointer-events-none"
                d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
              />
            </svg>
          </button>
        </div>
      </section>
    </article>
  </li>
</template>

<script>
export default {
  name: "FileThumb",
  emits: ["remove-file"],
  props: {
    file: {
      type: Object,
      required: true,
    },
    disabled: Boolean,
  },
};
</script>

<style></style>
