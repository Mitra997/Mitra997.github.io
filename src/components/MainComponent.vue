<script setup lang="ts">
import contentJson from "../assets/content.json";
import { ref } from "vue";
import Popper from "vue3-popper";
import Markdown from "vue3-markdown-it";
import { Content, Section } from "../types/content";
import { ChevronDown } from "lucide-vue-next";

const posts = [
  {
    id: 1,
    title: "Cardiothene",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Nov 2023 - Nov 2024",
    datetime: "2020-03-16",
    category: { title: "Project Management", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "logos/cardiothene.png",
    },
  },
  {
    id: 6,
    title: "Hope for Hope (Charity Project)",
    href: "#",
    description:
      "Optio cum autem. Sed molestiae sed est. Qui enim et. Dolorum ea voluptate. Quae est corrupti. Quisquam rerum dolores est.",
    date: "Oct 2023 - Dec 2023",
    datetime: "2020-03-10",
    category: { title: "Project Management", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "logos/hope.png",
    },
  },
  {
    id: 4,
    title: "Rasam",
    href: "#",
    description:
      "Deleniti eveniet voluptas. Autem est corrupti. Quia et et. Velit et et. Quisquam rerum dolores est.",
    date: "Aug 2021 - May 2023",
    datetime: "2020-03-23",
    category: { title: "Project Management", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "logos/rasam.png",
    },
  },
  {
    id: 5,
    title: "Kayson",
    href: "#",
    description:
      "Deleniti eveniet voluptas. Autem est corrupti. Quia et et. Velit et et. Quisquam rerum dolores est.",
    date: "Mar 2020 - June 2020",
    datetime: "2020-03-23",
    category: { title: "Project Management", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "logos/kayson.png",
    },
  },
  {
    id: 2,
    title: "Kindergarten design",
    href: "#",
    description:
      "Optio cum autem. Sed molestiae sed est. Qui enim et. Dolorum ea voluptate. Quae est corrupti. Quisquam rerum dolores est.",
    date: "Nov 2020 - May 2021",
    datetime: "2020-03-10",
    category: { title: "Architecture", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "",
      videoUrl: "YYTVwKOgv-M",
    },
  },
  {
    id: 3,
    title: "Graphite drawing",
    href: "#",
    description:
      "Deleniti eveniet voluptas. Autem est corrupti. Quia et et. Velit et et. Quisquam rerum dolores est.",
    date: "Sep 2018 - Dec 2018",
    datetime: "2020-03-23",
    category: { title: "Arts", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl: "logos/painting.png",
    },
  },
];

const shuffle = (array: string[]) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const photos = shuffle([
  "graduation.jpg",
  "decode.jpg",
  "hackai.jpg",
  "quic.png",
  "google.jpg",
  "lake.jpg",
]);

const getImage = (path: string) => {
  return new URL(`/src/assets/${path}`, import.meta.url).href;
};

const content: Content = contentJson;

const today = new Date();

const getToday = () => {
  return `${today.toLocaleString("en-US", {
    month: "long",
  })} ${today.getFullYear()}`;
};

const sections = [
  { name: "Arts", section: content.experiences.firstSection },
  { name: "Experiences", section: content.experiences.secondSection },
  { name: "Projects", section: content.experiences.thirdSection },
];

const selectedSection = ref(1);
const animationOpacity = ref(true);
const itemViewAnimation = ref(true);
const imgOpacity = ref([0, 0, 0, 0, 0, 0]);
const selectedItem = ref<Section>();
const showContent = ref(false);

const getSectionData = () => {
  const sectionData: Section[] = sections[selectedSection.value].section;
  return sectionData.filter((experience: Section) => {
    return experience.show;
  });
};

const selectedSectionData = ref(getSectionData());

const updateSelectedSection = (index: number) => {
  animationOpacity.value = false;
  setTimeout(() => {
    animationOpacity.value = true;
  });

  selectedSection.value = index;
  selectedSectionData.value = getSectionData();
};

const selectItem = (id: string) => {
  itemViewAnimation.value = false;
  setTimeout(() => {
    itemViewAnimation.value = true;
  });
  const sectionData: Section[] = sections[selectedSection.value].section;
  selectedItem.value = sectionData.filter((experience: Section) => {
    return experience.id === id;
  })[0];
};

const closeItemView = () => {
  itemViewAnimation.value = false;
  setTimeout(() => {
    selectedItem.value = undefined;
  }, 300);
};

const changeImgOpacity = () => {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      imgOpacity.value[i] = 100;
    }, i * 450);
  }
};

const showExperience = () => {
  showContent.value = true;
};

const showMain = () => {
  showContent.value = false;
};

changeImgOpacity();
</script>

<template>
  <div class="h-screen w-screen snap snap-y snap-mandatory font-thin bg-white">
    <transition name="fade" mode="out-in">
      <div v-if="!showContent" class="h-screen w-screen fixed">
        <div class="h-screen">
          <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
            <div class="
                flex
                w-full
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                sm:static
              ">
              <div class="flex justify-center m-auto">
                <div class="sm:max-w-lg">
                  <h1 class="
                      text-4xl
                      font font-extrabold
                      tracking-tight
                      text-gray-900
                      sm:text-6xl
                    ">
                    Hey! 👋🏻
                  </h1>
                  <!-- eslint-disable vue/no-v-html -->
                  <p class="my-10 text-xl text-left" v-html="content.bio"></p>
                  <!--eslint-enable-->
                  <div class="hidden sm:mb-8 sm:flex">
                    <div class="
                        relative
                        rounded-full
                        px-3
                        py-1
                        text-sm/6 text-gray-600
                        ring-1 ring-gray-900/10
                        hover:ring-gray-900/20
                      ">
                      <a class="font-semibold text-indigo-600 cursor-pointer" @click="showExperience"><span
                          class="absolute inset-0" aria-hidden="true" />
                        More about me!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center items-center m-auto">
                <img src="../assets/memory/me.jpg" alt="emoji" height="350" width="350"
                  class="object-center object-cover rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <div class="fixed bottom-0 w-screen">
          <div class="
              bg-white
              h-14
              flex
              items-center
              justify-center
              bg-opacity-70
              backdrop-filter backdrop-blur-sm
            ">
            <p class="text-gray-600">
              I would
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block text-red-600 mb-1.5 mr-0.5"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd" />
              </svg>
              to connect with you!
              <a href="www.linkedin.com/in/mitra-sharifi" target="_blank" rel="noopener noreferrer">
                <svg class="
                    h-5
                    w-5
                    inline-block
                    mb-1.5
                    mr-0.5
                    ml-1.5
                    text-gray-400
                    hover:text-gray-700
                  " xmlns="http://www.w3.org/2000/svg" viewBox="7.025 7.025 497.951 497.95">
                  <path
                    d="M256 7.025C118.494 7.025 7.025 118.494 7.025 256S118.494 504.975 256 504.975 504.976 393.506 504.976 256C504.975 118.494 393.504 7.025 256 7.025zm-66.427 369.343h-54.665V199.761h54.665v176.607zM161.98 176.633c-17.853 0-32.326-14.591-32.326-32.587 0-17.998 14.475-32.588 32.326-32.588s32.324 14.59 32.324 32.588c.001 17.997-14.472 32.587-32.324 32.587zm232.45 199.735h-54.4v-92.704c0-25.426-9.658-39.619-29.763-39.619-21.881 0-33.312 14.782-33.312 39.619v92.704h-52.43V199.761h52.43v23.786s15.771-29.173 53.219-29.173c37.449 0 64.257 22.866 64.257 70.169l-.001 111.825z"
                    fill="currentColor" />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
      <div v-else class="bg-white">
        <header class="fixed inset-x-0 top-0 z-10">
          <nav class="
              flex
              items-center
              justify-between
              p-6
              lg:px-8
              bg-white bg-opacity-40
              backdrop-filter backdrop-blur-sm
            " aria-label="Global">
            <div class="flex lg:flex-1">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Your Company</span>
                <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                  alt="" />
              </a>
            </div>
            <div class="flex lg:hidden">
              <button type="button" class="
                  -m-2.5
                  inline-flex
                  items-center
                  justify-center
                  rounded-md
                  p-2.5
                  text-gray-700
                " @click="mobileMenuOpen = true">
                <span class="sr-only">Open main menu</span>
                <Bars3Icon class="size-6" aria-hidden="true" />
              </button>
            </div>
            <div class="hidden lg:flex lg:gap-x-12">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                class="text-sm/6 font-semibold text-gray-900">{{ item.name }}</a>
            </div>
            <div class="hidden lg:flex lg:flex-1 lg:justify-end">
              <a class="text-sm/6 font-semibold text-gray-900 cursor-pointer" @click="showMain">Back <span
                  aria-hidden="true">&rarr;</span></a>
            </div>
          </nav>
        </header>

        <div class="relative isolate px-6 lg:px-8">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="
                mx-auto
                grid
                max-w-2xl
                grid-cols-1
                gap-x-8 gap-y-16
                sm:mt-16 sm:pt-16
                lg:mx-0 lg:max-w-none lg:grid-cols-3
              ">
              <article v-for="post in posts" :key="post.id" class="
                  flex
                  max-w-xl
                  flex-col
                  items-start
                  justify-between
                  bg-white
                  shadow-2xl
                  sm:rounded-3xl
                  p-8
                ">
                <div class="flex items-center gap-x-4 text-xs">
                  <time :datetime="post.datetime" class="text-gray-500">{{
                    post.date
                    }}</time>
                  <div class="
                      relative
                      z-10
                      rounded-full
                      bg-gray-50
                      px-3
                      py-1.5
                      font-medium
                      text-gray-600
                    ">
                    {{ post.category.title }}
                  </div>
                </div>
                <div class="relative">
                  <h3 class="mt-3 text-lg/6 font-semibold text-gray-900">
                    {{ post.title }}
                  </h3>
                  <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                    {{ post.description }}
                  </p>
                </div>
                <div class="mt-8 flex items-center gap-x-4 h-[150px] w-[300px]">
                  <div v-if="post.author.videoUrl">
                    <iframe class="rounded-lg" :src="`https://www.youtube.com/embed/${post.author.videoUrl}`"
                      title="YouTube video player" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen></iframe>
                  </div>
                  <img v-else :src="getImage(post.author.imageUrl)" alt=""
                    class="aspect-[3/2] size-full rounded-lg object-cover" />
                </div>
              </article>
            </div>
          </div>
          <div class="
              overflow-hidden
              absolute
              inset-x-0
              -top-40
              -z-10
              transform-gpu
              blur-3xl
              sm:-top-80
            " aria-hidden="true">
            <div class="
                relative
                left-[calc(50%-11rem)]
                aspect-[1155/678]
                w-[36.125rem]
                -translate-x-1/2
                rotate-[30deg]
                bg-gradient-to-tr
                from-[#ff80b5]
                to-[#9089fc]
                opacity-30
                sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]
              " style="
                clip-path: polygon(
                  74.1% 44.1%,
                  100% 61.6%,
                  97.5% 26.9%,
                  85.5% 0.1%,
                  80.7% 2%,
                  72.5% 32.5%,
                  60.2% 62.4%,
                  52.4% 68.1%,
                  47.5% 58.3%,
                  45.2% 34.5%,
                  27.5% 76.7%,
                  0.1% 64.9%,
                  17.9% 100%,
                  27.6% 76.8%,
                  76.1% 97.7%,
                  74.1% 44.1%
                );
              " />
          </div>

          <div class="
              overflow-hidden
              absolute
              inset-x-0
              top-[calc(100%-13rem)]
              -z-10
              transform-gpu
              blur-3xl
              sm:top-[calc(100%-30rem)]
            " aria-hidden="true">
            <div class="
                relative
                left-[calc(50%+3rem)]
                aspect-[1155/678]
                w-[36.125rem]
                -translate-x-1/2
                bg-gradient-to-tr
                from-[#ff80b5]
                to-[#9089fc]
                opacity-30
                sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]
              " style="
                clip-path: polygon(
                  74.1% 44.1%,
                  100% 61.6%,
                  97.5% 26.9%,
                  85.5% 0.1%,
                  80.7% 2%,
                  72.5% 32.5%,
                  60.2% 62.4%,
                  52.4% 68.1%,
                  47.5% 58.3%,
                  45.2% 34.5%,
                  27.5% 76.7%,
                  0.1% 64.9%,
                  17.9% 100%,
                  27.6% 76.8%,
                  76.1% 97.7%,
                  74.1% 44.1%
                );
              " />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
