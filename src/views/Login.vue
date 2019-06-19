<template>
  <div class="content-wrapper">
    <div class="wrapper">
      <div :class="'alert ' + alert.type" v-if="alert.message">{{alert.message}}</div>
      <h2 class="form-title">Login</h2>
      <div class="form">
        <form @submit.prevent="handleSubmit">
          <input placeholder="email" required type="text" v-model="email">
          <input placeholder="password" required type="password" v-model="password">
          <button>login</button>
          <p class="message">
            Not registered?
            <router-link to="/register">Create an account</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(['alert'])
  },
  methods: {
    ...mapActions(['checkStatus', 'error']),
    handleSubmit() {
      if (this.password.length > 0) {
        this.$http
          .post('/login', {
            email: this.email,
            password: this.password
          })
          .then(res => {
            if (res.status === 200) {
              let isAdmin = res.data.user.is_admin
              localStorage.setItem('user', JSON.stringify(res.data.user))
              localStorage.setItem('jwt', res.data.token)
              this.checkStatus()
              if (isAdmin === 1) {
                this.$router.push('/admin')
              } else {
                this.$router.push('/')
              }
            }
          })
          .catch(err => {
            this.error(err.response.data)
          })
      }
    }
  }
}
</script>

<style src="@/assets/styles/main.css" scoped>
</style>