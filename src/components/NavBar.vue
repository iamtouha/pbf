<template>
  <Popover class="relative bg-white">
    <div class="max-w-screen-xl mx-auto px-4 sm:px-6">
      <div
        class="
          flex
          justify-between
          items-center
          border-b-2 border-gray-100
          py-2
          md:justify-start md:space-x-10
        "
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a
            href="#"
            title="Probashi Bangladeshi Friendship"
            class="text-xl font-bold"
          >
            PBF
          </a>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
            class="
              bg-white
              rounded-md
              p-2
              inline-flex
              items-center
              justify-center
              text-gray-400
              hover:text-gray-500 hover:bg-gray-100
              focus:outline-none
              focus:ring-2
              focus:ring-inset
              focus:ring-indigo-500
            "
          >
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10">
          <router-link
            v-for="route in routes"
            :key="route.name"
            exact-active-class="text-gray-500"
            exact
            :to="route.path"
            class="text-base font-medium text-gray-900"
          >
            {{ route.name }}
          </router-link>
        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <a
            href="#"
            class="
              whitespace-nowrap
              text-base
              font-medium
              text-gray-500
              hover:text-gray-900
            "
          >
            Sign in
          </a>
          <a
            href="#"
            class="
              ml-8
              whitespace-nowrap
              inline-flex
              items-center
              justify-center
              px-4
              py-2
              border border-transparent
              rounded-md
              shadow-sm
              text-base
              font-medium
              text-white
              bg-indigo-600
              hover:bg-indigo-700
            "
          >
            Sign up
          </a>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <PopoverPanel
        focus
        class="
          absolute
          top-0
          inset-x-0
          p-2
          transition
          transform
          origin-top-right
          md:hidden
        "
      >
        <div
          class="
            rounded-lg
            shadow-lg
            ring-1 ring-black ring-opacity-5
            bg-white
            divide-y-2 divide-gray-50
          "
        >
          <div class="pt-5 pb-6 px-5">
            <div class="flex items-center justify-between">
              <div>
                <a
                  href="#"
                  title="Probashi Bangladeshi Friendship"
                  class="text-xl font-bold"
                >
                  PBF
                </a>
              </div>
              <div class="-mr-2">
                <PopoverButton
                  class="
                    bg-white
                    rounded-md
                    p-2
                    inline-flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:text-gray-500 hover:bg-gray-100
                    focus:outline-none
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-indigo-500
                  "
                >
                  <span class="sr-only">Close menu</span>
                  <XIcon class="h-6 w-6" aria-hidden="true" />
                </PopoverButton>
              </div>
            </div>
            <div class="mt-6">
              <nav class="grid gap-y-8">
                <router-link
                  v-for="route in routes"
                  :key="route.name"
                  :to="route.path"
                  class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                >
                  <component
                    :is="route.icon"
                    class="flex-shrink-0 h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-base font-medium text-gray-900">
                    {{ route.name }}
                  </span>
                </router-link>
              </nav>
            </div>
          </div>
          <div class="pb-6 px-4">
            <a
              href="#"
              class="
                w-full
                flex
                items-center
                justify-center
                px-4
                py-2
                border border-transparent
                rounded-md
                shadow-sm
                text-base
                font-medium
                text-white
                bg-indigo-600
                hover:bg-indigo-700
              "
            >
              Sign up
            </a>
            <p class="mt-6 text-center text-base font-medium text-gray-500">
              Already created account?
              {{ " " }}
              <a href="#" class="text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  SpeakerphoneIcon,
  ClipboardListIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/vue/outline";
import { ChevronDownIcon } from "@heroicons/vue/solid";

const routes = [
  {
    name: "Announcement",
    path: "/",
    icon: SpeakerphoneIcon,
  },

  {
    name: " Form Fill-up",
    path: "/form",
    icon: ClipboardListIcon,
  },
];

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ChevronDownIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    return {
      routes,
    };
  },
};
</script>
