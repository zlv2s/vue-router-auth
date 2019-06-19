<template>
  <div id="app">
    <ul class="nav nav-pills">
      <li class="active">
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/login" v-if="!loginStatus">Login</router-link>
      </li>
      <li>
        <router-link to="/register" v-if="!loginStatus">Register</router-link>
      </li>
      <li>
        <a @click="signout" v-if="loginStatus">Signout</a>
      </li>
    </ul>
    <div class="container">
      <div class="row">
        <transition mode="out-in" name="slide-fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['loginStatus'])
  },
  methods: {
    ...mapActions(['checkStatus']),
    signout() {
      localStorage.clear()
      this.checkStatus()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  padding: 20px;
  overflow: hidden;
}
</style>
