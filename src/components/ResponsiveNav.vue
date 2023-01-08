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
    
    background-color: rgb(37, 188, 211);
    transform: translateY(1px);
    
   
     
  }
  nav :active{
    transform: translateY(-1px);
  }
  


  nav ::v-slotted(a) {
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    color: black;
    display:flex;
    align-items: center;
    justify-content: center;
    margin: 3%;
    border: 2px solid rgb(3, 81, 77);
    background-color: rgb(32, 159, 178);

    border-radius: 10px;
    
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
