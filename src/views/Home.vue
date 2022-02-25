<template>
  <div class="text-white">
    <h1 class="text-6xl font-bold pt-12 pb-5 drop-shadow-2xl">
      Hey, I'm
      <span
        class="
          text-transparent
          bg-clip-text bg-gradient-to-r
          from-sky-500
          to-sky-400
          bg-400%
          animate-gradient-y
        "
        >sixfalls</span
      >.
    </h1>
    <a class="pl-6 mt-5 text-xl pb-10 drop-shadow-2xl"
      >Developer & Programmer for 3+ years.</a
    >

    <a href="//github.com/6ixfalls">
      <button
        type="button"
        class="
          flex
          items-center
          mt-10
          ml-12
          px-4
          py-2
          font-semibold
          leading-6
          text-sm
          shadow
          rounded-md
          text-sky-500
          bg-gray-800
        "
        id="--see-more"
      >
        See More <i class="fa-solid fa-chevron-right pl-3"></i>
      </button>
    </a>
  </div>

  <div
    class="fixed w-full h-full top-[5.5rem] left-0 z-[-1] hidden animate-shake"
  >
    <Particles
      id="tsparticles"
      :particlesInit="particlesInit"
      :particlesLoaded="particlesLoaded"
      url="rocket.json"
    ></Particles>
  </div>
</template>

<script>
const checkElement = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => {
      requestAnimationFrame(resolve);
    });
  }
  return document.querySelector(selector);
};

var tsp = checkElement("#tsparticles");
tsp.style =
  "width: 100% !important; height: 100% !important; position: fixed !important; z-index: -1 !important; top: 0px !important; left: 0px !important; background-color: rgba(0, 0, 0, 0); pointer-events: none;";

export default {};
</script>
