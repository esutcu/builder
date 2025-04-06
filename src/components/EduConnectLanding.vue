<template>
  <div class="p-4 bg-slate-50 text-slate-700">
    <NavigationBar />
    <HeroSection />
    <FeaturesSection />
    <GallerySection />
    <HowItWorksSection />
    <PricingSection />
    <TestimonialsSection />
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "./NavigationBar.vue";
import HeroSection from "./HeroSection.vue";
import FeaturesSection from "./FeaturesSection.vue";
import GallerySection from "./GallerySection.vue";
import HowItWorksSection from "./HowItWorksSection.vue";
import PricingSection from "./PricingSection.vue";
import TestimonialsSection from "./TestimonialsSection.vue";
import FooterSection from "./FooterSection.vue";
</script>
