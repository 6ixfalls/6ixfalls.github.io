<template>
  <!-- simple tailwind navigation bar -->
  <nav class="border-b border-gray-700 select-none">
    <div class="container mx-auto">
      <div class="flex items-center justify-between px-4 py-6">
        <div class="flex items-center">
          <a href="/" class="text-white font-bold text-2xl tracking-tight">
            <span>sixfalls</span>
          </a>
        </div>
        <div class="flex items-center text-white">
          <div class="px-5">
            <router-link
              v-for="(link, i) in links"
              :key="i"
              :to="link.to"
              custom
              v-slot="{ navigate, href }"
            >
              <a :href="href" @click="navigate" class="px-5">{{ link.text }}</a>
            </router-link>
          </div>
          <div>
            <router-link
              v-for="(contact, i) in contacts"
              :key="i"
              :to="contact.to"
              custom
              v-slot="{ href }"
            >
              <a :href="href" class="px-2"><i :class="contact.icon"></i></a>
            </router-link>
            <a href="//www.roblox.com/users/193632792/profile" class="px-1"
              ><img src="/img/RobloxLogo.svg" class="h-[2em] inline"
            /></a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="max-w-screen-xl py-6 mx-auto sm:px-6 lg:px-8">
    <router-view />
  </div>

  <!--
  <div
    class="
      animate-bounce
      absolute
      m-auto
      left-0
      right-0
      w-[1.5em]
      h-[1.5em]
      bottom-5
      border
      p-5
      rounded-full
      flex
      items-center
      justify-center
      shadow-2xl
    "
  >
    <i class="fa-solid fa-chevron-down fa-lg text-white"></i>
  </div>-->
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data: () => ({
    showMenu: false,
    showProfileMenu: false,
    links: [
      { text: "About", to: "/" },
      { text: "Showcase", to: "/showcase" },
    ],
    contacts: [
      {
        text: "Github",
        icon: "fab fa-github fa-xl",
        to: "//github.com/6ixfalls",
      },
      {
        text: "Discord",
        icon: "fa-brands fa-discord fa-xl",
        to: "//discord.com/users/303173495918034945",
      },
    ],
  }),
});
</script>
