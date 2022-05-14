<script>
export default {
  props: ["content"],
};
</script>

<template>
  <div
    class="
      tooltip
      origin-bottom
      absolute
      rounded
      max-w-[220px]
      box-border
      z-[1002]
      transition-popup
      pointer-events-none
    "
  >
    <div class="arrow left-1/2 w-0 h-0 ml-[-5px] bottom-full absolute"></div>
    <div class="text pt-[8px] pb-[8px] pl-[12px] pr-[12px]">
      {{ content }}
    </div>
  </div>
</template>