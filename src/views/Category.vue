<template>
  <form class="quiz-modal" @submit.prevent="startQuiz">
    <h2 class="quiz-modal__header">Select Category</h2>
    <select
      name="category"
      id="category"
      v-model="selectedCategory"
      @change="setCategory({ category: selectedCategory })"
      class="quiz-modal__select"
    >
      <option value="" disabled selected>Please select categories...</option>
      <option
        :value="category.id"
        v-for="category in categories"
        :key="category.id"
      >
        {{ category.name }}
      </option>
    </select>

    <app-button type="submit" class="quiz-modal__btn">Start Quiz</app-button>
  </form>
  <div class="quiz-modal__backdrop"></div>
</template>

<script>
import AppButton from "@/components/AppButton";
import { mapActions, mapState, mapMutations } from "vuex";
export default {
  components: {
    AppButton
  },
  data() {
    return {
      selectedCategory: ""
    };
  },
  computed: {
    ...mapState(["categories", "anotherQuiz"])
  },
  methods: {
    ...mapActions(["getCategories"]),
    ...mapMutations(["setCategory", "setRestart"]),
    startQuiz() {
      this.$router.replace("/");
      this.setRestart(true);
    }
  },
  created() {
    this.getCategories();
    console.log("test here");
  }
};
</script>

<style lang="scss" scoped>
.quiz-modal {
  position: fixed;
  top: 15%;
  left: 50%;
  z-index: 11;
  transform: translateX(-50%);
  border-radius: 10px;
  width: 23.75rem;
  max-width: 95%;
  background: #fff;

  &__header {
    font-size: 1rem;
    background: #0f2027;
    margin: 0 0 1.25rem;
    padding: 1.25rem;
    border-radius: 0.375rem 0.375rem 0 0;
    font-weight: 300;
  }

  &__select {
    width: 330px;
    max-width: 80%;
    margin: 0 auto;
    height: 60px;
    font: inherit;
    padding: 1rem;
    border-radius: 5px;
    background: #dcdcdc;
    outline: 0;
    border: 0;
  }

  &__btn {
    max-width: 90%;
    position: relative;
    top: 1.25rem;

    &:hover {
      opacity: 1;
    }
  }

  &__backdrop {
    position: fixed;
    z-index: 10;
    backdrop-filter: blur(14px);
    opacity: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style> 