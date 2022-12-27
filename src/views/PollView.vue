  <template>
  <div>
    {{pollId}}
  </div>
    <div>
      <FlashcardComponent v-bind:questionProp="myObj_deserialized" @nextClick="onClickChild" @previousClick="onClickChild" ></FlashcardComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import io from 'socket.io-client';
import FlashcardComponent from "@/components/FlashcardComponent";
const socket = io();

export default {
  name: 'PollView',
  components: {
    FlashcardComponent,
  },
  data: function () {
    return {
      pollId: "inactive poll",
      questionObject: {"id": "Sveriges huvudstäder",
        "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
        "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]},
      myObj_deserialized: {}
    }
  },
  created: function () {
    this.myObj_deserialized = this.questionObject;
    this.pollId = this.$route.params.id
    socket.emit('joinPoll', this.pollId)
    socket.on("newQuestion", q =>
      this.question = q
    )
    socket.on("dataUpdate", answers =>
      this.submittedAnswers = answers
    )
  },
  methods: {
    submitAnswer: function (answer) {
      socket.emit("submitAnswer", {pollId: this.pollId, answer: answer})
    },
    onClickChild: function(value){
      this.questionPosition = value;
      console.log("parent has", this.questionPosition);
      socket.emit("numberProgress", {name: this.name, score: this.questionPosition});
    },
  }
}
</script>
