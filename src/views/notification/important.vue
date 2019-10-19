<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        
        <el-col :span="6" :xs="24">
          <mailbox/>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <important/>
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
import important from './components/important'
import draft from './components/draft'


export default {
  name: 'Profile',
  components: {  inbox, sent, important, mailbox, draft },
  data() {
    return {
      user: {},
      activeTab: 'inbox',
      tabPosition: 'left',
    }
  },
    

}
</script>