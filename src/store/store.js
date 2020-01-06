import Vue from 'vue';
import Vuex from 'vuex';
import todoApp from './modules/todoApp';

Vue.use(Vuex);

export const store = new Vuex.Store({ //store변수를 외부에서 사용가능.
  modules: {
    todoApp
  }
});