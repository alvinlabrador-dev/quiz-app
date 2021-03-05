<template>
  <div class="quiz-wrapper animate__animated animate__fadeIn">
    <slot name="header">
      <h1>Let's see how good you are with quizzes.</h1>
    </slot>
    <div class="quiz__wrap">
      <app-progress
        :items="quizzes"
        :current="currentItem"
        class="quiz__progress"
      ></app-progress>

      <router-view
        :quiz="quizzes[currentItem - 1]"
        :item="currentItem"
      ></router-view>
    </div>
  </div>
</template>

<script>
import AppProgress from "@/components/AppProgress";
import { mapGetters } from "vuex";
export default {
  name: "Step",
  components: {
    AppProgress
  },
  computed: {
    ...mapGetters(["quizzes"]),
    currentItem() {
      return +this.$route.params.itemId.slice(4);
    }
  }
};
</script>

<style lang="scss" scoped>
.quiz-wrapper {
  padding: 12rem 1rem 2rem;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    padding: 4rem;
  }
}
h1 {
  position: absolute;
  top: 5rem;
  left: 1rem;
  margin: 0;
  opacity: 0.1;
  text-align: left;
  max-width: 25rem;
  font-size: 1.7rem;

  @media screen and (min-width: 640px) {
    top: 1.2rem;
  }

  @media screen and (min-width: 768px) {
    max-width: 85%;
  }

  @media screen and (min-width: 992px) {
    font-size: 2rem;
  }
}

.quiz {
  &__wrap {
    width: 54rem;
    max-width: 100%;
  }
  &__progress {
    margin-bottom: 1rem;
    @media screen and (min-width: 768px) {
      margin-bottom: 4rem;
    }
  }
}
</style>
