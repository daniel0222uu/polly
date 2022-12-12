<template>

</template>

<script>
import io from 'socket.io-client';
const socket = io();
export default {
  name: "StorageView",
  socket
}
</script>

<style scoped>

</style>