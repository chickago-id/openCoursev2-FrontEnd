<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Bobot Kategori Penilaian" />

<br>    
<el-row type="flex" class="row-bg" justify="end">
  <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
</el-row>
<br>    
    
    <!-- Form Tambah Data -->
    <el-dialog title="Tambah Kategori Nilai" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="Nama Materi" :label-width="formLabelWidth">
          <el-select @change="cekBobotNilai($event)" v-model="form.id_materi" filterable placeholder="Pilih Materi">
            <el-option
              v-for="item in materiOption"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="Nama Kategori" :label-width="formLabelWidth">
          <el-select v-model="form.id_kategori_nilai" filterable placeholder="Pilih Kategori">
            <el-option
              v-for="item in kategoriOption"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="Bobot Nilai" :label-width="formLabelWidth">
          <el-input type="number" v-model="form.bobot_nilai" autocomplete="off"></el-input>
          Sisa bobot nilai = {{listDataByIdMateri | groupMateri }}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addData">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- End of Form Tambah Data -->

    <el-table
      v-loading="listLoading"
      :data="listData"
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
      <el-table-column label="Nama Materi">
        <template slot-scope="scope">
          {{ scope.row.materi.nama_materi }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Kategori">
        <template slot-scope="scope">
          {{ scope.row.kategori_nilai.nama_kategori }}
        </template>
      </el-table-column>
      <el-table-column label="Bobot Nilai">
        <template slot-scope="scope">
          {{ scope.row.bobot_nilai }} %
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button @click="deleteData(scope.row.id, scope.$index)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
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
      formLabelWidth: '150px',
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
      if(this.form.id != '') {
        axios.put(process.env.VUE_APP_BASE_API + '/kategori-nilai-materi/' + this.form.id,
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
            this.sisaBobotNilai = 100
          })
      } else { 
        axios.post(process.env.VUE_APP_BASE_API + '/kategori-nilai-materi', 
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
            this.sisaBobotNilai = 100
          });
      }
    },
    cekBobotNilai(event) {
      if (event != null) {
        this.getDataByIdMateri(event)
      }
    },
  }
}
</script>
