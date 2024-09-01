<template>
  <article :class="side">
    <div class="images-slider">
      <div v-if="images.length" class="slider">
        <div class="slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(image, index) in images" :key="index" class="slider-image">
            <img :src="image" :alt="`Slide ${index + 1}`" @click="openModal(image)" />
          </div>
        </div>
        <button @click="prevSlide" class="slider-button prev-button">
          <img src="https://i.imgur.com/rxxTFwq.png" alt="Previous">
        </button>
        <button @click="nextSlide" class="slider-button next-button">
          <img src="https://i.imgur.com/uelWp81.png" alt="Next">
        </button>
      </div>
      <div v-else class="no-images">
        No images available for this category.
      </div>
    </div>
    <div class="work-description">
      <div class="article-title">
        <img class="article-icon" :src="titleIconLink" alt="" />
        <h2 class="article-title-text">{{ title }}</h2>
      </div>
      <div class="article-description">
        <p class="article-description-text">
          <img src="https://i.imgur.com/vaYlOXk.png" alt="Description Icon">
          {{ description }}
        </p>
        <RouterLink :to="galleryLink" class="gallery-button">
          galerija <img src="https://i.imgur.com/bt5VAHU.png" alt="Gallery Icon">
        </RouterLink>
      </div>
    </div>
    <!-- Modal for Image Preview -->
    <div v-if="isModalOpen" class="modal" @click.self="closeModal">
      <span class="close-modal" @click="closeModal">&times;</span>
      <img class="modal-content" :src="selectedImage" alt="Modal Image">
    </div>
  </article>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const category = ref(null);
const images = ref([]);
const currentSlide = ref(0); // Track the current slide
const side = ref(null);
// Modal state
const isModalOpen = ref(false);
const selectedImage = ref(null);

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    titleIconLink: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    side: {
        type: String,
        required: true,
    },
    galleryLink: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

onMounted(async () => {
    category.value = props.images;

    // Dynamic import based on category
    if (category.value) {
        try {
            const module = await import(`../../workImages/${category.value}.js`);
            images.value = module.default || module[category.value];
        } catch (error) {
            console.error(`Failed to load module for category: ${category.value}`, error);
        }
    }

    side.value = props.side;
});

// Slide navigation
const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % images.value.length;
};

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + images.value.length) % images.value.length;
};

// Modal control
const openModal = (image) => {
    selectedImage.value = image;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedImage.value = null;
};
</script>