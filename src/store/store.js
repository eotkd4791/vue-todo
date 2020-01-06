import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// use는 vue의 플러그인 기능 vue를 사용하는 모든 영역에 특정 기능을 추가하고 싶을 때
// Global Functionality의 특성을 추가하는 메소드.

const storage = {
	fetch() {
		const tempArr = [];
		if(localStorage.length > 0) {
			for(let i = 0; i<localStorage.length; i++) {
				if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
					tempArr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
				}
			}
		}
		return tempArr;
	},
};


export const store = new Vuex.Store({ //store변수를 외부에서 사용가능.
	state: {
		todoItems : storage.fetch()
	},
	getters: {
		storedTodoItems(state) {
			return state.todoItems;
		} 
	},
	mutations : {
		addOneItem(state, todoItem) {
		const obj = {completed: false, item: todoItem};
		localStorage.setItem(todoItem, JSON.stringify(obj));
		state.todoItems.push(obj);
		},
		editOneItem(state, payload) {
			window.console.log('editOneItem', payload);
      localStorage.removeItem(payload.oldItem.item);
      state.todoItems[payload.index].item = payload.newItem;
      const newObj = {completed: payload.oldItem.completed, item: payload.newItem};
      localStorage.setItem(payload.newItem,JSON.stringify(newObj));
		},
		removeOneItem(state, payload) {
      localStorage.removeItem(payload.todoItem.item);
      state.todoItems.splice(payload.index, 1);
    },
		toggleOneItem(state, payload) {
      state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed
      localStorage.removeItem(payload.todoItem.item);
      localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
		},
    clearAllItems(state) {
      localStorage.clear();
      state.todoItems = [];
		}
	}
});