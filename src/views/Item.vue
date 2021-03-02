<template>
  <div>
    <the-quiz :quiz="quizItems[currentItem - 1]" :item="currentItem" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import TheQuiz from "@/components/TheQuiz";
export default {
  components: { TheQuiz },
  computed: {
    ...mapState(["quizItems"]),
    currentItem() {
      return +this.$route.params.itemId.slice(-1);
    }
  }
};
</script>
