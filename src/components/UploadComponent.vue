<template>
  <div>
    <button @click="testAxiosPost">Test axios POST</button>
  </div>
</template>

<script>
//import io from "socket.io-client"; bryr mig inte om det jsut nu
import axios from 'axios';
//const socket = io();


export default {
  name: "UploadComponent",
  data: function(){
    return {
      testing: {"id": "Sveriges huvudstäder",
        "questionArray": ["Sverige", "Norge", "Finland", "Danmark"],
        "answerArray": ["Sthlm", "Oslo", "Helsingfors", "CBH"]},
    }
  },
  methods: {
    async testAxiosPost() {
      try {
        const response = await axios.post('http://localhost:8080/fileTest ', {
          data: this.testing,
          headers:{
            'Content-Type': 'application/json'
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>

<style scoped>

</style>