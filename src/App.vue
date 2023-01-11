<template>
  <BannerComponent  @languageSwitch="uiLabelsSwitch" />
  <router-view/>
</template>

<script>
import BannerComponent from '@/components/BannerComponent.vue';
import defaultLanguage from '/Users/danielceoca/Desktop/projektGränssnitt/polly/data/labels-en.json';
import { computed } from 'vue'

export default {
  components: {
    BannerComponent
  },
  data: function (){
    return {
      uiLabels: defaultLanguage
    }
  },
  methods: {
    uiLabelsSwitch: function (labels) {
      this.uiLabels = labels;
      console.log("the language loaded from inject in App is: ",this.uiLabels);
      console.log("daniels injektor is: ",this.uiLabels.DANIELS_INJEKTOR);
    }
  },
  provide() {
    const languageToInject =
        computed(() => this.uiLabels);
    return {
      uiLabels: languageToInject
    }
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Island+Moments&family=Kanit:ital,wght@1,300&family=Mukta:wght@200&display=swap');
:root {
	--foreground-color: red;
	--background-color: green;
}
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  padding: 0;
  background-image: url("../public/img/backgroundPicture.png");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  font-family: 'Kanit', sans-serif;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
