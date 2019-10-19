<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        
        <el-col :span="6" :xs="24">
          <mailbox/>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <trash/>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mailbox from './components/mailbox'
import trash from './components/trash'
import sent from './components/sent'
import draft from './components/draft'

export default {
  name: 'Profile',
  components: {  trash, sent, draft, mailbox },
  data() {
    return {
      user: {},
      activeTab: 'inbox',
      tabPosition: 'left',
    }
  },
    

}
</script>