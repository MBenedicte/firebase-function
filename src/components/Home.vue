<template>
  <navbar />
  <div class="container">
    <div class="title has-text-centered">To do app</div>
    <form @submit.prevent="addTodo" class="mb-5">
      <div class="field is-grouped">
        <p class="control is-expanded">
          <input
            v-model="todoContent"
            class="input"
            type="text"
            placeholder="Add to do"
          />
        </p>
        <p class="control">
          <button :disabled="!todoContent" class="button is-info">Add</button>
        </p>
      </div>
    </form>

    <div
      v-for="todo in todos"
      class="card mb-5"
      :key="todo.id"
      :class="{ 'has-background-success-light': todo.done }"
    >
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div
              class="column"
              :class="{ 'has-text-success line-through': todo.done }"
            >
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'"
                @click="doneTodo(todo.id)"
              >
                &check;
              </button>
              <button
                class="button is-danger ml-2"
                @click="deleteTodo(todo.id)"
              >
                &cross;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue';
import { db } from '@/firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
const collectionRef = collection(db, 'todos');
export default {
  name: 'HomePage',
  components: {
    Navbar,
  },
  data() {
    return {
      todos: [],
      todoContent: '',
    };
  },
  methods: {
    addTodo: async function () {
      await addDoc(collectionRef, {
        content: this.todoContent,
        done: false,
      });

      this.todoContent = '';
    },
    deleteTodo: function (id) {
      deleteDoc(doc(collectionRef, id));
    },
    doneTodo: function (id) {
      const index = this.todos.findIndex((todo) => {
        return todo.id === id;
      });

      updateDoc(doc(collectionRef, id), {
        done: !this.todos[index].done,
      });
    },
  },
  mounted: async function () {
    onSnapshot(collectionRef, (querySnapshot) => {
      const fbtodos = [];
      querySnapshot.forEach((doc) => {
        const todo = {
          id: doc.id,
          content: doc.data().content,
          done: doc.data().done,
        };
        fbtodos.push(todo);
        this.todos = fbtodos;
      });
    });
  },
};
</script>

<style>
@import 'bulma/css/bulma.min.css';

.container {
  max-width: 400px !important;
  padding: 20px;
  margin: 0 auto;
}
.line-through {
  text-decoration: line-through;
}
</style>
