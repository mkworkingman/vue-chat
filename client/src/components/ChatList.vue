<template>
  <div class="chat-list" :class="getIsMobile ? 'chat-list--mobile' : 'chat-list--browser'" @wheel="horizontalWheel" ref="chat-list">
    <div
      v-for="room in getRooms"
      :key="room.id"
      class="chat-list__item"
      :class="room.id === getActiveRoom && 'chat-list__item--active'"
      @click="setActiveRoom(room.id)"
    >
      {{ room.name }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters(['getRooms', 'getActiveRoom', 'getIsMobile'])
  },
  methods: {
    ...mapActions(['setActiveRoom']),
    horizontalWheel(e) {
        if (!e.shiftKey) {
          if (e.deltaY > 0) this.$refs['chat-list'].scrollLeft += 35;
          else this.$refs['chat-list'].scrollLeft -= 35;
        } else {
          e.preventDefault();
        }
    }
  }
}
</script>

<style lang="scss">
  .chat-list {
    grid-area: chat-list;
    display: flex;
    background: var(--content1);
    overflow-y: hidden;
    padding: 0 10px;
    transition: background .5s;

    &.chat-list--mobile {
      overflow-x: scroll;
    }

    &.chat-list--browser {
      overflow-x: hidden;

      &:hover {
        overflow-x: auto;
      }
    }

    > .chat-list__item {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      font-weight: 600;
      font-size: 20px;
      margin: 5px -10px 0;
      border-top-right-radius: 25px 170px;
      border-top-left-radius: 20px 90px;
      padding: 3px 40px 0 35px;
      height: 170px;
      background: var(--content1);
      position: relative;
      box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.65);
      transition: background .5s;

      &:before, &:after {
        content: '';
        background: transparent;
        height: 20px;
        width: 20px;
        border-radius: 100%;
        border-width: 10px;
        top: 0px;
        border-style: solid;
        position: absolute;
        transition: border-color .5s;
      }

      &:before {
        border-color: transparent var(--content1) transparent transparent;
        left: -23px;
        transform: rotate(48deg);
      }

      &:after {
        border-color: transparent transparent transparent var(--content1);
        right: -17px;
        transform: rotate(-48deg);
      }

      &:not(.chat-list__item--active):hover {
        background: var(--content1);

        &:before {
          border-color: transparent var(--content1) transparent transparent;
        }

        &:after {
          border-color: transparent transparent transparent var(--content1);
        }
      }
    }

    > .chat-list__item--active {
      background: var(--content2);
      z-index: 2;

      &:before {
        border-color: transparent var(--content2) transparent transparent;
      }

      &:after {
        border-color: transparent transparent transparent var(--content2);
      }
    }
  }
</style>