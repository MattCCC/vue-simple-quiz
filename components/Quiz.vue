<template>
  <form class="quiz" action="#">

    <div v-for="(question, index) in questions" v-show="index === questionIndex" :key="index">
        <h3 :id="`question${index}`" class="question">{{ question.text }}</h3>

        <!-- In real world app it would have been decoupled -->
        <ol :aria-labelledby="`question${index}`" role="radiogroup">
          <li v-for="answer in question.answers" :key="answer.id" class="custom-control custom-radio answer">
              <input
                :id="`answer${answer.id}`"
                type="radio"
                class="custom-control-input"
                :checked="selectedAnswers[index] === answer.id"
                :name="`answer${index}`"
                @input="onChangeAnswer(answer)"
              />
            <label :for="`answer${answer.id}`" class="custom-control-label">
              {{ answer.text }}
            </label>
          </li>
        </ol>

        <CustomButton v-if="questionIndex > 0" class="prev" :text="`Previous`" @click="onClickPrev" />

        <CustomButton class="next" :text="`Next`" @click="onClickNext" />
    </div>

    <ScoreBoard
      v-if="questionIndex === totalQuestions"
      @reset="onClickReset" />

  </form>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import CustomButton from '~/components/CustomButton'
import ScoreBoard from '~/components/ScoreBoard'

export default {
  components: {
    CustomButton,
    ScoreBoard
  },

  data() {
    return {
      errorText: 'Please select an answer',
      questionIndex: 0,
      selectedAnswers: [],
    }
  },
  computed: {
    ...mapGetters({
      questions: 'quiz/questions',
      userResponses: 'userQuiz/userResponses'
    }),

    totalQuestions() {
      return this.questions.length
    },
  },
  methods: {
    onClickNext() {
      if (this.isAnyAnswerChecked()) {
        this.questionIndex++

        if (this.questionIndex === this.totalQuestions) {
          this.submitResponses()
        }

      } else {
        this.$toast.error(this.errorText)
      }
    },

    onClickPrev() {
      this.questionIndex--
    },

    onClickReset() {
      this.selectedAnswers.splice(0)
      this.questionIndex = 0
    },

    onChangeAnswer(answer) {
      Vue.set(this.selectedAnswers, this.questionIndex, answer.id)

      this.$store.commit('userQuiz/SET_RESPONSE', {
        questionIndex: this.questionIndex,
        isCorrect: answer.correct
      })
    },

    isAnyAnswerChecked() {
      return this.userResponses[ this.questionIndex ] !== undefined
    },

    submitResponses() {
      this.$store.dispatch('userQuiz/SEND_RESPONSES', {
        answers: this.userResponses
      })
    },
  }
}
</script>

<style lang="less" scoped>
@control-label-bg: #F9F9F9;
@control-label-bg-hover: darken(@control-label-bg, 1%);
@control-label-padding-y: 1rem;
@control-label-padding-x: 3rem;

.quiz {
  margin-bottom: 4rem;
  text-align: left;
  min-width: 20rem;
}

.question {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

ol {
  margin-bottom: 1.5rem;
}

.answer {
  margin-bottom: 0.5rem;
  padding-left: 0;
}

.custom-control-label {
  cursor: pointer;
  user-select: none;
  background-color: @control-label-bg;
  padding: @control-label-padding-y @control-label-padding-x;
  width: 100%;
  transition: .3s background-color ease;
  border-radius: 3px;

  &:hover {
    background-color: @control-label-bg-hover;
  }

  &:before, &:after {
    top: 1.33rem;
    left: @control-label-padding-x / 3;
  }
}

button.prev {
  margin-right: 1rem;
}
</style>
