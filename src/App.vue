<template>
  <router-view/>
</template>

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
  background-opacity: 0.5;
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
