<template>
  <div class="quiz" v-if="quiz.hasOwnProperty('category')">
    <div class="quiz__info">
      <div class="quiz__info__number">
        Question <strong>#{{ item }}</strong
        >:
      </div>
      <div class="quiz__info_category">
        Category: <strong>{{ quiz.category }}</strong>
      </div>
    </div>
    <div class="quiz__item">
      <div class="quiz__progress">
        <div class="quiz__progress--bar" :style="`width: ${progress}`"></div>
      </div>
      <h2
        class="quiz__item__question"
        :class="{
          'quiz__item__question--passed': isPassed,
          'quiz__item__question--failed': !isPassed && lastStepAnswered
        }"
        v-html="lastStepAnswered ? resultHeading : quiz.question"
      ></h2>

      <div class="quiz__item__answers" v-if="!lastStepAnswered">
        <label
          class="quiz__item__answer"
          :class="{
            'quiz__item__answer--selected': answer === option
          }"
          v-for="(option, index) in quiz.answers"
          :key="option"
          :data-choice="choices[index]"
          :for="`answer--${index}`"
        >
          <input
            :id="`answer--${index}`"
            type="radio"
            v-model="answer"
            :value="option"
            name="answer"
            @change="updateStatus"
          />
          <span v-html="option"></span>
        </label>
      </div>

      <div class="quiz__item__result" v-if="lastStepAnswered">
        <p v-html="resultMessage"></p>
        <p v-if="isGood">
          It's fun right? Try
          <router-link :to="anotherQuiz" class="quiz__item__result__link"
            >another quiz
            <span class="quiz__item__result__icon"
              ><app-icon name="refresh"
            /></span>
          </router-link>
        </p>
        <p v-else>
          That's alright you can try
          <router-link :to="anotherQuiz" class="quiz__item__result__link"
            >another quiz
            <span class="quiz__item__result__icon"
              ><app-icon name="refresh"
            /></span>
          </router-link>
        </p>
        <p>
          Go back to
          <router-link :to="home" class="quiz__item__result__link"
            >homepage</router-link
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from "vuex";
import AppIcon from "@/components/AppIcon";
export default {
  name: "TheQuiz",
  props: ["item", "quiz"],
  components: {
    AppIcon
  },
  data() {
    return {
      choices: ["a", "b", "c", "d"],
      answer: "",
      home: {
        name: "Home"
      }
    };
  },
  computed: {
    ...mapGetters(["correctAnswersCount", "quizCategoriesCount"]),
    ...mapState(["anotherQuiz"]),
    nextItem() {
      return this.item < 10 ? this.item + 1 : 10;
    },
    progress() {
      return `${this.item * 10}%`;
    },
    status() {
      return this.answer === this.quiz.correct_answer ? "correct" : "incorrect";
    },
    lastStepAnswered() {
      return this.nextItem === 10 && this.quiz.status !== "open";
    },
    resultMessage() {
      return `
        You got ${this.correctAnswersCount}/10 correct answers from ${this.quizCategoriesCount} ${this.resultCategories}. ${this.isGood}
      `;
    },
    resultCategories() {
      return this.quizCategoriesCount > 1 ? "categories" : "category";
    },
    resultHeading() {
      return `You ${this.isGood ? "Passed" : "Failed"}!`;
    },
    isPassed() {
      return this.correctAnswersCount >= 5 && this.lastStepAnswered;
    },
    isGood() {
      return this.isPassed ? "Good job!" : "";
    }
  },
  methods: {
    ...mapMutations(["updateQuizItemStatus"]),
    updateStatus() {
      // update quiz status
      this.updateQuizItemStatus({ status: this.status, id: this.quiz.id });

      // redirect to next item
      if (this.item !== 10) this.$router.replace(`/quiz/item${this.nextItem}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.quiz {
  line-height: 1.5;
  &__info {
    display: flex;
    opacity: 0.2;
    flex-direction: column;
    text-align: right;
    font-size: 14px;

    &__number {
      display: none;
    }

    @media screen and (min-width: 768px) {
      align-items: center;
      justify-content: space-between;
      flex-direction: row;
      font-size: inherit;

      &__number {
        display: block;
      }
    }
  }
  &__item {
    background: #fff;
    color: #2c5364;
    padding: 2rem 1rem;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (min-width: 768px) {
      padding: 3.125rem;
      min-height: 20.25rem;
    }

    &__question {
      font-size: 1.2rem;
      margin: 0 0 1rem;
      text-align: left;

      @media screen and (min-width: 768px) {
        font-size: 1.5rem;
        margin: 0 0 3rem;
        text-align: center;
      }

      &--failed,
      &--passed {
        margin: 0 0 1rem;
      }

      &--failed {
        color: #f25b4a;
      }
      &--passed {
        color: #00a87a;
      }
    }

    &__answers {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }

    &__answer {
      display: flex;
      align-items: center;
      font: inherit;
      color: #949494;
      cursor: pointer;
      padding: 0;
      margin: 0 1rem 1rem;
      background: transparent;
      font-weight: 600;
      transition: 0.2s;
      overflow: hidden;
      justify-content: left;
      flex-grow: 1;
      width: 100%;

      @media screen and (min-width: 1024px) {
        width: auto;
        justify-content: left;
        flex-grow: 0;
      }

      input {
        position: absolute;
        width: 1px;
        height: 1px;
        left: -1px;
        top: -1px;
      }

      &::before {
        content: attr(data-choice);
        text-transform: uppercase;
        width: 1.6875rem;
        height: 1.6875rem;
        text-align: center;
        margin-right: 0.625rem;
        line-height: 1.6875rem;
        border-radius: 50%;
        border: 0.125rem solid #949494;
        transition: 0.2s;
        flex-shrink: 0;
      }

      &:hover,
      &--selected {
        color: #2c5364;

        &::before {
          border-color: #2c5364;
        }
      }
    }

    &__result {
      font-weight: 600;

      &__link {
        color: inherit;
        position: relative;
        display: inline-flex;
      }

      &__icon {
        font-size: 1.5rem;
        height: 1.5rem;
        margin: -0.125rem 0 0 0.3125rem;
      }
    }
  }

  &__progress {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    background: #b7b7b7;
    height: 0.375rem;

    &--bar {
      transition: 0.5s;
      width: 0;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: #f2994a;
    }
  }
}
</style>
