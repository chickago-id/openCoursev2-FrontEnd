<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Manage User List" />

<br>    
<el-row type="flex" class="row-bg" justify="end">
  <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
</el-row>
<br>    
    
    <!-- Form Tambah Data -->
    <el-dialog title="Tambah User" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="Fullname" :label-width="formLabelWidth">
          <el-input v-model="form.nama_lengkap" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item type="password" required label="Password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item type="password" placeholder="Re-enter password" required label="Password" :label-width="formLabelWidth">
          <el-input v-model="form.password2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addData">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- End of Form Tambah Data -->

    <!-- Tabel Data -->
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
      <el-table-column label="Nama Lengkap">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Username">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="Level Akses">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button @click="deleteData(scope.row.id, scope.$index)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table> 
    <!-- End of Tabel Data -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  filters: {
    
  },
  computed: {
    
  },
  data() {
    return {
      id_user: '',
      role:'',
      listLoading: true,
      materiSelect: '',
      form: {
        id: '',
        access_level: '',
      },
      successAlertVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '150px',
      listData: [],
      auth: ''
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
      axios.get(process.env.VUE_APP_BASE_API+'/userlist', {headers: this.auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    clearData() {
      this.form.id = ''
      this.form.access_level = ''
      this.dialogFormVisible = true
    },
    editData(scope){
      this.dialogFormVisible = true 
      this.form.id = scope.row.id
      this.form.access_level = scope.row.access_level
    },
    deleteData(id, index){
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          axios.delete(process.env.VUE_APP_BASE_API + '/userlist/' + id, { headers: this.auth })
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
        axios.put(process.env.VUE_APP_BASE_API + '/userlist/' + this.form.id,
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else { 
        axios.post(process.env.VUE_APP_BASE_API + '/userlist', 
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          });
      }
    },
  }
}
</script>
