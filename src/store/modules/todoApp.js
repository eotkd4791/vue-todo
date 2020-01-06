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

const state = {
    todoItems: storage.fetch()
};

const getters = {
    storedTodoItems(state) {
        return state.todoItems;
    }
};

const mutations = {
    addOneItem(state, todoItem){
        const obj = {completed: false, item: todoItem};
        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItems.push(obj);
    },
    editOneItem(state, payload){
      localStorage.removeItem(payload.oldItem.item);
      state.todoItems[payload.index].item = payload.newItem;
      const newObj = {completed: payload.oldItem.completed, item: payload.newItem};
      localStorage.setItem(payload.newItem,JSON.stringify(newObj));
    },
    removeOneItem(state, payload){
      localStorage.removeItem(payload.todoItem.item);
      state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload){
        state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed
        localStorage.removeItem(payload.todoItem.item);
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    clearAllItems(state){
      localStorage.clear();
      state.todoItems = [];
    }
};

export default {
    state,
    getters,
    mutations
}