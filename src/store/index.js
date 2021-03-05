import { createStore } from "vuex";
import { v4 as uuid4 } from "uuid";

export default createStore({
  state: {
    quizItems: [],
    categories: [],
    category: "",
    restart: false,
    anotherQuiz: {
      name: "Home",
      query: {
        restart: true
      }
    },
    loading: false
  },
  mutations: {
    setQuizItems: (state, payload) => {
      state.quizItems = payload.quizItems;
    },
    setCategories: (state, payload) => {
      state.categories = payload.categories;
    },
    setCategory: (state, payload) => {
      state.category = payload.category;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setRestart: (state, payload) => {
      state.restart = payload;
    },
    updateQuizItemStatus: (state, payload) => {
      state.quizItems.map(quiz => {
        if (quiz.id === payload.id) {
          quiz.status = payload.status;
        }
        return quiz;
      });
    }
  },
  actions: {
    requestQuizes: async (context, payload) => {
      // set loading
      context.commit("setLoading", true);

      // fetch questions from open trivia db api
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${context.state.category}&type=multiple`
      );
      const quizItems = await response.json();
      const results = quizItems.results ? quizItems.results : [];

      // don't proceed when there's no results
      if (!results.length) return false;

      // add status and id so we can easily update the quiz items later
      const sortResults = results
        .map(item => {
          item.id = uuid4();
          item.status = "open";
          item.difficulty =
            item.difficulty === "easy" ? 1 : item.difficulty === "hard" ? 3 : 2;

          // add the correct answer in the choices
          item.incorrect_answers.push(item.correct_answer);
          item.answers = item.incorrect_answers;
          delete item.incorrect_answers;

          // shuffle the answers
          item.answers = item.answers
            .map(answer => ({ id: Math.random(), value: answer }))
            .sort((a, b) => a.id - b.id)
            .map(a => a.value);

          return item;
        })
        .sort((a, b) => a.difficulty - b.difficulty);

      // update the quizItems
      context.commit("setQuizItems", { quizItems: sortResults });

      // trigger callback
      if (payload.callback) payload.callback();

      // update restart and category state
      context.commit("setRestart", false);
      context.commit("setCategory", { category: "" });

      // delay setting the loading value to avoid flashes
      setTimeout(context.commit("setLoading", false), 1000);

      return true;
    },
    getCategories: async context => {
      // fetch categories from open trivia db api
      const response = await fetch("https://opentdb.com/api_category.php");
      const resJson = await response.json();
      const categories = resJson.trivia_categories
        ? resJson.trivia_categories
        : [];

      // update the categories state
      context.commit("setCategories", {
        categories
      });
    }
  },
  getters: {
    quizzes: state => state.quizItems,
    correctAnswersCount: (_, getters) =>
      getters.quizzes.filter(quiz => quiz.status === "correct").length,
    quizCategories: (_, getters) => [
      ...new Set(getters.quizzes.map(quiz => quiz.category))
    ],
    quizCategoriesCount: (_, getters) => getters.quizCategories.length,
    availableCategories: state => state.categories,
    selectedCategory: state => state.category
  }
});
