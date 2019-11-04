<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Identity" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import Axios from 'axios'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: 'activity',
      auth: {},
      getProfil: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles',
      'email'
    ])
  },
  created() {
    this.getUser()
    this.getProfile()
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: this.name,
        avatar: this.avatar
      }
    },
    // getProfile() {
    //   const token = 'Bearer '+localStorage.getItem('token')
    //   const auth = {
    //     'Authorization' : token,
    //     'Content-Type' : 'application/json'
    //   }
    //   this.auth = auth
    //   axios.get(process.env.VUE_APP_BASE_API + '/profil', {headers: this.auth})
    //   .then((response) => {
    //     console.log(response.data.data)
    //     this.getProfil = response.data.data;
    //   })
    // }
  }
}
</script>
