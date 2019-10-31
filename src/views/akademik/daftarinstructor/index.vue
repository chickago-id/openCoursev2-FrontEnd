<!-- Author : supi.core@gmail.com | github.com/sup1core -->

<template>
  <div style="padding:30px;">

    <!-- Tabel List Data -->
    <el-table
      v-loading="listLoading"
      :data="listData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Pengajar">
        <template slot-scope="scope">
          {{ scope.row.nama_lengkap }}
        </template>
      </el-table-column>
      <el-table-column label="Username">
        <template slot-scope="scope">
          {{ scope.row.user.username }}
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="scope">
          {{ scope.row.user.email }}
        </template>
      </el-table-column>
      <el-table-column label="Phone">
        <template slot-scope="scope">
          {{ scope.row.user.telepon }}
        </template>
      </el-table-column>
      <el-table-column label="Tanggal Lahir">
        <template slot-scope="scope">
          {{ scope.row.user.tanggal_lahir | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="Tanggal Join">
        <template slot-scope="scope">
          {{ scope.row.created_at | formatDate}}
        </template>
      </el-table-column>
      
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="detailData(scope)" size="mini" type="primary" icon="el-icon-edit" circle>Detail</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- End of Tabel List Data -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  computed: {
    ...mapGetters([
      'token',
      'username',
      'roles'
    ]),

  },
  data() {
    return {
      listLoading: true,
      listData: [],
      form: {
        id: '',
        nama_lengkap: '',
        created_by:{
          username:''
        },
        telepon:'',
        updated_by: 1,
        created_at: '',
        updated_at: '',
      },
      successAlertVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '100px'
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const token = 'Bearer '+localStorage.getItem('token')
      const auth = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/list/instructor', {headers: auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
  }
}
</script>
