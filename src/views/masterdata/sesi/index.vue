<!-- Author : supi.core@gmail.com | github.com/sup1core -->

<template>
  <div style="padding:30px;">
    <el-row type="flex" class="row-bg" justify="end">
      <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
    </el-row><br>

    <!-- Form Tambah Data -->
    <el-dialog title="Tambah Sesi" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item :label-width="formLabelWidth" label="Jam Mulai">
          <el-time-picker placeholder="Jam Mulai" v-model="form.jam_mulai" style="width: 100%;"></el-time-picker>
        </el-form-item>
        
        <el-form-item :label-width="formLabelWidth" label="Jam Selesai">
          <el-time-picker placeholder="Jam Selesai" v-model="form.jam_selesai" style="width: 100%;"></el-time-picker>
        </el-form-item>
<!-- 
        <el-form-item required label="" :label-width="formLabelWidth">
          <el-time-picker placeholder="Jam Selesai" v-model="form.jam_selesai" style="width: 100%;"></el-time-picker>
          <el-input type="time" v-model="form.jam_selesai" autocomplete="off"></el-input>
        </el-form-item> -->
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
      <el-table-column label="Jam Mulai">
        <template slot-scope="scope">
          {{ scope.row.jam_mulai | formatTime}}
        </template>
      </el-table-column>
      <el-table-column label="Jam Selesai">
        <template slot-scope="scope">
          {{ scope.row.jam_selesai | formatTime}}
        </template>
      </el-table-column>
      <el-table-column label="Setting">
        <template slot-scope="scope">
          {{ scope.row.setting }}
        </template>
      </el-table-column>
      <el-table-column label="Created At">
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
      listLoading: true,
      listData: [],
      form: {
        id: '',
        jam_mulai: '',
        jam_selesai:'',
        setting: '',
        created_by: 1,
        updated_by: 1,
        created_at: '',
        updated_at: '',
      },
      successAlertVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  created() {
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
    getData() {
      const token = 'Bearer '+localStorage.getItem('token')
      const auth = {
        'Authorization' : token,
        'Content-Type' : 'application/json'
      }
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/sesi', {headers: auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    clearData() {
      this.form.id = '',
      this.form.jam_mulai = '',
      this.form.jam_selesai='',
      this.form.setting='',
      this.form.created_by = 1,
      this.form.updated_by = 1,
      this.form.created_at = '',
      this.form.updated_at = '',
      this.dialogFormVisible = true
    },
    editData(scope){
      this.dialogFormVisible = true 
      this.form.id = scope.row.id;
      this.form.jam_mulai = scope.row.jam_mulai;
      this.form.jam_selesai = scope.row.jam_selesai;
      this.form.setting = scope.row.setting;
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
          axios.delete(process.env.VUE_APP_BASE_API + '/sesi/' + id, { headers: auth })
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
        axios.put(process.env.VUE_APP_BASE_API + '/sesi/' + this.form.id,
          this.form, { headers: auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else {
        axios.post(process.env.VUE_APP_BASE_API + '/sesi', 
          this.form, { headers: auth })
          .then((data) => {
            console.log(this.form.jam_mulai);
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          });
      } 
    },
  }
}
</script>
