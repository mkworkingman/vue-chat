<template>
  <!-- <div class="users" :class="active && 'users--active'" @click="active = !active"> -->
  <div class="users">
    
    <div tooltip='true' class="users__show-text" @click="showUsers = !showUsers">
      <div tooltip='true' class="users_triange" :class="showUsers && 'users_triange--opened'"></div>
      <span tooltip='true' class="users__text">{{showUsers ? 'Hide' : 'Show'}}  Users</span>
      <div tooltip='true' class="users_triange" :class="showUsers && 'users_triange--opened'"></div>
    </div>

    <div class="users__title">Users:</div>

    <!-- <ul v-if="showUsers" class="users__user-list"> -->
    <ul class="users__user-list" :class="[showUsers && 'users__user-list--show', getIsMobile ? 'users__user-list--mobile' : 'users__user-list--browser']">
      <li tooltip='true' v-for="user in getUsers" :key="user.id" @click="tooltip(user.id)">
        {{ user.nick }}
        <div tooltip='true' v-if="getTooltip === user.id && user.id !== getConnection.id" class="tooltip">
          <div @click="privateChat(user.id, user.nick)">Private Chat</div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Users',
  data() {
    return {
      showUsers: false
    }
  },
  computed: {
    ...mapGetters(['getUsers', 'getConnection', 'getTooltip', 'getIsMobile'])
  },
  methods: {
    ...mapActions(['setTooltip']),
    privateChat(id, user) {
      this.getConnection.emit('chat-private', {id, user});
    },
    tooltip(i) {
      this.setTooltip(i);
    }
  }
}
</script>

<style lang="scss">
  .users {
    grid-area: users;
    background: var(--content1);
    transition: background .5s;

    @media only screen and (min-width: 768px) {
      display: flex;
      flex-direction: column;
      padding-left: 15px;
    }

    > .users__title {
      height: 35px;
      font-weight: 600;
      font-size: 20px;
      display: none;
      align-items: center;

      @media only screen and (min-width: 768px) {
        display: flex;
      }
    }

    > .users__show-text {
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      height: 35px;
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;

      @media only screen and (min-width: 768px) {
        display: none;
      }

      > span {
        width: 160px;
        text-align: center;
      }

      > .users_triange {
        display: block;
        border-style: solid;
        width: 0;
        height: 0;
        border-width: 16px 8px 0 8px;
        border-color: var(--secondary) transparent transparent transparent;
        transition: transform .5s, border-color .5s;

        &.users_triange--opened {
          transform: rotateX(180deg);
        }
      }
    }

    > .users__user-list {
      display: none;
      flex-direction: column;
      max-height: 35vh;
      overflow-y: scroll;
      align-items: center;

      &.users__user-list--mobile {
        overflow-y: scroll;
      }

      &.users__user-list--browser {
        overflow-y: hidden;

        &:hover {
          overflow-y: auto;
          overflow-y: overlay;
        }
      }

      @media only screen and (min-width: 768px) {
        display: flex;
        align-items: flex-start;
        max-height: none;
        overflow-y: auto;
        margin-top: 4px;
      }

      &.users__user-list--show {
        display: flex;
      }

      > li {
        position: relative;
        margin: 4px 0;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;

        &:first-child {
          margin-top: 16px;
        }

        &:last-child {
          margin-bottom: 16px;
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
    }
  }
</style>