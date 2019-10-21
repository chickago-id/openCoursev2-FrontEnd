<!-- Author : supi.core@gmail.com | github.com/sup1core -->

<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="status" />
    <br>
    <el-row type="flex" class="row-bg" justify="end">
              <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
    </el-row>
    <br>    
    
    <!-- Form Tambah Data -->
    <el-dialog align="center" title="Tambah Data" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item required label="Nama Status" :label-width="formLabelWidth">
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
          {{ scope.row.created_by }}
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
<div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
  </div>
  
</template>


<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 15, 20]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'token',
      'username',
      'roles'
    ]),
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }

  },
  data() {
    return {
        user_id: '',
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
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
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
          this.user_id = userData.user.id
        })
      } else {
        this.roles = ''
      }
    },
    getData() {
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/status', {headers: this.auth})
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
  //    this.form.created_by=scope.row.created_by;
      this.form.updated_by =scope.row.updated_by;
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
          axios.delete(process.env.VUE_APP_BASE_API + '/status/' + id, { headers: auth })
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
      
      if(this.form.id != '') {
     //   this.form.updated_by = this.user_id
        axios.put(process.env.VUE_APP_BASE_API+'/status/'+this.form.id,
          this.form, { headers: auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else { 
      //  this.form.created_by = this.user_id
      //  this.form.updated_by = this.user_id
        axios.post(process.env.VUE_APP_BASE_API+'/status', 
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
</script

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>