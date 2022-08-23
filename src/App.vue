<script>
import DropzoneComponent from "./components/DropzoneComponent.vue";
import SelectedFileComponent from "./components/SelectedFileComponent.vue";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjebOASTCCau2zMAixWhO_3amZynOf7V4",
  authDomain: "dropzone-vue-exercise.firebaseapp.com",
  projectId: "dropzone-vue-exercise",
  storageBucket: "dropzone-vue-exercise.appspot.com",
  messagingSenderId: "189895541597",
  appId: "1:189895541597:web:9a8cff917690db9c795eb4",
  measurementId: "G-NKVJKPVTYC",
};
initializeApp(firebaseConfig);

const storage = getStorage();

export default {
  name: "App",
  components: {
    DropzoneComponent,
    SelectedFileComponent,
  },
  data() {
    return {
      selectedFilesState: [],
      hasError: false,
      completed: false,
    };
  },
  methods: {
    getFileState(fileList) {
      this.completed = false;
      this.selectedFilesState = [...fileList];
      for (const item of this.selectedFilesState) {
        if (item.size > 10000000) {
          this.hasError = true;
          return;
        }
      }
      this.hasError = false;
    },
    onUpload() {
      for (const file of this.selectedFilesState) {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          null,
          null,
          (this.completed = true)
        );
      }
    },
    removeFile(indexFile) {
      this.completed = false;
      this.selectedFilesState.splice(indexFile, 1);
    },
    scrollLeft() {
      this.$refs.files.scrollLeft += 140;
    },
    scrollRight() {
      this.$refs.files.scrollLeft -= 140;
    },
  },
  computed: {
    disabledButton() {
      return !(this.selectedFilesState.length > 0);
    },
  },
};
</script>

<template>
  <div class="mt-10 font-primary mx-64 static">
    <DropzoneComponent @addFile="getFileState" :error="hasError" />
    <div v-if="hasError" class="text-red-error font-primary text-sm">
      The maximum file size is 10 MB
    </div>
    <template v-else>
      <div class="flex space-x-4 overflow-x-hidden scroll-smooth" ref="files">
        <SelectedFileComponent
          v-for="(file, index) in this.selectedFilesState"
          :key="file.name"
          :title="file.name"
          :size="file.size"
          :type="file.type"
          :index="index"
          @removeFile="removeFile"
        />
      </div>
      <img
        v-if="this.selectedFilesState.length"
        class="w-8 h-8 absolute top-[312px] left-[212px]"
        alt="back arrow"
        src="../src/assets/back-arrow.svg"
        @click="scrollRight"
      />
      <img
        v-if="this.selectedFilesState.length"
        class="w-8 h-8 absolute top-[312px] right-[212px]"
        alt="next arrow"
        src="../src/assets/next-arrow.svg"
        @click="scrollLeft"
      />
      <div class="flex justify-center mt-10">
        <button
          class="border-2 p-2 rounded disabled:bg-light-blue disabled:opacity-50 hover:bg-light-blue enabled:opacity-100 enabled: bg-light-grey"
          @click="onUpload"
          type="button"
          :disabled="disabledButton"
        >
          Upload file
        </button>
      </div>
      <div v-if="completed" class="text-green-500 flex justify-center mt-2">
        Files have been uploaded
      </div>
    </template>
  </div>
</template>
