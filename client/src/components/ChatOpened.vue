<template>
  <div class="chat-opened" :class="getIsMobile ? 'chat-opened--mobile' : 'chat-opened--browser'">
    <div :tooltip="msg.className === 'msg--incoming' && 'true'" v-for="(msg, i) in getMessages[getActiveRoom]" :key="i" class="msg" :class="msg.className" @click="msg.className === 'msg--incoming' && tooltip(i)">
      <div :tooltip="msg.className === 'msg--incoming' && 'true'" class="msg__info">
        <span :tooltip="msg.className === 'msg--incoming' && 'true'" class="msg__user">{{ msg.user }}</span>
        <span :tooltip="msg.className === 'msg--incoming' && 'true'" class="msg__time">{{ msg.time }}</span>
      </div>
      <div :tooltip="msg.className === 'msg--incoming' && 'true'" class='msg__text'>{{ msg.text }}</div>
      <div :tooltip="msg.className === 'msg--incoming' && 'true'" v-if="msg.className === 'msg--incoming' && getActiveRoom === 'general' && getTooltip === i" class="tooltip">
        <div @click="privateChat(msg.id, msg.user)">Private Chat</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['getMessages', 'getActiveRoom', 'getConnection', 'getTooltip', 'getIsMobile']),
  },
  methods: {
    ...mapActions(['setTooltip']),
    privateChat(id, user) {
      this.getConnection.emit('chat-private', {id, user});
      this.setTooltip(null);
    },
    tooltip(i) {
      this.setTooltip(i);
    }
  }
}
</script>

<style lang="scss">
  .chat-opened {
    grid-area: chat-opened;
    background: var(--content2);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 30px;

    scrollbar-width: thin;
    scrollbar-color: var(--primary1) var(--primary2);
    scrollbar-base-color: var(--primary1);
    transition: background .5s;

    &.chat-opened--mobile {
      overflow-y: scroll;
    }

    &.chat-opened--browser {
      overflow-y: hidden;

      &:hover {
        overflow-y: auto;
        overflow-y: overlay;
      }
    }

    > .msg {
      position: relative;
      padding: 5px 10px;
      border-width: 1px;
      border-style: solid;
      border-radius: 10px;
      min-width: 130px;
      max-width: 64%;
      margin-bottom: 5px;

      &:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-top-width: 16px;
        border-top-style: solid;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
      }

      &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-top-width: 15px;
        border-top-style: solid;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
      }

      &.msg--bot {
        background: var(--primary);

        &:before {
          top: -1px;
          left: -17px;
        }

        &:after {
          top: 0;
          left: -15px;
          border-top-color: var(--primary);
        }
      }

      &:last-child {
        margin-bottom: 0;
      }

      &.msg--incoming {
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        position: relative;
        background: var(--msg-incoming);

        &:before {
          top: -1px;
          left: -17px;
        }

        &:after {
          top: 0;
          left: -15px;
          border-top-color: var(--msg-incoming);
        }

        > .tooltip {
          background: var(--primary);
          padding: 0 2px;
          position: absolute;
          border-width: 1px;
          border-style: solid;
          border-radius: 10px;
          top: 50%;
          transform: translateY(-50%);
          right: -115px;

          &:before {
            position: absolute;
            content: '';
            cursor: default;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 7px 10px 7px 0;
            border-color: transparent var(--secondary) transparent transparent;
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
          }

          &:after {
            position: absolute;
            content: '';
            cursor: default;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 9px 13px 9px 0;
            border-color: transparent var(--primary) transparent transparent;
            left: -8px;
            top: 50%;
            transform: translateY(-50%);
          }

          > div {
            padding: 6.5px 2px;
          }
        }
      }

      &.msg--outcoming {
        align-self: flex-end;
        background: var(--msg-outcoming);

        &:before {
          top: -1px;
          right: -17px;
        }

        &:after {
          top: 0;
          right: -15px;
          border-top-color: var(--msg-outcoming);
        }
      }

      > .msg__info {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        word-break: break-all;

        > .msg__user {
          flex: 1;
        }

        > .msg__time {
          margin-left: 5px;
        }
      }

      > .msg__text {
        word-break: break-all;
      }
    }
  }
</style>