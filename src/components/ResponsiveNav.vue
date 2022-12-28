<template>
  <nav v-bind:class="{'hide': hideNav}">
    <slot>
    </slot>
  </nav>
</template>

<script>

export default {
  name: 'ResponsiveNav',
  props: {
      hideNav: Boolean
  }
}
</script>
<style scoped>
  nav {
    
    width:100%;
    height: 4em;
    display: grid;
    grid-template-columns: repeat(auto-fit, 10em);
   
    
    justify-content: center;
    
  }
  nav :hover{
    background-color: rgba(32, 178, 171, 0.448);
  }


  nav ::v-slotted(a) {
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: black;
    display: grid;
    align-items: center;
    justify-content: center;
    margin: 3%;
    
    
    background-color: lightseagreen;
    border-radius: 30px;
    /*
    border-left: 10px solid lightblue;
    border-top: 5px solid lightblue;
    */
    
    
    
  }

@media screen and (max-width:50em) {
  nav {
    position: absolute;
    height:100vh;
    top: 3em;
    left: 0;
    width:12em;
    display: grid;
    grid-template-rows: repeat(auto-fit, 2em);
    transition: 0.5s;
  }
  nav ::v-slotted(a) {
    justify-content: left;
    padding-left: 1em;
  }
  .hide {
    left:-12em;
  }
}
</style>
