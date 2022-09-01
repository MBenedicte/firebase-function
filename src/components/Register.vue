<template>
  <navbar />

  <div class="container">
    <div class="title has-text-centered">Register</div>
    <form @submit.prevent="registerNewUser">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            type="email"
            v-model="email"
            placeholder="e.g.email@gmail.com"
          />
        </div>
      </div>

      <div class="field">
        <label class="label">password</label>
        <div class="control">
          <input class="input" v-model="password" type="password" />
        </div>
      </div>
      <div class="field">
        <p class="control">
          <button type="submit" class="button is-success">Register</button>
        </p>
      </div>
    </form>
    
  </div>
</template>
<script>
import Navbar from '@/components/navbar.vue';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import router from '@/router';
export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  components: {
    Navbar,
  },
  methods: {
    registerNewUser: async function () {
      console.log('email:', this.email, ', password:', this.password);
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Email already in user');
            break;
          case 'auth/invalid-email':
            alert('invalid email');
            break;
          case 'auth/operation-not-allowed':
            alert('operation not allowed');
            break;
          case 'auth/weak-password':
            alert('weak password');
            break;

          default:
            alert(error.message);
        }
        return;
      }
      router.push('/');
    },
    
  },
};
</script>
<style scoped></style>
