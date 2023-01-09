<template>
  <div>
  <button @click="testAxiosPost(uploadingObject)">
    <img style="width: 37px; height: 37px; " src="http://localhost:8080/img/uppladdningsIkon2.png" >  </button>

  </div>
</template>

<script>
//import io from "socket.io-client"; bryr mig inte om det jsut nu
import axios from 'axios';
//const socket = io();


export default {
  name: "UploadComponent",
  props: ['uploadingObject'],
  data: function(){
    return {
      testing: {}
    }
  },
  methods: {
    async testAxiosPost(sendDeckToServer) {
      try {
        const response = await axios.post('http://localhost:8080/fileTest ', {
          data: sendDeckToServer,
          headers:{
            'Content-Type': 'application/json'
          },
        });
        console.log(response.data);
        this.$emit('uploadSucessful');
      } catch (error) {
        console.error(error);
      }
    },
  }
}
</script>

<style scoped>

</style>