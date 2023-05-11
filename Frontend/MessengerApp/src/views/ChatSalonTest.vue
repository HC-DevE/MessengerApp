<template>
    <!-- TODO: chat salon template html -->
</template>
  
<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            socket: null
        }
    },
    mounted() {
        this.socket = io('http://localhost:3000');
        this.socket.on('connect', () => {
            console.log('Connected to server');
        });
        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}
</script>  