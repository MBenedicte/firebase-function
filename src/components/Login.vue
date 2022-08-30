<template>
  <navbar />
  <div class="container">
    <div class="title has-text-centered">Login</div>
    <form @submit.prevent="signInUser">
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
          <button type="submit" class="button is-success">Login</button>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import Navbar from '@/components/navbar.vue';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import router from '@/router';
export default {
  name: 'LoginPage',
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
    signInUser: async function () {
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
      } catch (err) {
        console.log(err.message);
        switch (err.code) {
          case 'err/user-no-found':
            alert('User not found');
            break;
          case 'err/wrong-password':
            alert('wrong password');
            break;
          default:
            alert('Something went wrong');
        }
        return;
      }
      auth.currentUser;
      router.push('/');
    },
    logout: async function () {
      await signOut(auth);
    },
  },
};
</script>
<style scoped>
</style>