<template>
  <app-icons />
  <section class="animate__animated animate__fadeIn">
    <a
      href="https://github.com/alvinlabrador-dev/quiz-app"
      target="blank"
      class="link link--github"
    >
      <app-icon class="link__icon link__icon--left" name="github" />
      View repo
    </a>
    <router-view></router-view>
  </section>
</template>

<script>
import WebFont from "webfontloader";
import AppIcons from "@/components/AppIcons";
import AppIcon from "@/components/AppIcon";

WebFont.load({
  google: {
    families: ["Poppins:ital,wght@0,300;1,700&display=swap"]
  }
});

export default {
  components: {
    AppIcons,
    AppIcon
  }
};
</script>

<style lang="scss">
html {
  font-size: 16px;
}
body {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  background: linear-gradient(45deg, #0f2027 0, #2c5364 100%) no-repeat;
  background-size: cover;
  margin: 0;
  color: #fff;
}
* {
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6,
strong {
  font-weight: 700;
}
.link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: inherit;
  transition: 0.5s;
  cursor: pointer;

  &__icon {
    font-size: 32px;
    margin-left: 13px;

    &--left {
      margin-left: 0;
      margin-right: 13px;
    }
  }
}

h1 {
  font-size: 2rem;
}
</style>

<style lang="scss" scoped>
section {
  min-height: 100vh;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 768px) {
    padding: 0 0 5rem;
  }
}
.link {
  &--github {
    opacity: 0.5;
    position: absolute;
    right: 2rem;
    top: 1.5rem;
    text-transform: capitalize;
    z-index: 2;

    &:hover {
      opacity: 1;
    }

    @media screen and (max-width: 767px) {
      font-size: 0.875rem;
    }
  }
}
</style>
