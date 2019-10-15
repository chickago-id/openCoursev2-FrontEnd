<template>
  <div class="app-container">
    <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" style="width:350px;" prefix-icon="el-icon-document" />
    <el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">
      Export Selected Items
    </el-button>
    <a href="#" target="_blank" style="margin-left:15px;">
      <el-tag type="info">Documentation</el-tag>
    </a>

    <el-row type="flex" class="row-bg" justify="end">
      <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
    </el-row> <br />

    <el-table
      ref="multipleTable"
      v-loading="listLoading"
      :data="listData"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" align="center" />
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Jadwal Pelajaran">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Kode Kelas" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.kode_kelas }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Kelas" width="115" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Pengajar" width="220">
        <template slot-scope="scope">
        {{ scope.row.id_ruang }}
         <!-- <strong v-for="ruang in jadwal.id_ruang" :key="ruang.id">{{ name }}</strong> -->
        </template>
      </el-table-column>
      <el-table-column align="center" label="Time" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Action" width="220">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-download" circle></el-button>
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button @click="deleteData(scope.row.id, scope.$index)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//import { fetchList } from '@/api/article'
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

  name: 'SelectExcel',
  data() {
    return {
      list: null,
      listLoading: true,
      multipleSelection: [],
      listData: [],
      downloadLoading: false,
      filename: '',
      form: {
        id: '',
        id_ruang:'',
        kode_kelas: '',
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
      axios.get(process.env.VUE_APP_BASE_API + '/jadwal', {headers: auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },

    clearData() {
      this.form.id = '',
      this.form.id_ruang='',
      this.form.created_by = 1,
      this.form.updated_by = 1,
      this.form.created_at = '',
      this.form.updated_at = '',
      this.dialogFormVisible = true
    },

    editData(scope){
      this.dialogFormVisible = true 
      this.form.id = scope.row.id;
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
          axios.delete(process.env.VUE_APP_BASE_API + '/jadwal/' + id, { headers: auth })
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
        axios.put(process.env.VUE_APP_BASE_API + '/jadwal/' + this.form.id,
          this.form, { headers: auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else {
        axios.post(process.env.VUE_APP_BASE_API + '/jadwal', 
          this.form, { headers: auth })
          .then((data) => {
            console.log(this.form.name);
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          });
      } 
    },
    // fetchData() {
    //   this.listLoading = true
    //   fetchList(this.listQuery).then(response => {
    //     this.list = response.data.items
    //     this.listLoading = false
    //   })
    // },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['No.', 'Jadwal Pelajaran', 'Kode Kelas', 'Kelas', 'Pengajar','Pengajar']
          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time','display_time']
          const list = this.multipleSelection
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          })
          this.$refs.multipleTable.clearSelection()
          this.downloadLoading = false
        })
      } else {
        this.$message({
          message: 'Please select at least one item',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>
