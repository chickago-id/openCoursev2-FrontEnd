<!-- Author : supi.core@gmail.com | github.com/sup1core -->

<template>
  <div style="padding:30px;">

<el-row type="flex" class="row-bg" justify="end">
          <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
</el-row><br>

    <!-- Form Tambah Data -->
    <el-dialog title="Tambah Ruang" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="Nama Ruang" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item required label="Kapasitas" :label-width="formLabelWidth">
          <el-input type="number"  oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" maxlength="2" v-model="form.kapasitas" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="Keterangan" :label-width="formLabelWidth">
          <el-input type="text" v-model="form.keterangan" autocomplete="off"></el-input>
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
      <el-table-column label="Nama Ruang">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Kapasitas">
        <template slot-scope="scope">
          {{ scope.row.kapasitas }}
        </template>
      </el-table-column>
      <el-table-column label="Keterangan">
        <template slot-scope="scope">
          {{ scope.row.keterangan }}
        </template>
      </el-table-column>
      <el-table-column label="Created By">
        <template slot-scope="scope">
          {{ scope.row.created_by }}
        </template>
      </el-table-column>
      <el-table-column label="Created Date">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
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
        name: '',
        kapasitas:'',
        keterangan:'',
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
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/ruang')
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    clearData() {
      this.form.id = '',
      this.form.name = '',
      this.form.kapasitas='',
      this.form.keterangan='',
      this.form.created_by = 1,
      this.form.updated_by = 1,
      this.form.created_at = '',
      this.form.updated_at = '',
      this.dialogFormVisible = true
    },
    editData(scope){
      this.dialogFormVisible = true 
      this.form.id = scope.row.id;
      this.form.name = scope.row.name;
      this.form.kapasitas = scope.row.kapasitas;
      this.form.keterangan = scope.row.keterangan;
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
          axios.delete(process.env.VUE_APP_BASE_API + '/ruang/' + id, { headers: auth })
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
        axios.put(process.env.VUE_APP_BASE_API + '/ruang/' + this.form.id,
          this.form, { headers: auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else { 
        axios.post(process.env.VUE_APP_BASE_API + '/ruang', 
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
