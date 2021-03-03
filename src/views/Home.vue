<template>
  <div class="page-content">
    <div v-if="!loading">
      <h1>Let's see how good you are with quizzes.</h1>
      <button-group class="btn-grp">
        <app-button @click="getQuizzess">Take the quiz now</app-button> or
        <a class="link">Select category</a>
      </button-group>
    </div>
    <app-loading v-else />
  </div>
</template>

<script>
import AppButton from "@/components/AppButton";
import ButtonGroup from "@/components/ButtonGroup";
import AppLoading from "@/components/AppLoading";
import { mapActions } from "vuex";
export default {
  name: "Home",
  components: {
    AppButton,
    ButtonGroup,
    AppLoading
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    ...mapActions(["requestQuizes"]),
    async getQuizzess($event, category = "") {
      this.loading = true;
      const result = await this.requestQuizes(category);

      console.log("result", result);
      this.$router.push("/quiz/item1");
    }
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
