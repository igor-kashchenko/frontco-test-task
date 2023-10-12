<script setup lang="ts">
import AppContainer from "./components/AppContainer.vue";
import ImageCarousel from "./components/ImageCarousel.vue";
import { onMounted, ref } from "vue";
import { Image } from "./types/Image";
import { fetchImages } from "./utils/fetchImages";
import ImgList from "./components/ImgList.vue";

const images = ref<Image[]>([]);
const selectedImages = ref<Image[]>([]);
const selectedImagesId = ref<string[]>([]);

onMounted(async () => {
  try {
    const response = await fetchImages();

    images.value = response;
  } catch (error) {
    console.log(error);
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
  selectedImagesId.value = selectedImagesId.value.filter(
    (imgId) => imgId !== id
  );
};
</script>

<template>
  <AppContainer>
    <p class="text-6xl m-0 text-center mb-4">Image Carousel</p>

    <ImageCarousel
      :images="images"
      v-if="images.length > 0"
      @selectImage="handleSelectImage"
      @unselect="handleUnselectImage"
      :selectedImagesId="selectedImagesId"
    />

    <p class="text-6xl m-0 text-center mb-4" v-if="selectedImages.length !== 0">Selected Images</p>

    <ImgList :selectedImages="selectedImages" @unselect="handleUnselectImage" />
  </AppContainer>
</template>

<style scoped></style>
