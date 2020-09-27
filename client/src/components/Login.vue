<template>
  <div id="login">
    <Header />
    <div class="login__content">
      <form class="login__form" @submit.prevent="nickSubmit">
        <p>Enter your nick:</p>
        <input v-model="nick" type="text" class="login__input">
        <p v-for="(error, i) in errors" :key="i">{{error}}</p>
        <input type="submit" value="Submit" class="login__submit">
      </form>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      nick: '',
      errors: []
    }
  },
  components: {
    Header
  },
  methods: {
    ...mapActions(['setNick']),
    nickSubmit() {
      this.errors = [];
      const nick = this.nick.trim();
      if (!nick.match(/^[a-zA-Z0-9_-]+$/g) && nick.length !== 0) this.errors.push("Nick can contain only English letters, numbers, hyphens and underscores.");
      if (nick.length < 3 || nick.length > 16) this.errors.push("Nick must have 3-16 characters");

      if(this.errors.length === 0) this.setNick(nick);
    }
  }
}
</script>

<style lang="scss">
  #login {
    width: 100%;
    max-width: 500px;
    border: 1px solid var(--border-color);
    margin-bottom: 120px;

    > .login__content {
      padding: 10px;
      background: var(--content1);
      transition: background .5s, border-color .5s;

      > .login__form {
        display: flex;
        flex-direction: column;

        > .login__submit {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          align-self: center;

          &:hover, &:focus {
            background: var(--border-color);
            color: var(--content2);
          }
        }

        > * {
          margin-bottom: 10px;

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>