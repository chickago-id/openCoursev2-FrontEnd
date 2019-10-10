<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Bobot Kategori Penilaian" />

<br>    
<!-- <el-row type="flex" class="row-bg" justify="end">
  <el-button size="mini" type="primary"><router-link to="addpenilaian">Tambah</router-link></el-button>
</el-row> -->
<br>    
    
    <!-- Form Tambah Data -->
   <el-dialog title="Penilaian Pengajar" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- <el-form-item required label="Nama Pengajar" :label-width="formLabelWidth">
          <el-select @change="cekBobotNilai($event)" v-model="form.username_user" filterable placeholder="Pilih Materi">
            <el-option
              v-for="item in materiOption"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="Nama Siswa" :label-width="formLabelWidth">
          <el-select v-model="form.id_kategori_nilai" filterable placeholder="Pilih Kategori">
            <el-option
              v-for="item in kategoriOption"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>   -->
        <el-form-item required label="Penilaian Pengajar" :label-width="formLabelWidth">
          <div class="pading"> <el-rate
              v-model="value3"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Penguasaan Materi" :label-width="formLabelWidth">
        <div class="pading"> <el-rate
              v-model="value2"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Pemberian Tugas" :label-width="formLabelWidth">
          <div class="pading"> <el-rate
              v-model="value4"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Cara Penyampaian" :label-width="formLabelWidth">
           <div class="pading"> <el-rate
              v-model="value4"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Kejelasan Dalam Membimbing" :label-width="formLabelWidth">
           <div class="pading"> <el-rate
              v-model="value5"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Cara Mengelola Siswa" :label-width="formLabelWidth">
          <div class="pading"> <el-rate
              v-model="value5"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Kesiapan dan Kesabaran Mengajar" :label-width="formLabelWidth">
           <div class="pading"> <el-rate
              v-model="value3"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Kesungguhan dalam Mengajar" :label-width="formLabelWidth">
          <div class="pading"> <el-rate
              v-model="value1"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Keseriusan dalam motivasi" :label-width="formLabelWidth">
           <div class="pading"> <el-rate
              v-model="value4"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Kesopanan dalam mengajar" :label-width="formLabelWidth">
           <div class="pading"> <el-rate
              v-model="value3"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Merespon Tanya Jawab/ Konsultasi" :label-width="formLabelWidth">
           <div class="pading"> <el-rate
              v-model="value5"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Intermezo/ Selingan Humor" :label-width="formLabelWidth">
           <div class="pading"> <el-rate
              v-model="value5"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Ketepatan Waktu Pelatihan" :label-width="formLabelWidth">
           <div class="pading"> <el-rate
              v-model="value5"
              disabled>
              </el-rate></div>
        </el-form-item>
        <el-form-item required label="Penampilan dan Kerapihan" :label-width="formLabelWidth">
           <div class="pading"> <el-rate
              v-model="value4"
              disabled>
              </el-rate></div>
        </el-form-item>      
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addData">Next</el-button>
      </span>
    </el-dialog>
    <!-- End of Form Tambah Data -->
      <el-dialog title="Penilaian Lembaga" :visible.sync="dialogFormVisible2">
      <el-form :model="form">
      <el-form-item required label="Pelayanan Customer Service" :label-width="formLabelWidth">
          <div class="pading"><rate/></div>
        </el-form-item>
        <el-form-item required label="Kebersihan & Kerapihan Lembaga" :label-width="formLabelWidth">
          <div class="pading"><rate/></div>
        </el-form-item>
        <el-form-item required label="Fasilitas Pendukung" :label-width="formLabelWidth">
          <div class="pading"><rate/></div>
        </el-form-item>
        <el-form-item required label="Modul/ Bahan Ajar" :label-width="formLabelWidth">
          <div class="pading"><rate/></div>
        </el-form-item>
        Apakah Anda bersedia menyarankan ke teman Anda untuk kursus di ALFABANK?
        <el-radio-group v-model="radio">
      <el-radio :label="3">Ya</el-radio>
      <el-radio :label="6">Tidak</el-radio>
      </el-radio-group>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible2 = false">Cancel</el-button> -->
        <el-button type="primary" @click="addData">Close</el-button>
      </span>
    </el-dialog>


  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="No" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column  prop="nama" label="Nama Pengajar">
        <!-- <template slot-scope="scope">
          {{ scope.row.user.username }}
        </template> -->
        
      </el-table-column>
            <el-table-column prop="kelas" label="Kelas">
        <!-- <template slot-scope="scope">
          {{ scope.row.user.username }}
        </template>-->
      </el-table-column> 
      <el-table-column prop="period" label="Period">
        <!-- <template slot-scope="scope">
          {{ scope.row.kategori_nilai.nama_kategori }}
        </template> -->
      </el-table-column>
      <el-table-column prop="user" label="User">
        <!-- <template slot-scope="scope">
          {{ scope.row.bobot_nilai }} %
        </template>-->
      </el-table-column>
      <el-table-column prop="value" label="Total Skor" >
<!-- <el-rate
  v-model="value"
  disabled
  show-score
  text-color="#ff9900"
  score-template="{value}">
</el-rate> -->
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
        </template>
      </el-table-column>
    </el-table> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import rate from '@/components/rate/index'

export default {
  components: {
    rate,
  },
  filters: {
    groupMateri: function (value) {
      if (!value) return ''
      let sumBobotNilai = 0
      for (let index = 0; index < value.length; index++) {
        sumBobotNilai += value[index]['bobot_nilai'];
        
      }
      return 100 - sumBobotNilai
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'username',
      'roles'
    ])
  },
  data() {
    

    return {
      tableData: [{
          nama: 'Supi Core',
          kelas: 'Design grafis',
          period: 'Agustus',
          user: 'Tom',
          value:'4.2',
        },{
          nama: 'Supi Core Dua',
          kelas: 'Design grafis',
          period: 'Agustus',
          user: 'Cinta',
          value:'4',
        },],      
        value1:'1',  
        value2:'2', 
        value3:'3',  
        value4:'4',
        value5:'5',
        
        
      auth: '',
      id_user: '',
      listLoading: true,
      materiOption: [{'value': '', 'label': ''}],
      materiSelect: '',
      kategoriOption: [{'value': '', 'label': ''}],
      form: {
        id: '',
        id_materi: '',
        id_kategori_nilai: '',
        bobot_nilai: ''
      },
      successAlertVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: '280px',
      listData: [],
      listDataByIdMateri: [],
      sisaBobotNilai: 100
    }
  },
  created() {
    this.getUserInfo()
    this.getData()
  },
  mounted() {
    this.getData()
    this.getMateri()
    this.getKategori()
  },
  methods: {
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
            this.user_id = userData.user.id
          })
        }else{
          this.roles = ''
        }
      },
    getMateri() {
      axios.get(process.env.VUE_APP_BASE_API+'/user', {headers: this.auth})
      .then((response) => {
        response.data.data.forEach(item => {
          this.materiOption.push (
            {
              value: item.id,
              label: item.username
            }
          )
        })
      })
    },
    getKategori() {
      axios.get(process.env.VUE_APP_BASE_API+'/kategori-nilai', {headers: this.auth})
      .then((response) => {
        response.data.data.forEach(item => {
          this.kategoriOption.push (
            {
              value: item.id_kategori_nilai,
              label: item.nama_kategori
            }
          )
        })
      })
    },
    getDataByIdMateri(id) {
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/kategori-nilai-materi/materi/' + id, {headers: this.auth})
      .then((response) => {
        this.listDataByIdMateri = response.data.data;
        this.listLoading = false
      })
    },
    getData() {
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API+'/kategori-nilai-materi', {headers: this.auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    clearData() {
      this.form.id_kategori_nilai = ''
      this.form.id_materi = ''
      this.form.id_kategori_nilai = ''
      this.form.bobot_nilai = ''
      this.dialogFormVisible = true
    },
    goTo() {
      this.form.id_kategori_nilai = ''
      this.form.id_materi = ''
      this.form.id_kategori_nilai = ''
      this.form.bobot_nilai = ''
      this.dialogFormVisible = true
    },
    editData(scope){
      this.dialogFormVisible = true 
      this.form.id = scope.row.id
      this.form.id_materi = scope.row.materi.id
      this.form.id_kategori_nilai = scope.row.kategori_nilai.id_kategori_nilai
      this.form.bobot_nilai = scope.row.bobot_nilai
    },
    deleteData(id, index){
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          axios.delete(process.env.VUE_APP_BASE_API + '/kategori-nilai-materi/' + id, { headers: this.auth })
          .then((res) =>{
          console.log(res)
          this.listData.splice(index, 1)
          }, (error) => {
            console.log(error)
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
      this.dialogFormVisible = false
      this.dialogFormVisible2 = true
      // if(this.form.id != '') {
      //   axios.put(process.env.VUE_APP_BASE_API + '/kategori-nilai-materi/' + this.form.id,
      //     this.form, { headers: this.auth })
      //     .then((data) => {
      //       this.getData()
      //       this.addNotif()
      //       this.dialogFormVisible = false
      //       this.sisaBobotNilai = 100
      //     })
      // } else { 
      //   axios.post(process.env.VUE_APP_BASE_API + '/kategori-nilai-materi', 
      //     this.form, { headers: this.auth })
      //     .then((data) => {
      //       this.getData()
      //       this.addNotif()
      //       this.dialogFormVisible = false
      //       this.sisaBobotNilai = 100
      //     });
      // }
    },
    cekBobotNilai(event) {
      if (event != null) {
        this.getDataByIdMateri(event)
      }
    },
  }
}
</script>
<style scoped>
.pading{
  padding: 11px;
}
</style>
