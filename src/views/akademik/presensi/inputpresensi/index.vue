<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Input Presensi" />

<br>    

<!-- Card for submitting class code -->
    <el-row type="flex" justify="center">
    <el-col :span="6" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card header="Input Kode">
        <div>
            <el-form>
                <el-form-item>
                    <el-input v-model="form.token"></el-input>
                </el-form-item>
            </el-form>
            <div class="bottom clearfix">
            <el-row type="flex" justify="center">
                <el-col :span="10">
                    <el-button @click="onSubmitClicked()" class="button">Submit</el-button>
                </el-col>
            </el-row>
            </div>
        </div>
        </el-card>
    </el-col>
    </el-row>
<!-- End of QR Code Card -->
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  computed: {
    ...mapGetters([
   
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
      listLoading: false
    }
  },
  mounted() {
    this.getUserInfo()
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
            let userData = JSON.parse(response.data.data)
            this.user_id = userData.user.id
        })
      } else {
        this.user_id = ''
      }
    },
    getDataPresensi() {
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/attendance/find/peserta/' + this.form.id_jadwal, {headers: this.auth})
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
    }    
  }
}
</script>