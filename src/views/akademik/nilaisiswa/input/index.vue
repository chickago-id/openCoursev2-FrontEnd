<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Input Nilai Siswa" />
    <br> 
    <el-form :model="form">
      <el-form-item label="Pilih Kelas" :label-width="formLabelWidth">
        <el-select @change="showPeserta($event)" v-model="selectedKelas" placeholder="Select">
          <el-option
            v-for="item in kelasOption"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>   
      </el-form-item>
    </el-form>    
<!-- List Data -->
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
          {{ scope.row.kelas.kode_kelas }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Peserta">
        <template slot-scope="scope">
          {{ scope.row.user.nama_lengkap }}
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="inputNilai(scope.row)" size="mini" type="primary" icon="el-icon-edit" rounded>
            Input Nilai
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!-- End of List Data -->    

<!-- Form Input Data -->
    <el-dialog title="Input Kategori Nilai" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Pilih Materi" :label-width="formLabelWidth">
          <el-select @change="showKategoriNilaiMateri($event)" v-model="id_materi" placeholder="Select">
            <el-option
              v-for="item in materiOption"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>   
        </el-form-item>
        <el-form-item label="Pilih Kategori Nilai" :label-width="formLabelWidth">
          <el-select @change="showBobotNilai($event)" v-model="selectedKategoriNilai" placeholder="Select">
            <el-option
              v-for="item in kategoriNilaiMateriOption"
              :key="item.key"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>   
        </el-form-item>
        <el-form-item required label="Bobot Nilai" :label-width="formLabelWidth">
          <el-input disabled type="number" min="0" max="100" v-model="this.bobot_nilai" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="Nilai Input" :label-width="formLabelWidth">
          <el-input @change="getNilaiHitung" type="number" min="0" max="100" v-model="form.nilai_input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="Nilai Hitung" :label-width="formLabelWidth">
          <el-input disabled type="number" min="0" max="100" v-model="form.nilai_hitung" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addData">Confirm</el-button>
      </span>
    </el-dialog>
<!-- End of Form Input Data -->
    
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
    getNilaiHitung() {
      return this.form.nilai_hitung = this.bobot_nilai * this.form.nilai_input / 100 
    }
  },
  data() {
    return {
      selectedKategoriNilai: '',
      selectedKelas: '',
      msg: '',
      kelasOption: [{'key': '', 'value': '', 'label': ''}],
      materiOption: [{'key': '','value': '', 'label': ''}],
      kategoriNilaiMateriOption: [{'key': '','value': '', 'label': ''}],
      user_id: '',
      id_kelas: '',
      id_materi: '',
      id_kategori_nilai: '',
      id_kategori_nilai_materi: '',
      listLoading: false,
      listData: [],
      bobot_nilai: '',
      form: {
        id: '',
        id_kelas_peserta: '',
        id_kategori_nilai_materi: '',
        nilai_input: '',
        nilai_hitung: '',
        created_by: '',
        updated_by: '',
        created_date: '',
        updated_date: '',
      },
      auth: '',
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  created() {
    this.getUserInfo()
    this.getKelas()
    this.getMateri()
  },
  mounted() {
    //this.getData()
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
    getBobotNilai(){
      console.log('id materi :' + this.id_materi)
      console.log('id kategori nilai : ' + this.id_kategori_nilai)
      axios.get(process.env.VUE_APP_BASE_API+'/kategori-nilai-materi/materi/' + this.id_materi + '/kategori-nilai/' + this.id_kategori_nilai,  
      {headers: this.auth})
      .then((response) => {
        console.log(response.data.data[0])
        this.bobot_nilai = response.data.data[0]['bobot_nilai']
        this.form.id_kategori_nilai_materi = response.data.data[0]['id']
        })
    },
    getKategoriNilaiByIdMateri(id_materi) {
      this.kategoriNilaiMateriOption = []
      axios.get(process.env.VUE_APP_BASE_API+'/kategori-nilai-materi/materi/' + this.id_materi, 
      {headers: this.auth})
      .then((response) => {
        response.data.data.forEach(item => {
          this.kategoriNilaiMateriOption.push (
            {
              key: item.id,
              value: item,
              label: item.kategori_nilai.nama_kategori
            }
          )
        })
        })
    },
    addNotif() {
      const h = this.$createElement;
      this.$notify({
        title: 'Success',
        message: h('i', { style: 'color: teal' }, 'Data berhasil ditambah/diperbaharui'),
        type: 'success',
        showClose: false,
        duration: 2000
      });
    },
    getUserInfo() {
        if(localStorage.getItem('token') != null) {
          const token = 'Bearer '+localStorage.getItem('token')
          const auth = {
            'Authorization' : token,
            'Content-Type' : 'application/json'
          }
          this.auth = auth
          axios.get(process.env.VUE_APP_ROOT_API + '/profil', { headers: auth })
          .then(response =>{
            let userData = JSON.parse(response.data.data)
            console.log(userData)
            this.user_id = userData.user.id
            console.log(this.user_id)
          })
        }else{
          this.roles = ''
        }
      },
    getData() {
      const token = 'Bearer '+localStorage.getItem('token')
      const auth = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/nilai-siswa', {headers: auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    getKelas() {
      axios.get(process.env.VUE_APP_BASE_API+'/kelas', {headers: this.auth})
      .then((response) => {
        response.data.data.forEach(item => {
          this.kelasOption.push (
            {
              key: item.id,
              value: item,
              label: item.kode_kelas
            }
          )
        })
      })
    },
    getMateri() {
      axios.get(process.env.VUE_APP_BASE_API+'/materi', {headers: this.auth})
      .then((response) => {
        response.data.data.forEach(item => {
          this.materiOption.push (
            {
              value: item.id,
              label: item.nama_materi
            }
          )
        })
      })
    },
    clearData() {
      this.form.id = ''
      this.form.id_kategori_nilai_materi = ''
      this.form.id_kelas_peserta = ''
      this.form.nilai_input = ''
      this.form.nilai_hitung = ''
      this.form.nama_kategori = ''
      this.form.created_by = ''
      this.form.updated_by = ''
      this.form.created_date = ''
      this.form.updated_date = ''
      this.dialogFormVisible = true
    },
    editData(scope){
      this.dialogFormVisible = true 
      this.form.id_kategori_nilai = scope.row.id_kategori_nilai
      this.form.nama_kategori = scope.row.nama_kategori
      this.form.updated_by = 1;//scope.row.updated_by;
    },
    deleteData(id, index){
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          const token = 'Bearer '+localStorage.getItem('token')
          const auth = {
            'Authorization' : token,
            'Content-Type' : 'application/json'
          }
          axios.delete(process.env.VUE_APP_BASE_API + '/nilai-siswa/' + id, { headers: auth })
          .then((res) =>{
            this.listData.splice(index, 1)
          }, (error) => {
            this.msg = error
          }) 
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
      this.getData()
    }, 
    addData(){
      //console.log(this.form)
       if(this.form.id != '') {
        axios.put(process.env.VUE_APP_BASE_API + '/nilai-siswa/' + this.form.id,
          this.form, { headers: this.auth })
          .then((data) => {
            if(data.data.status === 'ERROR') {
              this.msg = data.data.message
              this.failedNotif()
            } else {
              this.addNotif()
              this.dialogFormVisible = false
            }
          })
      } else { 
        console.log('post')
        axios.post(process.env.VUE_APP_BASE_API + '/nilai-siswa', 
          this.form, { headers: this.auth })
          .then((data) => {
            console.log(data.data.status)
            if(data.data.status === 'ERROR') {
              this.msg = data.data.message
              this.failedNotif()
            } else {
              this.addNotif()
              this.dialogFormVisible = false
            }
          });
      } 
    },
    getPesertaByIdKelas(id) {
      this.listLoading = true
      axios.get(
        process.env.VUE_APP_BASE_API + 
        '/kelaspeserta/kelas/' + this.id_kelas, 
        {headers: this.auth}
      ).then((response) => {
        console.log(response)
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    showPeserta(event) {
      console.log(event)
      console.log(event.id)
      if (event == null) {
        this.listData = []
      } else {
        this.id_kelas = event.id
        this.getPesertaByIdKelas(event.id)
      }
      console.log(this.id_kelas)
    },
    showKategoriNilaiMateri(event) {
      if (event == null) {
        this.listKategoriNilai = []
      } else {
        this.id_materi = event
        this.getKategoriNilaiByIdMateri(event)
      }
      console.log(this.id_materi)
    },
    showBobotNilai(event) {
      this.id_kategori_nilai = event.id_kategori_nilai
      this.id_kategori_nilai_materi = event.id
      if (event === null) {
        this.listKategoriNilai = []
      } else {
        this.getBobotNilai()
      }
    },
    inputNilai(scope) {
      this.dialogFormVisible = true
      this.form.id_kelas_peserta = scope.id
    }
  }
}
</script>
