<template>
  <div id="app" :class="getTheme">
    <Login v-if="!getNick" />
    <Chat v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from './components/Login.vue';
import Chat from './components/Chat.vue';

export default {
  name: 'App',
  components: {
    Login, Chat
  },
  mounted() {
    window.addEventListener('storage', e => {
      if (e.key === 'theme') {
        this.$store.dispatch("setTheme");
      }
    });
  },
  destroyed() {
    window.removeEventListener('storage', e => {
      if (e.key === 'theme') {
        this.$store.dispatch("setTheme");
      }
    });
  },
  computed: {
    ...mapGetters(['getTheme', 'getNick'])
  },
  methods: {

  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

  .light {
    --primary: #b1a0ff;
    --secondary: #252525;
    --box-shadow: 0 0 0 0.2rem rgba(83, 10, 112, 0.35);
    --content1: #e6e1ff;
    --content2: #f8f7ff;
    --msg-incoming: #ddb8ff;
    --msg-outcoming: #b9d8ff;
    --bg: #e0e0e0;
    --border-color: #7c5fff;
  }

  .dark {
    --primary: #141a32;
    --secondary: #d6d6d6;
    --box-shadow: 0 0 0 0.2rem rgba(36, 72, 231, 0.35);
    --content1: #22326d;
    --content2: #344581;
    --msg-incoming: #361F6D;
    --msg-outcoming: #165462;
    --bg: #e0e0e0;
    --border-color: #424151;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  }

  html, body, #app {
    height: 100vh;
    width: 100vw;
  }

  svg {
    fill: var(--secondary);
    transition: fill .5s;
  }

  ul {
    list-style-type: none;
  }

  input {
    color: var(--secondary);
    font: 500 16px Montserrat, Arial, Helvetica, sans-serif;
    background: var(--content2);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 3px 5px;
    transition: background .5s, color .5s, border-color .5s, box-shadow .25s;
    
    &:focus {
      box-shadow: var(--box-shadow);
    }
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url('./assets/IE.png') no-repeat;
    background-position: center center;
    background: var(--bg);
    color: var(--secondary);
    font: 500 16px Montserrat, Arial, Helvetica, sans-serif;
    transition: background .5s, color .5s;
  }
</style>