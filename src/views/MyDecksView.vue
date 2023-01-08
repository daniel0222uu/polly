<template>
 
  <body>

  <div id="container">

    <router-link
        to="/create/en"
        custom
        v-slot="{ navigate }"
    >
      <button id="shadow"
              @click="navigate"
              role="link"
      >
        Create deck
      </button>
    </router-link>

    <router-link
        to="/editing/en"
        custom
        v-slot="{ navigate }"
    >
      <button id="shadow"
              @click="navigate"
              role="link"
      >
        Edit deck
      </button>
    </router-link>

    <router-link
        to="/Upload/en"
        custom
        v-slot="{ navigate }"
    >
      <button id="shadow"
              @click="navigate"
              role="link"
      >
        Upload deck
      </button>
    </router-link>

  </div>

  </body>
</template>

<script>


export default {
  name: "MyDecksView",
  components: {
    
  },
  data: function () {
    return {
    }
  },
  created: function(){
    console.log("MyDecksView visited");
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Island+Moments&family=Kanit:ital,wght@1,300&family=Mukta:wght@200&display=swap');

#container {
  position: absolute;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: row;
  gap: 8rem;
}

button {
  padding: 10px 40px;
  cursor: pointer;
  font-family: 'Kanit', sans-serif;
  font-size: 20px;
}

#shadow {
  border-radius: 10px;
  border: 2px solid #000;
  box-shadow: 10px 10px;
  background-color: #fec89a;
  transition: box-shadow 300ms ease, transform 500ms ease;
}

#shadow:hover {
  box-shadow: none;
}

#shadow:active {
  transform: scale(0.9);
}

#viewDeckList {
  border: solid black;
}
</style>