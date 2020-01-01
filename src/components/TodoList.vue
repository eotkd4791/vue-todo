<template>
  <div>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" v-bind:key="todoItem.item" class="shadow">
        <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" 
            v-on:click="toggleComplete(todoItem, index)"></i>
        <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
        
        <span class="Btn">
          <span class="editBtn" v-on:click="editReady(todoItem, index)">
            <i class="fas fa-edit"></i>
          </span>
          <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
            <i class="fas fa-trash-alt"></i>
          </span>
        </span>
      </li>
    </transition-group>
    <!-- Modal창 띄우기 -->
    <eModal v-if="getModal" @close="getModal=false">
      <h3 slot="eheader">
        일정 수정하기
      </h3>
      <div slot="ebody" class="inputBox">
        <input slot="ebody" placeholder="수정할 내용을 입력해주세요!" v-model="editTodoItem" v-on:keypress.enter="editTodo(oldTodoItem, editTodoItem, getIndex)">
      </div>
      <div slot="efooter">
        <i class="yesModalBtn far fa-check-circle" @click="editTodo(oldTodoItem,editTodoItem,getIndex)"></i>
        <i class="noModalBtn fas fa-times" @click="getModal=false"></i>
      </div>
    </eModal>
  </div>
</template>

<script>
import editModal from './common/editModel';

export default {
  props: ['propsdata'],
  data : function() {
    return {
      editTodoItem: '',
      oldTodoItem:'',
      getModal: false,
      getIndex: -1
    }
  },
  methods: {
    editReady: function(todoItem, index) {
      this.getModal = true;
      this.oldTodoItem = todoItem;
      this.getIndex = index;
    },
    editTodo: function(oldItem, newItem, index) {
      if(newItem !==''){
        this.$emit('editItem', oldItem, newItem, index);
        this.oldTodoItem ='';
        this.editTodoItem='';
        this.getModal = false;
        this.getIndex = -1;
      } 
    },
    removeTodo: function(todoItem, index) {
      this.$emit('removeItem', todoItem, index); 
    },
    toggleComplete: function(todoItem, index) {
      this.$emit('toggleItem', todoItem, index);
    }
  },
  components: {
    eModal : editModal
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}

li {
  display: flex;
  min-height:50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}

.Btn {
  margin-left: auto;
}

.editBtn {
  color: #3d2aeb;
}

.removeBtn {
  color: #de4343;
}

.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}

.checkBtnCompleted {
  color: #b3adad;
}

.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
/* Modal */
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}

.inputBox input {
  height: 20px;  
  border-radius: 5px;
  border-style: solid;
  border-color: #45b983;
  font-size: 0.9rem;
}

.yesModalBtn {
  color: #45b983;
}

.noModalBtn {
  color: red;
}

/* list-item */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>