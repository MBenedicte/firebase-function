<template>
  <router-view />
</template>

<script>
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
  name: 'App',

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

</style>
