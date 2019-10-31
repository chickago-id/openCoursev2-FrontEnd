<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Lihat Presensi" />

<br>    
<br>
    <!-- Tabel List Data -->
    <br>
    <br>
    <el-table
      v-loading="listLoading"
      :data="listData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="Kode Kelas">
        <template slot-scope="scope">
          {{ scope.row[0].jadwal.kelas.kode_kelas }}
        </template>
      </el-table-column>
      <el-table-column label="Kode Materi">
        <template slot-scope="scope">
          {{ scope.row[0].jadwal.materi.kode_materi }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Peserta">
        <template slot-scope="scope">
          {{ scope.row[0].userDetail.nama_lengkap }}
        </template>
      </el-table-column>
      <el-table-column label="Jumlah Presensi">
        <template slot-scope="scope">
          {{ scope.row[1] }}
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button  type="primary" icon="el-icon-view" circle size="mini"
            @click="showDetails(scope)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- End of Tabel List Data -->
    <el-row type="flex" justify="end">
        <br>
        <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div>
        <br>
    </el-row>

    <!-- Form Lihat Detail -->
    <el-dialog width="70%" align="center" title="Lihat Detail" :visible.sync="dialogFormVisible">
      <el-table
      v-loading="listLoadingDetails"
      :data="listDataDetails"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="Kode Kelas">
        <template slot-scope="scope">
          {{ scope.row.jadwal.kelas.kode_kelas }}
        </template>
      </el-table-column>
      <el-table-column label="Kode Materi">
        <template slot-scope="scope">
          {{ scope.row.jadwal.materi.kode_materi }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Peserta">
        <template slot-scope="scope">
          {{ scope.row.userDetail.nama_lengkap }}
        </template>
      </el-table-column>
      <el-table-column label="Jam Presensi">
        <template slot-scope="scope">
          {{ scope.row.clock | formatTime }}
        </template>
      </el-table-column>
      <el-table-column label="Tanggal">
        <template slot-scope="scope">
          {{ scope.row.clock | formatDate2 }}
        </template>
      </el-table-column>
    </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- End of Form Lihat Detail -->

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  computed: {
    ...mapGetters([
      'id_user',
      'username'
   ])
  },
  data() {
    return {
      auth: '',
      user_id: '',
      form: {
        id_kelas: '',
        id_jadwal: '',
        token: ''
      },
      listData: [],
      listLoading: false,
      listDataDetails: [],
      listLoadingDetails: false,
      dialogFormVisible: false
    }
  },
  created() {
    this.getUserInfo()
    this.getDataPresensi()
  },
  methods: {
    getUserInfo() {
      if(localStorage.getItem('token') != null) {
        const token = 'Bearer '+localStorage.getItem('token')
        const auth = {
            'Authorization' : token,
            'Content-Type' : 'application/json'
        }
        this.auth = auth
        axios.get(process.env.VUE_APP_BASE_API + '/profil', { headers: auth })
        .then(response =>{
            //let userData = JSON.parse(response.data.data)
            //this.user_id = userData.user.id
        })
      } else {
        this.user_id = ''
      }
    },
    getDataPresensi() {
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API 
        + '/attendance/find/presensi/peserta/' 
        + this.id_user, {headers: this.auth})
      .then(response => {
        if(response.data.status === 'ERROR') {
          alert(response.data.message)
          this.listLoading = false
        } else {
          console.log(response.data.data)
          this.listData = response.data.data
          this.listLoading = false
        }
      }).catch((error) => {
        alert(error)
      })
    },
    onSubmitClicked() {
      console.log('clicked')
      axios.post(process.env.VUE_APP_BASE_API + '/attendance/absen/', this.form, {headers: this.auth})
      .then(response => {
        if(response.data.status === 'ERROR') {
          alert(response.data.message)
        } else {
          this.form.id_jadwal = response.data.data[0]['id_jadwal']
          this.getDataPresensi()
        }
      })
    },
    refreshData() {
      this.getDataPresensi()
    },
    showDetails(scope) {
      this.form.id_jadwal = scope.row[0].id_jadwal
      this.getDataPresensiDetails()
      this.dialogFormVisible = true
    },
    getDataPresensiDetails() {
      this.listLoadingDetails = true
      axios.get(process.env.VUE_APP_BASE_API 
        + '/attendance/find/peserta/' 
        + this.form.id_jadwal, {headers: this.auth})
      .then(response => {
        if(response.data.status === 'ERROR') {
          alert(response.data.message)
          this.listLoadingDetails = false
        } else {
          console.log(response.data.data)
          this.listDataDetails = response.data.data
          this.listLoadingDetails = false
        }
      }).catch((error) => {
        alert(error)
      })
    },
  }
}
</script>