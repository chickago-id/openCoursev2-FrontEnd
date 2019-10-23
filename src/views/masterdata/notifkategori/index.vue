<!-- Author : supi.core@gmail.com | github.com/sup1core -->

<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="notifcategory" />

<br>    
<el-row type="flex" class="row-bg" justify="end">
          <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
</el-row>
<br>    
    
    <!-- Form Tambah Data -->
    <el-dialog align="center" title="Tambah Data" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item required label="Nama Notif Kategori" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.name" autocomplete="off" placeholder="Ex: Notification"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addData">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- End of Form Tambah Data -->

    <!-- List Data Table -->
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
      <el-table-column label="Name">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Pembuat">
        <template slot-scope="scope">
          {{ scope.row.user.username }}
        </template>
      </el-table-column>
      <el-table-column label="Tanggal Buat">
        <template slot-scope="scope">
          {{ scope.row.created_at | formatDate}}
        </template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button @click="deleteData(scope.row.id, scope.$index)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- End of List Data Table -->

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
      list: null,
      listLoading: true,
      listData: [],
      form: {
        id: '',
        name: '',
        created_by:1,
        created_at: '',
        updated_by:1,
        updated_at:''
      },
      successAlertVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '150px'
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
      axios.get(process.env.VUE_APP_BASE_API + '/notifcategory', {headers: this.auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    clearData() {
      this.form.id= ''
      this.form.name= ''
      this.form.created_by = 1
      this.form.created_at = ''
      this.form.updated_by = 1
      this.form.updated_at =''
      this.dialogFormVisible = true
    },
    editData(scope){
      this.dialogFormVisible = true
      this.form.id= scope.row.id;
      this.form.name= scope.row.name;
      this.form.created_by=scope.row.created_by;
      this.form.updated_by = 1
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
          axios.delete(process.env.VUE_APP_BASE_API + '/notifcategory/' + id, { headers: auth })
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
      if(this.form.id != '') {
        axios.put(process.env.VUE_APP_BASE_API+'/notifcategory/'+this.form.id,
          this.form, { headers: auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else { 
        axios.post(process.env.VUE_APP_BASE_API+'/notifcategory', 
          this.form, { headers: auth })
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
