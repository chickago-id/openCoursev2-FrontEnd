<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <mailbox/>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <sent/>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mailbox from './components/mailbox'
import inbox from './components/inbox'
import sent from './components/sent'
import draft from './components/draft'

export default {
  name: 'Profile',
  components: {  inbox, sent, draft, mailbox },
  data() {
    return {
      user: {},
      activeTab: 'inbox',
      tabPosition: 'left',
    }
    }

    
  
//   computed: {
//     ...mapGetters([
//       'name',
//       'avatar',
//       'roles'
//     ])
//   },
//   created() {
//     this.getUser()
//   },
//   methods: {
//     getUser() {
//       this.user = {
//         name: this.name,
//         role: this.roles.join(' | '),
//         email: 'admin@test.com',
//         avatar: this.avatar
//       }
//     }
//   }
}
</script>

