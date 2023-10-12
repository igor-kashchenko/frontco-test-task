<template>
  <div class="flex align-items-center mb-4">
    <Button icon="pi pi-angle-left" @click="prevImage" />
    <div class="flex flex-grow-1 mx-4 h-10rem">
      <img
        v-for="(image, index) in displayedImages"
        :src="image.download_url"
        :alt="image.author"
        :key="image.id"
        class="flex-grow-1 img-fit cursor-pointer"
        :class="{
          'mr-4': index !== displayedImages.length - 1,
          selected: props.selectedImagesId.includes(image.id),
        }"
        @click="handleToggleSelect(image.id)"
      />
    </div>
    <Button icon="pi pi-angle-right" @click="nextImage" />
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import { Image } from "../types/Image";
import { onMounted, ref, watch } from "vue";

type Props = {
  images: Image[];
  selectedImagesId: string[];
};

const props = defineProps<Props>();
const emit = defineEmits(["selectImage", "unselect"]);

const currentIndex = ref(0);
const displayedImages = ref<Image[]>([]);

const breakpoints = {
  small: 640,
  medium: 1024,
  large: 1440,
};

const handleToggleSelect = (id: string) => {
  if (!props.selectedImagesId.includes(id)) {
    emit("selectImage", id);
  } else {
    emit("unselect", id);
  }
};

const numImagesToDisplay = ref(1);

const updateNumImagesToDisplay = () => {
  if (window.innerWidth < breakpoints.small) {
    numImagesToDisplay.value = 1;
  } else if (window.innerWidth < breakpoints.medium) {
    numImagesToDisplay.value = 3;
  } else if (window.innerWidth < breakpoints.large) {
    numImagesToDisplay.value = 5;
  } else {
    numImagesToDisplay.value = 7;
  }
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
  updateDisplayedImages();
};

const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
  updateDisplayedImages();
};

const updateDisplayedImages = () => {
  displayedImages.value = [];

  for (
    let i = -Math.floor(numImagesToDisplay.value / 2);
    i <= Math.floor(numImagesToDisplay.value / 2);
    i++
  ) {
    const index = (currentIndex.value + i + props.images.length) % props.images.length;
    displayedImages.value.push(props.images[index]);
  }
};

onMounted(() => {
  updateDisplayedImages();
  updateNumImagesToDisplay();

  window.addEventListener("resize", updateNumImagesToDisplay);
});

watch(numImagesToDisplay, () => {
  updateDisplayedImages();
});
</script>

<style scoped>
.img-fit {
  box-sizing: border-box;
  object-fit: cover;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  transition: transform 0.3s linear;
}
.img-fit:hover {
  transform: scale(1.1);
}
.selected {
  border: 2px solid #007bff;
}
</style>
