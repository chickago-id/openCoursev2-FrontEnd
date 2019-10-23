<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ username }}</div>
    <div class="dashboard-text">token: {{ token }}</div>
    <div class="dashboard-text">roles: {{ roles }}</div> -->
    <component :is="roles[0]" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Admin from './admin'
import Peserta from './peserta'


export default {
  name: 'Dashboard',
  components:{
    Admin,
    Peserta

  },
  data() {
    return {
      //roles: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'token',
      'roles'
    ])
  },
  created() {
    /* if (!this.roles.includes('admin')) {
      this.roles = 'editorDashboard'
    } */
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
