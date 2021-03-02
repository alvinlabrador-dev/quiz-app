<template>
  <div class="quiz-item-wrap">
    <div class="quiz-item__details">
      <div class="quiz-item__number">Question #{{ item }}:</div>
      <div class="quiz-item__category">Category: {{ quiz.category }}</div>
    </div>
    <div class="quiz-item">
      <h2 class="quiz-item__question">{{ quiz.question }}</h2>
      <div class="quiz-item__answers">
        <button
          class="quiz-item__answer"
          v-for="answer in quiz.answers"
          :key="answer"
          v-html="answer"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheQuiz",
  props: ["item", "quiz"]
};
</script>
