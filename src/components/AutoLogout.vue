<template>
  <p style="margin-left: 50px"> you are still with us!</p>
    <p v-if="warningZone"> Are you still with us</p>
</template>


<script>
export default {
    name: "autoLogout",

    data: function () {
        return {
            events: ['click', 'mousemove', 'mousedoen', 'scroll', ' keypress', 'load'],

            warningTimer: null,
            logoutTimer: null,
            warningZone: false,
        }
    },

    mounted() {
        this.events.forEach(function(event) {
            window.addEventListener(event, this.resetTimer);
        }, this);

        this.setTimers();
    },

    unmounted() {
        this.events.forEach(function(event) {
            window.removeEventListner(event, this.resetTimer);
        }, this);
        
        this.resetTimer();
    },

    methods: {
        setTimers: function() {
            this.warningTimer = setTimeout(this.warningMessage, 5*1000);
            this.logoutTimer = setTimeout(this.exitGame, 7*1000); // Här ska vi lägga till action för att lämna spelet
        },

        warningMessage: function() {
            this.warningZone = true;
        },
        
        exitGame: function() {
            // Här skriver vi action för att spelaren ska lämna spelet
        },

        resetTimer: function() {
            clearTimeout(this.warningTimer);
            clearTimeout(this.logoutTimer);

            this.setTimers();

        }
    }
}

</script>


<style scoped>

</style>