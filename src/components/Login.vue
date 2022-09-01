<template>
  <navbar />
  <div class="container">
    <div class="title has-text-centered">Login</div>
    <form @submit.prevent="signInUser" class="mb-5">
      <div class="field">
        <label class="label"> Email</label>
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
          <button type="submit" class="button is-primary">Login</button>
        </p>
      </div>
    </form>

    <button class="button is-fullwidth is-primary mb-5" @click="googleLogin">
      Login with Google
    </button>
    <button class="button is-fullwidth is-primary mb-5" @click="usePhonenumber">
      Login with your phonenumber
    </button>
    <div v-if="usePhone">
      <form @submit.prevent="sendSMS" class="mb-5">
        <p><label class="label"> phonenumber</label></p>
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input
              class="input"
              type="text"
              v-model="phonenumber"
              placeholder="12345678"
            />
          </p>
          <p class="control">
            <button type="submit" class="button is-info">Send SMS</button>
          </p>
        </div>
      </form>

      <div id="recaptcha-container" class="justify-center flex"></div>
      <br />
      <form
        @submit.prevent="verifyCode()"
        class="mb-5"
        v-if="verificationCodeDiv"
      >
        <p><label class="label"> VerificationCode</label></p>
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input
              class="input"
              type="text"
              v-model="verificationCode"
              placeholder="1234"
            />
          </p>
          <p class="control">
            <button type="submit" class="button is-info">Send</button>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Navbar from '@/components/navbar.vue';
import { auth } from '@/firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import router from '@/router';
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      usePhone: false,
      phonenumber: '',
      verificationCode: '',
      verificationCodeDiv: false,
      confirmationResult: {},
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
    googleLogin: function () {
      let provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((res) => {
          console.log(res.user);
          router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    usePhonenumber: function () {
      this.usePhone = true;
    },
    sendSMS: async function () {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {},
        auth
      );

      window.recaptchaVerifier.render();

      let appVerifier = window.recaptchaVerifier;

      await signInWithPhoneNumber(auth, this.phonenumber, appVerifier)
        .then((result) => {
          this.verificationCodeDiv = true;
          this.confirmationResult = result;
        })
        .catch((error) => {
          alert('Something went wrong');
          console.log('error', error);
        });
    },
    verifyCode: function () {
      this.confirmationResult
        .confirm(this.verificationCode)
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          alert('Something went wrong');
          console.log(err.message);
        });
    },
  },
};
</script>
<style scoped>
</style>