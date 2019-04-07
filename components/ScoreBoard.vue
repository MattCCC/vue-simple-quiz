<template>
  <div>
    <h3 class="result-title">Quiz finished</h3>

    <div class="scoreboard" :class="isGoodScore ? 'good-score' : ''">
      <h4>Total score: {{ userScore }} / {{ totalQuestions }}</h4>

      <p v-show="userBetterThan > 0 && userScore > 0">You are better than {{userBetterThan}}% of all quizers!</p>

      <p v-if="isGoodScore">Congratulations!</p>
      <p v-else>Don't worry, you will do better next time!</p>
    </div>

    <CustomButton :text="`Try Again`" @click="onClickReset" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomButton from '~/components/CustomButton'

export default {
  components: {
    CustomButton
  },

  computed: {
    ...mapGetters({
      questions: 'quiz/questions',
      userBetterThan: 'userQuiz/betterThan',
      userResponses: 'userQuiz/userResponses'
    }),

    totalQuestions() {
      return this.questions.length
    },

    isGoodScore() {
      return this.userScore >= this.totalQuestions / 2
    },

    userScore() {
      return this.userResponses.filter( val => val ).length
    },
  },
  methods: {
    onClickReset() {
      this.$store.commit('userQuiz/RESET_STATE')

      this.$emit('reset')
    },
  }
}
</script>

<style lang="less" scoped>
.scoreboard {
  border: 2px dashed #DDD;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 3px;
}

.good-score {
  animation: 1s animateBorder infinite;
}

.question, .result-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

@keyframes animateBorder {
  to {
    border-color: #a0cfa0;
    box-shadow: 0 0 0 6px #a0cfa0;
  }
}
</style>
