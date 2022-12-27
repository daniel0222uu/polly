<template>
  <body>
  <div>
    container div
  </div>
  <div>
    <upload-component></upload-component>
  </div>
  </body>
</template>

<script>

import UploadComponent from "@/components/UploadComponent";



export default {
  name: "UploadView",
  components: {
    UploadComponent
  },
}
</script>

<style scoped>

</style>