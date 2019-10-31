<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Buat Kode Presensi" />

<br>    
<el-row type="flex" class="row-bg" >
<!-- Form Select Kelas -->
    <el-form :inline="true" :model="form">
      <el-form-item size="small" label="Pilih Kelas" :label-width="formLabelWidth">
        <el-select @change="onKelasSelected($event)" v-model="form.id_kelas" placeholder="Select">
          <el-option
            v-for="item in kelasOption"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>   
      </el-form-item>
      <el-form-item size="small" label="Pilih Materi" :label-width="formLabelWidth">
        <el-select @change="onMateriSelected($event)" v-model="form.id_materi" placeholder="Select">
          <el-option
            v-for="item in materiOption"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>   
      </el-form-item>
      <el-form-item>
          <el-button size="medium" @click="onBuatCodeClicked" type="primary">Check In</el-button>
      </el-form-item>
      <el-form-item>    
          <el-button size="medium" @click="onCOClicked" type="danger">Check Out</el-button>
      </el-form-item>
    </el-form>
<!-- End of Form Select Kelas -->
</el-row>

<!-- Card for displaying QR Code -->
    <el-row type="flex" justify="center">
    <el-col :span="6" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card header="Kode Kelas">
        <img width="200px" src="https://images-eu.ssl-images-amazon.com/images/I/61Hl8dIg7WL.png" class="image">
        <div style="padding: 10px;">
            <h1>{{tokenKelas}}</h1>
        </div>
        </el-card>
    </el-col>
    </el-row>
<!-- End of QR Code Card -->
<br>
    <!-- Tabel List Data Presensi -->
    <el-button @click="refreshData()" size="small">Refresh Data</el-button>
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
      <el-table-column label="Kelas">
        <template slot-scope="scope">
          {{ scope.row.kelas.masterKelas.nama_kelas }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Pengajar">
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
    
    <!-- Form Check Out -->
    <el-dialog width="70%" align="center" title="Check Out" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="Distribusi Materi" :label-width="formLabelWidth">
          <el-input type="text" maxlength="10" v-model="form.distribusi_materi" autocomplete="off" placeholder="Ex: Microsoft Word Dasar"></el-input>
        </el-form-item>
        <el-form-item required label="Catatan" :label-width="formLabelWidth">
          <el-input type="text" maxlength="10" v-model="form.catatan" autocomplete="off" placeholder="Ex: Materi hari ini banyak yang belum paham"></el-input>
        </el-form-item>
      </el-form>
      <!-- Tabel List Kelas Peserta -->
    <br>
    <p>*Klik tombol aksi sesuai status kehadiran peserta</p>
    <el-table
      v-loading="listLoadingKP"
      :data="listDataKP"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="No" width="40">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="Kode Kelas">
        <template slot-scope="scope">
          {{ scope.row.kelas.kode_kelas }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Peserta">
        <template slot-scope="scope">
          {{ scope.row.user.nama_lengkap }}
        </template>
      </el-table-column>
      <el-table-column width="415px" label="Action">
        <template slot-scope="scope">
          <el-button title="Hadir" type="success" size="mini" plain
            @click="onHadirClicked(scope)">
            Hadir
          </el-button>
          <el-button title="Sakit" type="info" size="mini" plain
            @click="onTerlambatClicked(scope)">
            Terlambat
          </el-button>
          <el-button title="Sakit" type="info" size="mini" plain
            @click="onSakitClicked(scope)">
            Sakit
          </el-button>
          <el-button title="Izin" type="info" size="mini" plain
            @click="onIzinClicked(scope)">
            Izin
          </el-button>
          <el-button title="Alpha" type="danger" size="mini" plain
            @click="onAlphaClicked(scope)">
            Alpha
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- End of Tabel List Kelas Peserta -->
    
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addData">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- End of Form Check Out -->

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
        ])
    },
    data() {
        return {
          msg: '',
          auth: '',
          user_id: '',
          kelasOption: [{'key': '', 'value': '', 'label': ''}],
          materiOption: [{'key': '', 'value': '', 'label': ''}],
          form: {
            id_kelas: '',
            id_materi: '',
            id_jadwal: '',
            token: '',
            distribusi_materi: '',
            catatan: '',
            is_approved: '',
            id_user: ''
          },
          tokenKelas: '',
          listData: [],
          listLoading: false,
          listDataKP: [],
          listLoadingKP: false,
          dialogFormVisible: false,
          formLabelWidth: '150px'
        }
    },
    created() {
      this.getUserInfo()
      this.getDataKelas()
    },
    mounted() {
      
    }, 
    methods: {
      failedNotif() {
        const h = this.$createElement;
        this.$notify({
          message: h(
            "i",
            { style: "color: red" },
            this.msg,  
          ),
          type: "error",
          showClose: false,
          duration: 2000
        });  
        this.loading = false 
      },
      onMateriSelected() {
        axios.get(process.env.VUE_APP_BASE_API + '/attendance-token/find/jadwal/' 
          + this.form.id_kelas + '/' + this.form.id_materi, { headers: this.auth })
        .then((response) => {
          if(response.data.status === 'ERROR') {
            this.msg = response.data.message
            this.failedNotif()
          } else {
            console.log(response.data.data[0].id)
            this.form.id_jadwal = response.data.data[0].id
          }
        }).catch((error) => {
          console.log(error)
        })
      },
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
      getDataKelas() {
          axios.get(process.env.VUE_APP_BASE_API+'/attendance-token/find/kelas', {headers: this.auth})
          .then((response) => {
            console.log(response.data)
            if(response.data.status === "OK ADMIN") {
              response.data.data.forEach(item => {
                this.kelasOption.push (
                  {
                    key: item.id,
                    value: item.id,
                    label: item.kode_kelas
                  }
                )
              })
            } else if (response.data.status === "OK") {
              response.data.data.forEach(item => {
                this.kelasOption.push (
                    {
                    value: item.id_kelas,
                    label: item.kelas.kode_kelas
                    }
                )
              })
            } else if (response.data.status === "ERROR") {
              this.msg = response.data.message
            }
          }).catch((error) => {
            this.msg = error
          })
      },
        onKelasSelected(event) {
          this.materiOption = []
          axios.get(process.env.VUE_APP_BASE_API + '/attendance-token/find/' + this.form.id_kelas + '/materi', { headers: this.auth })
            .then((response) => {
              if(response.data.status === 'ERROR') {
                this.msg = response.data.message
                this.failedNotif()
              } else {
                response.data.data.forEach(item => {
                  this.materiOption.push({
                    key: item.id_materi,
                    value: item.id_materi,
                    label: item.materi.kode_materi
                  })
                })
              }
            }).catch((error) => {
              console.log(error)
            })
        },
        onBuatCodeClicked() {
            axios.post(process.env.VUE_APP_BASE_API + '/attendance-token', this.form, {headers:this.auth})
            .then((response) => {
              console.log(response)
                this.tokenKelas = response.data.data[0]['token']
            })
        },
      getDataPresensi() {
        this.form.token = this.tokenKelas
        this.listLoading = true
        axios.post(process.env.VUE_APP_BASE_API + '/attendance/find/kelas/', this.form, {headers: this.auth})
        .then(response => {
          if(response.data.status === 'ERROR') {
            alert(response.data.message)
            this.listLoading = false
          } else {
            this.listData = response.data.data
            this.listLoading = false
          }
        })
      },
      getKelasPeserta() {
        this.listLoadingKP = true
        axios.get(
          process.env.VUE_APP_BASE_API + '/attendance/find/kelaspeserta/verify/' + this.form.id_kelas, 
          {headers: this.auth}
        ).then((response) => {
          if(response.data.status === 'ERROR') {
            alert(response.data.message)
            this.listLoadingKP = false
          } else {
            console.log(response.data.data)
            this.listDataKP = response.data.data
            this.listLoadingKP = false
          }
        }).catch((error) => {
          alert(error)
          this.listLoadingKP = false
        })
      },
      refreshData() {
        this.getDataPresensi()
      },
      onCOClicked() {
        this.getKelasPeserta()
        this.dialogFormVisible = true
      },
      onHadirClicked(scope) {
        this.form.id_user = scope.row.user.id_user
        this.form.is_approved = 1
        axios.post(
          process.env.VUE_APP_BASE_API + '/attendance/absen/verify/' + this.form.is_approved,
          this.form,
          {headers: this.auth}
        ).then((response) => {
          if(response.data.status === 'ERROR') {
            alert(response.data.message)
          } else {
            alert(response.data.message)
            this.listDataKP.splice(scope.$index, 1)
            this.form.id_user = ''
            this.form.is_approved = ''
          }
        }).catch((error) => {
          alert(error)
        })
      },
      onTerlambatClicked(scope) {
        this.form.id_user = scope.row.user.id_user
        this.form.is_approved = 2
        axios.post(
          process.env.VUE_APP_BASE_API + '/attendance/absen/verify/' + this.form.is_approved,
          this.form,
          {headers: this.auth}
        ).then((response) => {
          if(response.data.status === 'ERROR') {
            alert(response.data.message)
          } else {
            alert(response.data.message)
            this.form = {}
          }
        }).catch((error) => {
          alert(error)
        })
      },
      onSakitClicked(scope) {
        this.form.id_user = scope.row.user.id_user
        this.form.is_approved = 3
        axios.post(
          process.env.VUE_APP_BASE_API + '/attendance/absen/verify/' + this.form.is_approved,
          this.form,
          {headers: this.auth}
        ).then((response) => {
          if(response.data.status === 'ERROR') {
            alert(response.data.message)
          } else {
            alert(response.data.message)
            this.form = {}
          }
        }).catch((error) => {
          alert(error)
        })
      },
      onIzinClicked(scope) {
        this.form.id_user = scope.row.user.id_user
        this.form.is_approved = 4
        axios.post(
          process.env.VUE_APP_BASE_API + '/attendance/absen/verify/' + this.form.is_approved,
          this.form,
          {headers: this.auth}
        ).then((response) => {
          if(response.data.status === 'ERROR') {
            alert(response.data.message)
          } else {
            alert(response.data.message)
            this.form = {}
          }
        }).catch((error) => {
          alert(error)
        })
      },
      onAlphaClicked(scope) {
        this.form.id_user = scope.row.user.id_user
        this.form.is_approved = 5
        axios.post(
          process.env.VUE_APP_BASE_API + '/attendance/absen/verify/' + this.form.is_approved,
          this.form,
          {headers: this.auth}
        ).then((response) => {
          if(response.data.status === 'ERROR') {
            alert(response.data.message)
          } else {
            alert(response.data.message)
            this.form = {}
          }
        }).catch((error) => {
          alert(error)
        })
      }
    }
}
</script>