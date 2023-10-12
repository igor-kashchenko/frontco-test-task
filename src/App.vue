<script setup lang="ts">
import AppContainer from "./components/AppContainer.vue";
import ImageCarousel from "./components/ImageCarousel.vue";
import { onMounted, ref } from "vue";
import { Image } from "./types/Image";
import { fetchImages } from "./utils/fetchImages";
import ImgList from "./components/ImgList.vue";
import ProgressSpinner from "primevue/progressspinner";

const images = ref<Image[]>([]);
const selectedImages = ref<Image[]>([]);
const selectedImagesId = ref<string[]>([]);
const isLoading = ref(false);
const isError = ref(false);
const errorMsg = ref("");

onMounted(async () => {
  try {
    isError.value = false;
    isLoading.value = true;
    const response = await fetchImages();

    images.value = response;
  } catch (error) {
    isError.value = true;
    isLoading.value = false;
    errorMsg.value = 'Error fetching images! Try again later!'
    console.log(error);
  } finally {
    isLoading.value = false;
  }
});

const handleSelectImage = (id: string) => {
  const isSelected = selectedImages.value.find((img) => img.id === id);

  const foundImage = images.value.find((img) => img.id === id);

  if (foundImage && !isSelected) {
    selectedImages.value.push(foundImage);
    selectedImagesId.value.push(foundImage.id);
  }
};

const handleUnselectImage = (id: string) => {
  selectedImages.value = selectedImages.value.filter((img) => img.id !== id);
  selectedImagesId.value = selectedImagesId.value.filter((imgId) => imgId !== id);
};
</script>

<template>
  <AppContainer>
    <p class="text-6xl m-0 text-center mb-4">Image Carousel</p>

    <ImageCarousel
      :images="images"
      v-if="images.length > 0 && !isLoading"
      @selectImage="handleSelectImage"
      @unselect="handleUnselectImage"
      :selectedImagesId="selectedImagesId"
    />

    <div v-if="isLoading && !isError" class="flex flex-grow justify-content-center align-items center">
      <ProgressSpinner />
    </div>

      <p v-if="isError" class="text-red-600 text-4xl text-center">{{ errorMsg }}</p>

    <p class="text-6xl m-0 text-center mb-4" v-if="selectedImages.length !== 0">
      Selected Images
    </p>

    <ImgList
      :selectedImages="selectedImages"
      @unselect="handleUnselectImage"
      v-if="selectedImages.length !== 0"
    />
  </AppContainer>
</template>

<style scoped></style>
