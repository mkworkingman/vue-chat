<template>
  <div id="chat" @click="click">
    <Header />
    <Users />
    <ChatList />
    <ChatOpened />
    <Footer />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Header from './Header.vue';
import Users from './Users.vue';
import ChatList from './ChatList.vue';
import ChatOpened from './ChatOpened.vue';
import Footer from './Footer.vue';

export default {
  name: 'Chat',
    components: {
      Header, Users, ChatList, ChatOpened, Footer
    },
  computed: {
    ...mapGetters(['getNick', 'getConnection', 'getTooltip'])
  },
  created() {
    this.setConnection();
  },
  mounted() {
    this.getConnection.emit('joined', this.getNick);

    this.getConnection.on('users-update', msg => {
      this.setBotMessage(msg);
    });

    this.getConnection.on('user-msg', msg => {
      this.setUserMessage(msg);
    });

    this.getConnection.on('chat-private-client', ({roomId, roomName}) => {
      this.setPrivateRoom({roomId, roomName});
    });

  },
  methods: {
    ...mapActions(['setBotMessage', 'setUserMessage', 'setConnection', 'setPrivateRoom', 'setTooltip']),
    click(e) {
      if (!e.target.getAttribute('tooltip')) this.setTooltip(null);
    }
  }
}
</script>

<style lang="scss">
  #chat {
    max-width: 930px;
    width: 100%;
    border: 1px solid var(--border-color);
    height: 100vh;
    display: grid;
    grid-template-areas:
      'header'
      'users'
      'chat-list'
      'chat-opened'
      'footer';
    grid-template-rows: 54px auto 35px 1fr auto;
    grid-template-columns: minmax(260px, 930px);
  }

  @media only screen and (min-width: 768px) {
    #chat {
      grid-template-areas:
        'header header'
        'users chat-list'
        'users chat-opened'
        'footer footer';
      grid-template-rows: 54px 35px 1fr auto;
      grid-template-columns: 1fr 2.5fr;
    }
  }

    .chat-list--browser, .chat-opened--browser, .users__user-list--browser {
      scrollbar-width: thin;
      scrollbar-color: var(--primary) var(--content1);

      &::-webkit-scrollbar {
        height: 7px;
        width: 12px;
      }

      &::-webkit-scrollbar-track {
        background: var(--content1);
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--primary);
        border: 1px solid var(--border-color);
        border-radius: 20px;
      }
    }
</style>