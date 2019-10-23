<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Parameter Kategori Penilaian" />

<br>    
<el-row type="flex" class="row-bg" justify="end">
          <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
</el-row>
<br>    
    
    <!-- Form Tambah Data -->
    <el-dialog title="Tambah Kategori Nilai" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="Nama Kategori" :label-width="formLabelWidth">
          <el-input v-model="form.nama_kategori" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addData">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- End of Form Tambah Data -->

    <!-- Tabel List Data -->
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
      <el-table-column label="Nama Kategori">
        <template slot-scope="scope">
          {{ scope.row.nama_kategori }}
        </template>
      </el-table-column>
      <el-table-column label="Created Date">
        <template slot-scope="scope">
          {{ scope.row.created_date }}
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button @click="deleteData(scope.row.id_kategori_nilai, scope.$index)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
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
      user_id: '',
      listLoading: true,
      listData: [],
      form: {
        id_kategori_nilai: '',
        nama_kategori: '',
        created_by: '',
        updated_by: 1,
        created_date: '',
        updated_date: '',
      },
      successAlertVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getUserInfo()
    this.getData()
  },
  mounted() {
    this.getData()
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
      } else {
        this.roles = ''
      }
    },
    getData() {
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/kategori-nilai', {headers: this.auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    clearData() {
      this.form.id_kategori_nilai = '',
      this.form.nama_kategori = '',
      this.form.created_by = '',
      this.form.updated_by = '',
      this.form.created_date = '',
      this.form.updated_date = '',
      this.dialogFormVisible = true
    },
    editData(scope){
      this.dialogFormVisible = true 
      this.form.id_kategori_nilai = scope.row.id_kategori_nilai;
      this.form.nama_kategori = scope.row.nama_kategori;
      this.form.updated_by = this.user_id;//scope.row.updated_by;
    },
    deleteData(id, index){
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          axios.delete(process.env.VUE_APP_BASE_API + '/kategori-nilai/' + id, { headers: this.auth })
          .then((res) =>{
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
      if(this.form.id_kategori_nilai != '') {
        this.form.updated_by = this.user_id
        axios.put(process.env.VUE_APP_BASE_API + '/kategori-nilai/' + this.form.id_kategori_nilai,
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else { 
        this.form.created_by = this.user_id
        this.form.updated_by = this.user_id
        axios.post(process.env.VUE_APP_BASE_API + '/kategori-nilai', 
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            console.log(data)
            this.dialogFormVisible = false
          });
      }
    },
  }
}
</script>
