<template>
    <div class="container">
        <Header></Header>
        <AboutMe></AboutMe>
        <HomeWorkSection
        title="UI/UX"
        titleIconLink="https://i.imgur.com/tXd5bep.png"
        images="uiux"
        side="work-right"
        imageSize="slider-image-big"
        ></HomeWorkSection>
        <HomeWorkSection
        title="manipulacija tipografije"
        titleIconLink="https://i.imgur.com/xSQOX8u.png"
        images="typography"
        side="work-left"
        imageSize="slider-image"
        ></HomeWorkSection>
        <HomeWorkSection
        title="Photoshop radovi"
        titleIconLink="https://i.imgur.com/2KfxJfn.png"
        images="photoshop"
        side="work-right"
        imageSize="slider-image-big"
        ></HomeWorkSection>
        <Footer></Footer>
    </div>
</template>

<script setup>
import Header from '../components/Header/Header.vue'
import AboutMe from '../components/AboutMe/AboutMe.vue'
import HomeWorkSection from '../components/HomeWorkSection/HomeWorkSection.vue';
import Footer from '../components/Footer/Footer.vue';
</script>