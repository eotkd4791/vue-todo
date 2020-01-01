<template>
  <div id="app">
    <todo-header></todo-header>
    <todo-input v-on:addTodoItem="addOneItem"></todo-input>
    <todo-list v-bind:propsdata="todoItems" 
      v-on:removeItem="removeOneItem"
      v-on:toggleItem="toggleOneItem"
      v-on:editItem="editOneItem"></todo-list>
    <todo-footer v-on:clearAll="clearAllItems"></todo-footer>
  </div>
</template>

<script> 
import TodoHeader from './components/TodoHeader.vue';
import TodoInput  from './components/TodoInput.vue';
import TodoList   from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

export default {
  data: function() {
    return {
      todoItems:[],
    }
  },
  methods: {
    addOneItem: function(todoItem) {
      const obj = {completed: false, item: todoItem};
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },

    editOneItem: function(oldItem, newItem, index) {
      window.console.log("App",index);
      localStorage.removeItem(oldItem.item);
      this.todoItems[index].item = newItem;
      const obj = {completed: oldItem.completed, item: newItem};
      localStorage.setItem(newItem,JSON.stringify(obj));
    },

    removeOneItem: function(todoItem, index) {
      localStorage.removeItem(todoItem.item);
      this.todoItems.splice(index, 1);
      //특정 인덱스에서 하나를 지운다. 기존의 배열을 수정하고 새로운 배열을 만들어 반환.
      //slice는 원래 배열은 수정하지 않고 지운다. 
    },

    toggleOneItem: function(todoItem, index) {
      this.todoItems[index].completed = !this.todoItems[index].completed
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    
    clearAllItems : function() {
      localStorage.clear();
      this.todoItems = [];
    }
  },
  created: function() {
    if(localStorage.length > 0) {
      for(let i = 0; i<localStorage.length; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
          this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F6;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0,0,0,0.03);
}
</style>
