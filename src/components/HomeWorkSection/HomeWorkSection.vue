<template>
<article class="work">
    <div class="images-slider">

    </div>
    <div class="work-description">
        <div class="article-title">
            <img class="article-icon" src="https://i.imgur.com/MoWZ3Rq.png" alt="">
            <h2 class="article-title-text">o meni</h2>
        </div>
    </div>
</article>


</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    titleIconLink: {
        type: String,
        required: true,
    },
})
</script>