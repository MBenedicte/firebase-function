<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start" v-if="currentPage === 'home'">
        <a class="navbar-item" href="/"> Home </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a
              class="button is-primary"
              href="/register"
              v-if="currentPage === 'login' || currentPage === 'register'"
            >
              <strong>Sign up</strong>
            </a>
            <a
              class="button is-light"
              href="/login"
              v-if="currentPage === 'login' || currentPage === 'register'"
            >
              Log in
            </a>
            <a
              class="button is-light"
              v-if="currentPage === 'home'"
              @click="logout"
              href="/login"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth';
export default {
  name: 'NavBar',
  data() {
    return {
      currentPage: 'home', //register, home
    };
  },
  methods: {
    logout: async function () {
      await signOut(auth);
    },
  },
  mounted: function () {
    switch (this.$route.fullPath) {
      case '/':
        console.log('home');
        this.currentPage = 'home';
        break;
      case '/login':
        console.log('L');
        this.currentPage = 'login';
        break;
      case '/register':
        console.log('r');
        this.currentPage = 'register';
        break;
      default:
        this.currentPage = '';
    }
  },
};
</script>