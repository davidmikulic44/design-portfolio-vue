<template>
    <div class="container">
        <Header></Header>
        <AboutMe></AboutMe>
        <HomeWorkSection
        title="UI/UX"
        titleIconLink="https://i.imgur.com/tXd5bep.png"
        images="typography"
        side="work-right"
        galleryLink="/typography"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla.Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla."
        ></HomeWorkSection>
        <HomeWorkSection
        title="manipulacija tipografije"
        titleIconLink="https://i.imgur.com/xSQOX8u.png"
        images="typography"
        side="work-left"
        galleryLink="/typography"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, nulla."
        ></HomeWorkSection>
        
    </div>
</template>

<script setup>
import Header from '../components/Header/Header.vue'
import AboutMe from '../components/AboutMe/AboutMe.vue'
import HomeWorkSection from '../components/HomeWorkSection/HomeWorkSection.vue';
</script>