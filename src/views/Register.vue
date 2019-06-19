<template>
  <div class="content-wrapper">
    <div class="wrapper">
      <div :class="'alert ' + alert.type" v-if="alert.message">{{alert.message}}</div>
      <h2 class="form-title">Register</h2>
      <div class="form">
        <form @submit.prevent="handleSubmit">
          <input placeholder="name" required type="text" v-model="name">
          <input placeholder="email" required type="text" v-model="email">
          <input placeholder="password" required type="password" v-model="password">
          <input
            placeholder="confirm password"
            required
            type="password"
            v-model="password_confirmation"
          >
          <div class="select-form">
            <label for="password-confirm">administrator account?</label>
            <select v-model="isAdmin">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <button>create</button>
          <p class="message">
            Already registered?
            <router-link to="/login">Sign In</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { setTimeout } from 'timers'
export default {
  props: ['nextUrl'],
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      isAdmin: 0
    }
  },
  computed: {
    ...mapState(['alert'])
  },
  methods: {
    ...mapActions(['checkStatus', 'error']),
    handleSubmit() {
      if (
        this.password === this.password_confirmation &&
        this.password.length > 0
      ) {
        let url = this.isAdmin === 1 ? '/register-admin' : '/register'

        this.$http
          .post(url, {
            name: this.name,
            email: this.email,
            password: this.password,
            isAdmin: this.isAdmin
          })
          .then(res => {
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('jwt', res.data.token)
            this.checkStatus()
            this.$router.push('/')
          })
          .catch(err => {
            this.error(err.response.data)
          })
      } else {
        this.name = ''
        this.passsword = ''
        this.error('Password not matched!')
        setTimeout(() => {
          this.clearErr()
        }, 1000)
      }
    }
  }
}
</script>

<style src="@/assets/styles/main.css" scoped>
</style>