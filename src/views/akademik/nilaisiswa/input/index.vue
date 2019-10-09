<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Input Nilai Siswa" />
    <br> 
    <el-form :model="form">
      <el-form-item label="Pilih Kelas" :label-width="formLabelWidth">
        <el-select @change="showPeserta($event)" v-model="id_kelas" placeholder="Select">
          <el-option
            v-for="item in kelasOption"
            :key="item.value"
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
          {{ scope.row.kelasPeserta.kelas.kode_kelas }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Peserta">
        <template slot-scope="scope">
          {{ scope.row.kelasPeserta.user.nama_lengkap }}
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
        <el-form-item required label="Nilai Input" :label-width="formLabelWidth">
          <el-input type="number" min="0" max="100" v-model="form.nilai_input" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="Nilai Hitung" :label-width="formLabelWidth">
          <el-input type="number" min="0" max="100" v-model="form.nilai_hitung" autocomplete="off"></el-input>
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

  },
  data() {
    return {
      kelasOption: [{'value': '', 'label': ''}],
      id_kelas: '',
      listLoading: false,
      listData: [],
      form: {
        id: '',
        id_kelas_peserta: '',
        id_kategori_nilai_materi: '',
        nilai_input: '',
        nilai_hitung: '',
        created_by: 1,//''
        updated_by: 1,//'',
        created_date: '',
        updated_date: '',
      },
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  created() {
    this.getKelas()
  },
  mounted() {
    //this.getData()
  },
  methods: {
    getKategoriNilaiByIdMateri() {

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
        const token = 'Bearer '+localStorage.getItem('token')
          const auth = {
            'Authorization' : token,
            'Content-Type' : 'application/json'
          }
      axios.get(process.env.VUE_APP_BASE_API+'/kelas', {headers: auth})
      .then((response) => {
        response.data.data.forEach(item => {
          this.kelasOption.push (
            {
              value: item.id,
              label: item.kode_kelas
            }
          )
        })
      })
    },
    clearData() {
      this.form.id_kategori_nilai = '',
      this.form.nama_kategori = '',
      this.form.created_by = 1,
      this.form.updated_by = 1,
      this.form.created_date = '',
      this.form.updated_date = '',
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
          console.log(id)
          axios.delete(process.env.VUE_APP_BASE_API + '/nilai-siswa/' + id, { headers: auth })
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
      const token = 'Bearer '+localStorage.getItem('token')
      const auth = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      console.log(token)      
      if(this.form.id_kategori_nilai != '') {
        axios.put(process.env.VUE_APP_BASE_API + '/nilai-siswa/' + this.form.id_kategori_nilai,
          this.form, { headers: auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else { 
        axios.post(process.env.VUE_APP_BASE_API + '/nilai-siswa', 
          this.form, { headers: auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          });
      }
    },
    getPesertaByIdKelas(id) {
      const token = 'Bearer '+localStorage.getItem('token')
      const auth = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      this.listLoading = true
      axios.get(
        process.env.VUE_APP_BASE_API + 
        '/nilai-siswa/kelas/' + id, 
        {headers: auth}
      ).then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    showPeserta(event) {
      if (event == '' || event == null) {
        this.listData = []
      } else {
        this.getPesertaByIdKelas(event)
      }
    },
    inputNilai(scope) {
      this.dialogFormVisible = true
      this.form.id_kelas_peserta = scope.id
    }
  }
}
</script>
