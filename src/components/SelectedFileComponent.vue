<template>
  <div
    class="flex rounded-[3px] border-light-grey border-[1px] w-secondary h-secondary"
  >
    <img :src="'/src/assets/' + imgUrl" class="w-8 h-8 max-w-none m-2" />
    <div class="flex flex-col">
      <div
        class="font-bold font-primary text-xs pt-2 inline truncate max-w-[150px]"
      >
        {{ title }}
      </div>
      <div class="font-primary text-xxs pb-2">{{ formatBytes }}</div>
    </div>
    <img
      src="../assets/close-circle.svg"
      alt="remove file"
      class="max-w-none w-4 h-4 my-auto cursor-pointer mr-2.5 ml-auto"
      @click="removeFile"
    />
  </div>
</template>
<script>
export default {
  name: "SelectedFileComponent",
  data() {
    return {
      imgUrl: "file.svg",
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "",
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    removeFile() {
      this.$emit("removeFile", this.index);
    },
  },
  computed: {
    formatBytes() {
      if (this.size === 0) return "0 B";

      const k = 1024;
      const dm = 2;
      const sizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

      const i = Math.floor(Math.log(this.size) / Math.log(k));

      return (
        parseFloat((this.size / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
      );
    },
  },
  mounted() {
    switch (this.type) {
      case "application/pdf":
        this.imgUrl = "pdf.svg";
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        this.imgUrl = "word.svg";
        break;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        this.imgUrl = "excel.svg";
        break;
      default:
        break;
    }
  },
};
</script>
