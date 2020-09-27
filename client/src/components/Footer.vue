<template>
  <div class="footer">
    <textarea @keydown.enter.prevent="textareaEnter" @input="textareaResize" v-model="text" placeholder="Enter your Message..." class="footer__input" ref="textarea"></textarea>
    <button class="footer__send-message" @click="sendMessage">Send<br>Message</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      text: '',
    }
  },
  computed: {
    ...mapGetters(['getConnection', 'getActiveRoom'])
  },
  methods: {
    sendMessage() {
      const text = this.text.trim();
      if (text) {
        this.getConnection.emit('msg-send', {text, room: this.getActiveRoom});
        this.text = '';
        this.$refs.textarea.style.height = 'auto';
        this.$refs.textarea.focus();
      }
    },
    textareaEnter(e) {
      if (!e.ctrlKey) {
        this.sendMessage();
      } else {
        this.text = this.text + "\n";
      }
    },
    textareaResize() {
      const { textarea } = this.$refs;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 2 + 'px';
    }
  }
}
</script>

<style lang="scss">
  .footer {
    grid-area: footer;
    background: var(--primary);
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: center;
    padding: 10px;
    transition: background .5s;

    > .footer__input, > .footer__send-message {
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

    > .footer__input {
      resize: none;
      overflow: hidden;
      flex-grow: 1;
      margin-right: 10px;
      background: var(--content2);
    }

    > .footer__send-message {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      background: var(--chat);
      align-self: flex-end;

      &:hover, &:focus {
        background: var(--primary2);
      }
    }
  }
</style>