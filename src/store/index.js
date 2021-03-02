import { createStore } from "vuex";
import { v4 as uuid4 } from "uuid";

export default createStore({
  state: {
    quizItems: [],
    loading: false,
    categories: []
  },
  mutations: {
    setQuizItems: (state, payload) => {
      state.quizItems = payload.quizItems;
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
      // payload.category is optional
      const category = payload.category ? payload.category : "";

      // fetch questions from open trivia db api
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
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

      // update the quizItems state
      context.commit("setQuizItems", { quizItems: sortResults });

      return true;
    }
  },
  getters: {
    getQuizzes: state => state.quizItems,
    getSingleQuiz: (_, getters) => id => {
      return getters.getQuizes.find(quiz => quiz.id === id);
    },
    getLoadingStatus: state => state.loading
  }
});
