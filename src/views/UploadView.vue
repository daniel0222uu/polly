<template>
  <banner-component></banner-component>
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
import BannerComponent from '@/components/BannerComponent.vue';
import UploadComponent from "@/components/UploadComponent";



export default {
  name: "UploadView",
  components: {
    UploadComponent,
    BannerComponent
  },
}
</script>

<style scoped>

</style>