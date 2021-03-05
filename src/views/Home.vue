<template>
  <router-view></router-view>
  <div class="page-content">
    <div v-if="!loading">
      <h1>Let's see how good you are with quizzes.</h1>
      <button-group class="btn-grp">
        <app-button @click="getQuizzess">Take the quiz now</app-button> or
        <router-link to="/category" class="link">Select category</router-link>
      </button-group>
    </div>
    <app-loading v-else />
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import ButtonGroup from "@/components/ButtonGroup";
import AppLoading from "@/components/AppLoading";
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    AppButton,
    ButtonGroup,
    AppLoading
  },
  computed: {
    ...mapState(["loading", "restart"])
  },
  watch: {
    restart(newVal) {
      if (newVal) this.getQuizzess();
    }
  },
  methods: {
    ...mapActions(["requestQuizes"]),
    async getQuizzess() {
      await this.requestQuizes({ callback: this.goToQuiz });
    },
    goToQuiz() {
      this.$router.push("/quiz/item1");
    }
  },
  mounted() {
    // trigger quiz request if restart parameter is present
    const params = this.$route.query;
    if (params.restart) this.getQuizzess();
  }
};
</script>

<style lang="scss" scoped>
.link {
  text-decoration: underline;
  color: #f2c44b;
}
.page-content {
  padding: 5rem 2rem;
}
.btn-grp {
  flex-direction: column;
  gap: 0.3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>
