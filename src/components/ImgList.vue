<template>
  <div class="grid mx-2">
    <div
      v-for="image in props.selectedImages"
      :key="image.id"
      class="flex flex-column col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2"
    >
      <img class="h-12rem" :src="image.download_url" :alt="image.author" />
      <div class="flex justify-content-between align-items-center">
        <p>Image ID: {{ image.id }}</p>

        <i
          class="pi pi-times cursor-pointer"
          title="unselect image"
          @click="onUnselect(image.id)"
        ></i>
      </div>
      <p class="text-xs m-0">{{ image.download_url }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image } from "../types/Image";

type Props = {
  selectedImages: Image[];
};

const props = defineProps<Props>();
const emit = defineEmits(["unselect"]);

const onUnselect = (id: string) => {
  emit("unselect", id);
};
</script>

<style scoped></style>
