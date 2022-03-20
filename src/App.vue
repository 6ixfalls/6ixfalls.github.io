<template>
  <!-- simple tailwind navigation bar -->
  <nav class="border-b border-gray-700 select-none z-10 bg-gray-900">
    <div class="container mx-auto">
      <div class="flex items-center justify-between px-4 py-6">
        <div class="flex items-center">
          <router-link
            to="/"
            class="text-white font-bold text-2xl tracking-tight"
          >
            sixfalls
          </router-link>
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
  <div class="max-w-screen-xl py-6 mx-auto sm:px-6 lg:px-8 h-auto text-white">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>

  <footer
    class="
      border-t border-gray-700
      select-none
      absolute
      bottom-0
      w-full
      pb-3
      z-10
      bg-gray-900
    "
  >
    <div class="container mx-auto">
      <div class="flex items-start justify-between px-4 py-6 mx-auto">
        <a
          class="
            font-bold
            text-2xl
            tracking-tight
            text-transparent
            bg-clip-text bg-gradient-to-r
            from-gray-300
            to-gray-400
            bg-400%
            animate-gradient-y
            text-shadow
          "
          >sixfalls</a
        >
        <div
          v-for="category in footerpages"
          :key="category.text"
          class="flex flex-col items-start text-white"
        >
          <a class="text-gray-400 text-sm highlight-under mb-1">{{
            category.text
          }}</a>
          <ul>
            <li
              v-for="content in category.content"
              :key="content.text"
              class="list-none text-gray-400"
            >
              <router-link :to="content.to" custom v-slot="{ href }"
                ><a :href="href" class="px-5 text-sm">{{
                  content.text
                }}</a></router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <a class="text-gray-400 text-sm tracking-tight ml-5"
        >Copyright &copy; {{ new Date().getFullYear() }} sixfalls. All rights
        reserved.</a
      >
    </div>
  </footer>

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
    footerpages: [
      {
        text: "Sitemap",
        content: [
          {
            text: "About",
            to: "/",
          },
          {
            text: "Showcase",
            to: "/showcase",
          },
        ],
      },
      {
        text: "Powered By",
        content: [
          {
            text: "Vue.js",
            to: "//vuejs.org",
          },
          {
            text: "GitHub Pages",
            to: "//pages.github.com",
          },
        ],
      },
      {
        text: "Socials",
        content: [
          {
            text: "@6ixfalls on Twitter",
            to: "//twitter.com/6ixfalls",
          },
          {
            text: "@6ixfalls on GitHub",
            to: "//github.com/6ixfalls",
          },
          {
            text: "sixfalls#0001 on Discord",
            to: "//discord.com/users/303173495918034945",
          },
          {
            text: "hvrtlvs on Roblox",
            to: "//www.roblox.com/users/193632792/profile",
          },
        ],
      },
    ],
  }),
});
</script>
