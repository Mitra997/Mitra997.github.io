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
      "Led the development of a software solution enabling ECG transmission from Apple Watches to doctors for timely feedback, enhancing patient care. Oversaw project planning, team coordination, and successful execution, ensuring adherence to timelines and objectives. Conducted a comprehensive case study post-project to evaluate outcomes and identify opportunities for innovation.",
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
      "Led a diverse team to execute a successful charity event by fostering collaboration, delegating tasks effectively, and promoting accountability. Managed budgets, secured investments, and built strategic partnerships, resulting in 20% more funds raised than expected. Maintained clear communication with stakeholders, surpassing goals and amplifying the event's community impact.",
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
      "Collaborated with cross-functional teams to develop project plans aligned with organizational goals, working closely with architects and engineers to integrate innovative design solutions. Managed timelines, milestones, and deliverables using Jira and Agile methodology, streamlining workflows to ensure on-time delivery. Successfully completed a major project in just 5 months—2 months ahead of schedule—through strategic planning and effective coordination.",
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
      "Assisted in managing diverse projects by maintaining accurate records and organized files, improving efficiency and stakeholder satisfaction. Regularly communicated with clients, providing updates, addressing concerns, and delivering timely solutions. Contributed to smoother project execution and consistently met deadlines through proactive coordination.",
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
      "Developed an award-winning kindergarten design using AutoCAD and 3Ds Max, combining functionality with creativity to meet educational needs. Focused on child-friendly spaces and innovative architectural solutions, earning industry recognition. Featured project video highlights the design's impact and success.",
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
      "Created a hyper-realistic portrait of a girl using graphite, showcasing exceptional detail and artistic skill. Dedicated four months to perfecting this piece, reflecting a passion for fine art and precision. Also completed several other intricate works, highlighting a love for painting and drawing.",
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
                md:flex
                w-full
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                sm:static
              ">
              <div class="flex justify-center m-auto">
                <div class="sm:max-w-lg p-8">
                  <h1 class="
                      text-4xl
                      font font-extrabold
                      tracking-tight
                      text-gray-900
                      sm:text-6xl
                    ">
                    Hey!
                  </h1>
                  <!-- eslint-disable vue/no-v-html -->
                  <p class="my-10 text-xl text-left" v-html="content.bio"></p>
                  <!--eslint-enable-->
                  <div class="flex">
                    <div class="
                        rounded-full
                        px-3
                        py-1
                        text-sm/6 text-gray-600
                        ring-1 ring-gray-900/10
                        hover:ring-gray-900/20
                      ">
                      <a class="
                          font-semibold
                          hover:text-purple-600
                          cursor-pointer
                        " @click="showExperience">
                        More about me!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex justify-center items-center m-auto mt-8">
                <img :src="getImage('memory/me.jpg')" alt="emoji" height="350" width="350" class="
                    object-center object-cover
                    rounded-full
                    border-solid border-2 border-gray-300
                  " />
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block hover:text-red-600 mb-1.5 mr-0.5"
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
                    hover:text-[#0072b1]
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
              <svg viewBox="200 340 800 100" height="30" width="200" xmlns="http://www.w3.org/2000/svg">
                <g id="path11189" aria-label="M"
                  transform="translate(0 333.99966400000005) translate(204.34838399999995 0.9137339999999909) scale(2) translate(-400.72344 50.391133)">
                  <path class="c1"
                    d="M117.89355,95.59932l-14.04102,27.14648c-0.86426,1.51172-2.44824,2.44824-4.17676,2.44824 c-1.72754,0-3.31152-0.93652-4.17578-2.52051L82.10645,96.03096v24.41016c0,2.59277-2.16016,4.75293-4.82422,4.75293 c-2.59277,0-4.75293-2.16016-4.75293-4.75293V79.5417c0-2.16016,1.44043-4.03223,3.60059-4.6084 c2.08789-0.50391,4.32031,0.43262,5.3291,2.37598l18.28906,34.70703l18.79395-34.77832 c1.00781-1.87207,3.24023-2.80859,5.32813-2.30469c2.08789,0.57617,3.60059,2.44824,3.60059,4.6084v26.57031 c0,2.59277-2.16016,4.75293-4.82422,4.75293c-2.59277,0-4.75293-2.16016-4.75293-4.75293V95.59932z"
                    transform="translate(328.19414 -125.18939)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#db2777" stroke="#db2777"></path>
                  <path class="c3"
                    d="M122.64648,125.19405c-2.59277,0-4.75293-2.16016-4.75293-4.75293 c0-2.66406,2.16016-4.82422,4.75293-4.82422c2.66406,0,4.82422,2.16016,4.82422,4.82422 C127.4707,123.03389,125.31055,125.19405,122.64648,125.19405z"
                    transform="translate(328.19414 -125.18939)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#9333ea" stroke="#9333ea"></path>
                </g>
                <g id="path11191" aria-label="I"
                  transform="translate(0 333.99966400000005) translate(383.00462400000004 -1.695999999999998) scale(2) translate(-470.05156 51.696)">
                  <path class="c3"
                    d="M95.21143,78.2458c0-2.59277,2.16016-4.75293,4.75293-4.75293c2.66406,0,4.82422,2.16016,4.82422,4.75293 c0,2.66406-2.16016,4.82422-4.82422,4.82422C97.37158,83.07002,95.21143,80.90987,95.21143,78.2458z"
                    transform="translate(374.84013 -125.18887)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#9333ea" stroke="#9333ea"></path>
                  <path class="c1"
                    d="M95.21143,120.44112V92.57491c0-2.5918,2.16016-4.75195,4.75293-4.75195 c2.66406,0,4.82422,2.16016,4.82422,4.75195v27.86621c0,2.59277-2.16016,4.75293-4.82422,4.75293 C97.37158,125.19405,95.21143,123.03389,95.21143,120.44112z"
                    transform="translate(374.84013 -125.18887)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#db2777" stroke="#db2777"></path>
                </g>
                <g id="path11193" aria-label="T"
                  transform="translate(0 333.99966400000005) translate(458.85838399999994 0.8960000000000008) scale(2) translate(-487.97844 50.4)">
                  <path class="c1"
                    d="M104.75244,120.44112c0,2.59277-2.08789,4.75293-4.75293,4.75293 c-2.66406,0-4.75195-2.16016-4.75195-4.75293v-36.0752H84.80615c-2.5918,0-4.75195-2.16016-4.75195-4.82422 c0-2.5918,2.16016-4.75195,4.75195-4.75195h15.19336c2.88086,0,4.75293,2.16016,4.75293,4.75195V120.44112z"
                    transform="translate(407.92424 -125.18975)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#db2777" stroke="#db2777"></path>
                  <path class="c3"
                    d="M119.9458,79.5417c0,2.66406-2.16016,4.82422-4.75293,4.82422c-2.66406,0-4.82422-2.16016-4.82422-4.82422 c0-2.5918,2.16016-4.75195,4.82422-4.75195C117.78564,74.78975,119.9458,76.94991,119.9458,79.5417z"
                    transform="translate(407.92424 -125.18975)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#9333ea" stroke="#9333ea"></path>
                </g>
                <g id="path11195" aria-label="R"
                  transform="translate(0 333.99966400000005) translate(593.7521239999999 0.8960000000000008) scale(2) translate(-535.42531 50.4)">
                  <path class="c1"
                    d="M117.85791,90.84639c0-9.79199-6.69727-16.05664-16.99414-16.05664H85.3833 c-2.59277,0-4.75293,2.16016-4.75293,4.75195v40.89941c0,2.59277,2.16016,4.75293,4.75293,4.75293 c2.66406,0,4.82422-2.16016,4.82422-4.75293v-12.96094h10.44043l2.16016,3.45605c1.36816,2.23242,4.32031,2.88086,6.55273,1.44043 c4.39258-2.80859,0.86426-7.41699,0.86426-7.41699C115.19385,102.15205,117.85791,97.03975,117.85791,90.84639z M100.64795,99.19991H90.20752V84.07784h10.65625c4.96875,0,7.41699,2.95313,7.41699,7.34473 C108.28076,95.45479,106.33643,99.19991,100.64795,99.19991z"
                    transform="translate(454.79494 -125.18975)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#db2777" stroke="#db2777"></path>
                  <path class="c3"
                    d="M114.61768,125.12178c-2.59277,0-4.75293-2.16016-4.75293-4.75195c0-2.66504,2.16016-4.8252,4.75293-4.8252 c2.66406,0,4.75195,2.16016,4.75195,4.8252C119.36963,122.96162,117.28174,125.12178,114.61768,125.12178z"
                    transform="translate(454.79494 -125.18975)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#9333ea" stroke="#9333ea"></path>
                </g>
                <g id="path11197" aria-label="A"
                  transform="translate(0 333.99966400000005) translate(722.882944 0.8960000000000008) scale(2) translate(-579.99072 50.4)">
                  <path class="c1"
                    d="M117.13755,104.6003l-12.81689-27.07422c-0.79199-1.65625-2.52051-2.73633-4.32031-2.73633 c-1.87207,0-3.52832,1.08008-4.32031,2.73633l-19.44189,40.82715c-1.08008,2.37598-0.07178,5.25684,2.3042,6.4082 c2.37598,1.08008,5.18457,0.07227,6.33643-2.30371l4.53662-9.50488h24.19385c1.65625,0,3.09619-0.86426,3.96045-2.16016 C119.22593,108.34444,117.92954,106.25655,117.13755,104.6003z M93.30357,104.74385l6.69678-14.11328l6.76855,14.11328H93.30357z"
                    transform="translate(504.184901 -125.18975)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#db2777" stroke="#db2777"></path>
                  <path class="c3"
                    d="M124.19419,120.44112c0,2.59277-2.16016,4.75293-4.82422,4.75293 c-2.59229,0-4.75244-2.16016-4.75244-4.75293c0-2.66406,2.16016-4.82422,4.75244-4.82422 C122.03403,115.6169,124.19419,117.77705,124.19419,120.44112z"
                    transform="translate(504.184901 -125.18975)" stroke-width="0" stroke-linejoin="miter"
                    stroke-miterlimit="2" fill="#9333ea" stroke="#9333ea"></path>
                </g>
              </svg>
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
                  <p class="mt-5 text-sm/6 text-gray-600">
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

<style>
#nameColor {
  color: #9333ea;
}
</style>
