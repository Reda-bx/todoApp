<template>
  <div class="container">
    <div class="header">
      <h1>ok</h1>
      <span class="total">Done {{remaining}} / {{todos.length}}</span>
      <ul class="filters">
        <li @click="visibility = 'allTodos'" :class="{ selected: visibility === 'allTodos' }">All</li>
        <li @click="visibility = 'pendingTodos'" :class="{ selected: visibility === 'pendingTodos' }">Active</li>
        <li @click="visibility = 'completed'" :class="{ selected: visibility === 'completed' }">Completed</li>
      </ul>
    </div>
    <input class="new-todo" placeholder="Add new todo" type="text" v-model="newTodo" @keyup.enter="handleCreateTodo">
    <ul class="todo-list">
      <li v-for="todo in filteredTodos" class="todo" :key="todo.id" :class="{ completed: todo.checked }">
        <div class="form-group">
          <input :id="todo.id" type="checkbox" @click="handleUpdateTodo(todo)" v-model="todo.checked">
          <label :for="todo.id"></label>
          <input type="text" @blur="handleUpdateTodo(todo)" v-model="todo.text" />
        </div>
        <span @click="handleDeleteTodo(todo.id)" class="fa fa-trash"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todos'

export default {
  name: 'index',
  data () {
    return {
      todos: [],
      newTodo: '',
      visibility: 'allTodos'
    }
  },
  mounted () {
    getTodos()
    .then(response => {
      this.todos = response.data
    })
  },
  methods: {
    handleCreateTodo () {
      const text = this.newTodo
      if (text) {
        createTodo(text)
        .then(response => {
          this.todos.push(response.data)
          this.newTodo = ''
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    handleUpdateTodo (todo) {
      if (todo.text) {
        updateTodo(todo.id, todo)
        .then(response => {
          this.todos = this.todos.map(x => x.id === todo.id ? response.data : x)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    handleDeleteTodo (id) {
      deleteTodo(id)
      .then(response => {
        this.todos = this.todos.filter(x => x.id !== id)
      })
      .catch(err => {
        console.log(err)
      })
    },
    filters () {
      return {
        allTodos (todos) {
          return todos
        },
        pendingTodos (todos) {
          return todos.filter(x => !x.checked)
        },
        completed (todos) {
          return todos.filter(x => x.checked)
        }
      }
    }
  },
  computed: {
    remaining () {
      return this.todos.filter(x => x.checked).length
    },
    filteredTodos () {
      return this.filters()[this.visibility](this.todos)
    }
  }
}
</script>

<style lang="sass">
.container
  max-width: 420px
  margin: 0 auto
  padding: 10px 0
  .header
    display: flex
    justify-content: space-between
    margin: 10px 0
    font-size: 14px
    ul.filters
      list-style: none
      padding: 0
      margin: 0
      li
        display: inline
        font-size: 13px
        cursor: pointer
        margin: 0 4px
        &.selected
          background-color: #41b883
          color: #FFFFFF
          border-radius: 4px
          padding: 2px 5px
  .new-todo
    padding-left: 10px
    border-color: #D4D7D9
    color: #35495e
    margin-top: 7px
    border: 1px solid #7E8DA3
    border-radius: 4px
    height: 35px
    width: 100%
    font-size: 15px
    outline: 0
    box-sizing: border-box
  .todo-list
    list-style: none
    padding: 0
    li.todo
      display: flex
      justify-content: space-between
      align-items: center
      .form-group
        width: 90%
        input[type="text"]
          width: 80%
          font-size: 20px
          font-weight: 500
          border: 0
          margin: 10px 0
          outline: 0
        label
          cursor: pointer
      &.completed
        input[type="text"]
          opacity: 0.5
          text-decoration: line-through
      span
        color: #e74c3c
        cursor: pointer

/* to hide the checkbox itself */
input[type=checkbox]
	display: none
input[type=checkbox] + label:before
  font-family: FontAwesome
  display: inline-block

/* unchecked icon */
input[type=checkbox] + label:before
	content: "\f096"
/* space between checkbox and label */
input[type=checkbox] + label:before
	letter-spacing: 10px
/* checked icon */
input[type=checkbox]:checked + label:before
	content: "\f046"
/* allow space for check mark */
input[type=checkbox]:checked + label:before
	letter-spacing: 5px
</style>
