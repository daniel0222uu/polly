<template>
   <!-- http://localhost:8080/#/editing/en  för att komma hit -->
  <body>

  <div>
    <!----><EditAndCreateComponent/>

  
  </div>
 


  </body>

</template>


<script>
import io from 'socket.io-client';
import EditAndCreateComponent from '@/components/EditAndCreateComponent';
const socket = io();

export default {
  name: 'EditingView',
  data: function () {
    return {
    }
  },
  components: {
    EditAndCreateComponent
  },
  created: function () {
    this.lang = this.$route.params.lang;
    socket.emit("pageLoaded", this.lang);
    socket.on("init", (labels) => {
      this.uiLabels = labels
    })
  }
}
</script>


<style scoped>

</style>