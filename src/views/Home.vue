<template>
  <div class="text-white">
    <h1 class="text-6xl font-bold pt-12 pb-5 drop-shadow-2xl">
      Hey, I'm
      <span
        class="
          text-transparent
          bg-clip-text bg-gradient-to-r
          from-sky-500
          to-sky-300
          bg-400%
          animate-gradient-y
        "
        >sixfalls</span
      >.
    </h1>
    <a class="pl-6 mt-5 text-xl pb-10 drop-shadow-2xl"
      >Developer & Programmer for 3+ years.</a
    >

    <button
      type="button"
      class="
        flex
        mt-10
        ml-12
        items-center
        px-4
        py-2
        font-semibold
        leading-6
        text-sm
        shadow-2xl
        rounded-md
        text-sky-500
        bg-gray-850
      "
      id="see-more"
      @click="seeMore"
    >
      See More <i class="fa-solid fa-chevron-right pl-3 inline"></i>
    </button>
  </div>

  <div class="fixed w-full h-screen top-0 left-0 z-[-1]">
    <Particles
      id="tsparticles"
      :particlesLoaded="particlesInit"
      url="rocket.json"
    ></Particles>
  </div>
</template>

<script>
import { tsParticles } from "tsparticles";

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const checkElement = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });
  }
  return document.querySelector(selector);
};

export default {
  methods: {
    particlesInit(part) {
      part.canvas.element.parentNode.parentNode.style.setProperty(
        "display",
        "none"
      );
    },
    seeMore() {
      const particles = tsParticles.domItem(0);
      const partContainer = particles.canvas.element.parentNode.parentNode;
      partContainer.style.setProperty("display", "block");
      partContainer.classList.add("_transition-left-slide");
      particles.refresh();
      particles.play();
      setTimeout(() => {
        partContainer.classList.add("animate-shake");
      }, 2500);
    },
  },
};
</script>
