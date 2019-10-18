<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Buat Kode Presensi" />

<br>    
<el-row type="flex" class="row-bg" >
<!-- Form Select Kelas -->
    <el-form :inline="true" :model="form">
      <el-form-item label="Pilih Kelas" :label-width="formLabelWidth">
        <el-select @change="onKelasSelected($event)" v-model="form.id_kelas" placeholder="Select">
          <el-option
            v-for="item in kelasOption"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>   
      </el-form-item>
      <el-form-item>
          <el-button @click="onBuatCodeClicked" type="primary">Buat code</el-button>
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
            <h3>{{tokenKelas}}</h3>
        </div>
        </el-card>
    </el-col>
    </el-row>
<!-- End of QR Code Card -->
<br>
    <!-- Tabel List Data -->
    <el-button size="small">Refresh Data</el-button>
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
          {{ scope.row.jadwal.kode_kelas }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Pengajar">
        <template slot-scope="scope">
          {{ scope.row.user.nama }}
        </template>
      </el-table-column>
      <el-table-column label="Jam Presensi">
        <template slot-scope="scope">
          {{ scope.row.jam_absen }}
        </template>
      </el-table-column>
      <el-table-column label="Tanggal">
        <template slot-scope="scope">
          {{ scope.row.tanggal }}
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
            'token',
            'username',
            'roles'
        ])
    },
    data() {
        return {
            auth: '',
            user_id: '',
            kelasOption: [{'key': '', 'value': '', 'label': ''}],
            form: {
              id_kelas: ''
            },
            tokenKelas: '',
            listData: [],
            listLoading: false,
            formLabelWidth: '120px',
            form: {}
        }
    },
    created() {
      this.getUserInfo()
    },
    mounted() {
      this.getDataKelas()
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
                    console.log(localStorage.getItem('token'))
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
                response.data.data.forEach(item => {
                this.kelasOption.push (
                    {
                    value: item.id_kelas,
                    label: item.kelas.kode_kelas
                    }
                )
                })
            })
        },
        onKelasSelected(event) {
            console.log(this.id_kelas)
            
        },
        onBuatCodeClicked() {
            axios.post(process.env.VUE_APP_BASE_API + '/attendance-token', this.form, {headers:this.auth})
            .then((response) => {
                this.tokenKelas = response.data.data[0]['token']
                console.log(this.auth)
            })
        }
    }
}
</script>