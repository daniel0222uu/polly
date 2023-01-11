<template>
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
        {{instantiateuiLabels.createDeck}}
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
        {{instantiateuiLabels.editDeck}}
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
        {{instantiateuiLabels.uploadDeck}}
      </button>
    </router-link>

  </div>

</template>

<script>


export default {
  name: "MyDecksView",
  inject: ["uiLabels"],
  components: {
    
  },
  data: function () {
    return {
      instantiateuiLabels: this.uiLabels,
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
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 150px;
  margin-right: 20%;
  margin-left: 20%;
  align-items: center;
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

@media screen and (max-width: 40em) {
  #container {
    flex-direction: column;
  }

}
</style>