<template>
   <!-- http://localhost:8080/#/editing/en  för att komma hit -->
  <body>

  <div>
    <!----><EditComponent/>

  
  </div>
 


  </body>

</template>


<script>
import io from 'socket.io-client';
import EditComponent from '@/components/EditComponent';
const socket = io();

export default {
  name: 'EditingView',
  data: function () {
    return {
    }
  },
  components: {
    EditComponent
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