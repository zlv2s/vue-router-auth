<template>
  <div>
    <div class="p-20">
      <h1>Welcome back !</h1>
      <p>
        You are now logged in as
        <strong>{{ `${user.name}(${user.email})`}}</strong>
      </p>
    </div>
    <table class="table table-hover text-center">
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>email</th>
          <th>administrator</th>
          <th>edit</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="user.id" v-for="user in all">
          <th>{{user.id}}</th>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.is_admin | booleanFormat}}</td>
          <td>
            <span @click="removeItem(user.id)" class="glyphicon glyphicon-remove cursor"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  created() {
    this.getAll()
  },
  computed: {
    ...mapState(['all', 'user'])
  },
  filters: {
    booleanFormat(v) {
      return v ? 'yes' : 'no'
    }
  },
  methods: {
    ...mapMutations(['setAll']),
    getAll() {
      this.$http.get('/all').then(res => {
        this.setAll(res.data.users)
      })
    },
    removeItem(id) {
      this.$http.post('/delete', { id }).then(res => {
        if (res.status === 200) this.getAll()
      })
    }
  },
  components: {}
}
</script>

<style src="@/assets/styles/main.css">
</style>
