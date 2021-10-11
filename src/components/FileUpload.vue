<template>
  <div class="mx-auto h-full">
    <!-- file upload modal -->
    <article
      aria-label="File Upload Modal"
      class="relative flex flex-col rounded-md"
      @drop="dropHandler"
      @dragleave="dragLeaveHandler"
      @dragover="dragOverHandler"
      @dragenter="dragEnterHandler"
    >
      <!-- overlay -->
      <div
        id="overlay"
        :class="[dragOver ? 'draggedover' : '']"
        class="
          w-full
          h-full
          absolute
          top-0
          left-0
          pointer-events-none
          z-50
          flex flex-col
          items-center
          justify-center
          rounded-md
        "
      >
        <i>
          <svg
            class="fill-current w-12 h-12 mb-3 text-blue-700"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z"
            />
          </svg>
        </i>
        <p class="text-lg text-blue-700">Drop files to upload</p>
      </div>

      <!-- scroll area -->
      <section class="overflow-auto p-8 w-full h-full flex flex-col">
        <header
          class="
            border-dashed border-2 border-gray-400
            rounded-md
            py-12
            flex flex-col
            justify-center
            items-center
          "
        >
          <p
            class="
              mb-3
              font-semibold
              text-gray-900
              flex flex-wrap
              justify-center
            "
          >
            <span>Drag and drop your</span>&nbsp;<span>file anywhere or</span>
          </p>
          <input
            ref="hiddenInput"
            type="file"
            class="hidden"
            @change="selectFiles"
          />
          <button
            id="button"
            type="button"
            :disabled="disabled"
            class="
              mt-2
              rounded-sm
              px-3
              py-1
              bg-gray-200
              hover:bg-gray-300
              disabled:bg-gray-300 disabled:text-gray-600
              focus:shadow-outline focus:outline-none
            "
            @click="() => hiddenInput.click()"
          >
            {{ loading ? "Uploading..." : "Upload a file" }}
          </button>
        </header>

        <h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
          Uploaded
        </h1>

        <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
          <li
            v-if="noUpload"
            id="empty"
            class="
              h-full
              w-full
              text-center
              flex flex-col
              items-center
              justify-center
            "
          >
            <img
              class="mx-auto w-32"
              src="../assets/no-data.png"
              alt="no data"
            />
            <span class="text-small text-gray-500">No file uploaded</span>
          </li>
          <FileThumb
            v-for="(item, key) in uploads"
            :key="key"
            :file="item"
            :disabled="removing === key"
            @remove-file="$emit('remove-file', key)"
          />
        </ul>
      </section>
    </article>
  </div>
</template>

<script>
import { ref, reactive, toRefs, computed } from "vue";
import isEmpty from "lodash.isempty";
import { nanoid } from "nanoid";
import FileThumb from "./FileThumb.vue";
export default {
  name: "FileUpload",
  components: { FileThumb },
  props: {
    uploads: Object,
    removing: String,
    disabled: Boolean,
    loading: Boolean,
  },
  emits: ["remove-file", "upload-file", "limit-end", "too-large"],
  setup(props, { emit }) {
    const hiddenInput = ref(null);
    const dragOver = ref(false);
    const counter = ref(0);
    const files = reactive([]);
    const { uploads } = toRefs(props);
    const { disabled } = toRefs(props);
    const noUpload = computed(() => isEmpty(uploads.value));
    const hasFiles = ({ dataTransfer: { types = [] } }) =>
      types.indexOf("Files") > -1;

    function addFile(file) {
      if (disabled.value) return;
      if (file.size / 1024 > 1024) {
        return emit("too-large");
      }
      const obj = {
        id: nanoid(),
        isImg: file.type.match("image.*"),
        data: file,
        name: file.name,
        size: file.size,
      };
      if (Object.keys(uploads.value || {}).length >= 5) {
        return emit("limit-end");
      }
      emit("upload-file", obj);
    }

    function removeFile(i) {
      const [file] = files.splice(i, 1);
      if (!file) return;
      URL.revokeObjectURL(file.objUrl);
    }

    function dropHandler(ev) {
      ev.preventDefault();
      for (const file of ev.dataTransfer.files) {
        addFile(file);
        dragOver.value = false;
        counter.value = 0;
      }
    }
    function dragEnterHandler(e) {
      e.preventDefault();
      if (!hasFiles(e)) {
        return;
      }
      if (++counter.value) dragOver.value = true;
    }

    function dragLeaveHandler(e) {
      if (1 > --counter.value) dragOver.value = false;
    }

    function dragOverHandler(e) {
      if (hasFiles(e)) {
        e.preventDefault();
      }
    }

    function selectFiles(e) {
      for (const file of e.target.files) {
        addFile(file);
      }
    }

    function flush() {
      files.forEach((file) => {
        URL.revokeObjectURL(file.objUrl);
      });
      files.length = 0;
    }
    return {
      hiddenInput,
      dragOver,
      files,
      uploads,
      disabled,
      noUpload,
      selectFiles,
      removeFile,
      dropHandler,
      dragOverHandler,
      dragEnterHandler,
      dragLeaveHandler,
      flush,
    };
  },
};
</script>

<style>
.hasImage:hover section {
  background-color: rgba(5, 5, 5, 0.4);
}
.hasImage:hover button:hover {
  background: rgba(5, 5, 5, 0.45);
}

#overlay p,
i {
  opacity: 0;
}

#overlay.draggedover {
  background-color: rgba(255, 255, 255, 0.7);
}
#overlay.draggedover p,
#overlay.draggedover i {
  opacity: 1;
}

.group:hover .group-hover\:text-blue-800 {
  color: #2b6cb0;
}
</style>
