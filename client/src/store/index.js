import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import io from "socket.io-client";
import moment from 'moment';
import { isMobile } from 'mobile-device-detect';
export default new Vuex.Store({
  state: {
    nick: null,
    connection: null,
    activeRoom: 'general',
    rooms: [{id: 'general', name: 'General'}],
    messages: {
      general: []
    },
    users: [],
    tooltip: null,
    isMobile,
    theme: localStorage.getItem('theme') || 'light',
  },
  mutations: {
    setTheme(state, payload) {
      localStorage.setItem('theme', payload);
      state.theme = payload;
    },
    setNick(state, payload) {
      state.nick = payload;
    },
    setConnection(state, payload) {
      state.connection = payload;
    },
    setBotMessage(state, payload) {
      state.messages.general.push({
        user: 'BOT',
        id: 'bot',
        text: payload.text,
        time: moment().format('H:mm:ss'),
        className: 'msg--bot'
      });
      state.users = payload.users
    },
    setUserMessage(state, payload) {
      const { user, text, id, room } = payload;
      state.messages[room].push({
        user,
        id,
        text,
        time: moment().format('H:mm:ss'),
        className: id === state.connection.id ? 'msg--outcoming' : 'msg--incoming'
      });
    },
    setPrivateRoom(state, payload) {
      state.rooms.push({id: payload.roomId, name: payload.roomName});
      state.messages =  Object.assign({}, state.messages, { [payload.roomId]: [] });
    },
    setActiveRoom(state, payload) {
      state.activeRoom = payload;
    },
    setTooltip(state, payload) {
      state.tooltip = payload;
    }
  },
  actions: {
    setTheme(context) {
      const theme = context.state.theme === 'light' ? 'dark' : 'light';
      context.commit('setTheme', theme);
    },
    setNick(context, nick) {
      context.commit('setNick', nick);
    },
    setConnection(context) {
      const connection = io("/");
      // const connection = io("http://localhost:3000");
      context.commit('setConnection', connection);
    },
    setBotMessage(context, msg) {
      context.commit('setBotMessage', msg);
    },
    setUserMessage(context, msg) {
      context.commit('setUserMessage', msg);
    },
    setPrivateRoom(context, chat) {
      context.commit('setPrivateRoom', chat);
    },
    setActiveRoom(context, chat) {
      context.commit('setActiveRoom', chat);
    },
    setTooltip(context, tooltip) {
      context.commit('setTooltip', tooltip);
    }
  },
  modules: {
  },
  getters: {
    getTheme: state => state.theme,
    getNick: state => state.nick,
    getMessages: state => state.messages,
    getRooms: state => state.rooms,
    getActiveRoom: state => state.activeRoom,
    getConnection: state => state.connection,
    getUsers: state => state.users,
    getTooltip: state => state.tooltip,
    getIsMobile: state => state.isMobile
  }
})
