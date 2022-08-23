<template>
  <div
    class="w-default h-default text-center bg-light-blue rounded-lg border-light-grey border-2 text-lg mb-8 leading-5.5"
    :class="{ 'border-red-error': error, 'border-blue-hover': hover }"
    @drop.prevent="dropHandler($event)"
    @dragover.prevent
    @dragenter.prevent="toggleHover()"
    @dragleave.prevent="toggleHover()"
  >
    <img
      src="../assets/upload.svg"
      alt="uploadIcon"
      class="inline mt-16 mb-5"
    />
    <div class="font-bold text-lg">Drag and drop files</div>
    <label for="file-upload" class="h-auto underline cursor-pointer">
      Browse files
    </label>
    <input
      id="file-upload"
      type="file"
      class="hidden"
      @change="previewFiles"
      multiple
    />
  </div>
</template>
<script>
export default {
  name: "DropzoneComponent",
  data() {
    return {
      hover: false,
    };
  },
  props: {
    error: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    previewFiles(event) {
      this.$emit("addFile", event.target.files);
    },
    dropHandler(event) {
      this.hover = false;
      this.$emit("addFile", event.dataTransfer.files);
    },
    toggleHover() {
      this.hover = !this.hover;
    },
  },
};
</script>
