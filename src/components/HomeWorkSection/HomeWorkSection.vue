<template>
  <article :class="side">
    <div class="images-slider">
      <div v-if="images.length" class="slider">
        <div class="slider" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="(imageObj, index) in images" :key="index" :class="imageSize">
            <img :src="imageObj.img" :alt="`Slide ${index + 1}`" @click="openModal(index)" />
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
        <img class="article-icon icon" :src="titleIconLink" alt="" />
        <h2 class="article-title-text">{{ title }}</h2>
      </div>
      <div class="article-description">
        <p class="article-description-text">
          <img class="icon" src="https://i.imgur.com/vaYlOXk.png" alt="Description Icon">
          {{ images[currentSlide]?.desc }}
        </p>
      </div>
    </div>

    <!-- Modal for Image Preview -->
    <div v-if="isModalOpen" class="modal" @click.self="closeModal">
      <span class="close-modal" @click="closeModal">&times;</span>
      <div class="modal-content">
        <img class="modal-content" :src="selectedImage.img" alt="Modal Image">

        <!-- Conditionally show "Open in Figma" button if a link exists -->

        <div v-if="selectedImage.link">
          <a v-if="selectedImage.figmaLink" :href="selectedImage.link" target="_blank" class="gallery-button figma-button">
            Open in Figma <img class="software-icon-sml" src="https://i.imgur.com/3cbYQmo.png" alt="">
          </a>
          <a v-else :href="selectedImage.link" target="_blank" class="gallery-button figma-button">
            Go to site <img src="https://i.imgur.com/bt5VAHU.png" alt="Gallery Icon" class="icon">
          </a>
        </div>

        

        <!-- Navigation buttons inside the modal -->
        <button @click="prevSlideInModal" class="slider-button prev-button">
          <img src="https://i.imgur.com/rxxTFwq.png" alt="Previous">
        </button>
        <button @click="nextSlideInModal" class="slider-button next-button">
          <img src="https://i.imgur.com/uelWp81.png" alt="Next">
        </button>
      </div>
    </div>
  </article>
</template>


<script setup>
import { ref, onMounted } from "vue";

const category = ref(null);
const images = ref([]);
const currentSlide = ref(0);
const side = ref(null);
const isModalOpen = ref(false);
const selectedImage = ref({ img: null, link: null, desc: null, figmaLink: null });

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
    },
    imageSize: {
      type: String,
      required: true,
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
const openModal = (index) => {
    currentSlide.value = index; // Set the current slide to the clicked index
    selectedImage.value = images.value[currentSlide.value]; // Set the selected image
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedImage.value = { img: null, link: null }; // Reset the selected image
};

// Slide navigation inside the modal
const nextSlideInModal = () => {
    nextSlide(); // Use the same nextSlide function
    selectedImage.value = images.value[currentSlide.value]; // Update selectedImage
};

const prevSlideInModal = () => {
    prevSlide(); // Use the same prevSlide function
    selectedImage.value = images.value[currentSlide.value]; // Update selectedImage
};

// Slide navigation outside the modal
const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % images.value.length;
};

const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + images.value.length) % images.value.length;
};
</script>