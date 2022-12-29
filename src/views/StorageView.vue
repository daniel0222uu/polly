<!--<template>

</template>

<script>
import io from 'socket.io-client';
const socket = io();
import Decks from '/assetts/Decks.json'
import {} from Decks; //Vette fan varfor rad 9 blir gramarkerad...
export default {
  name: "StorageView",
  socket.on('NewDeck', function (questionObject) {
    data.addOrder(data);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('currentQueue', { orders: data.getAllOrders() });
  }),
}
</script>

<style scoped>
</style>-->