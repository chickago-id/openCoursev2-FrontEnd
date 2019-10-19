<!-- Author : supi.core@gmail.com | github.com/sup1core -->

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

    <!-- Form Tambah Data -->
    <el-dialog align="center" title="Tambah Jadwal" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item :label-width="formLabelWidth" label="Kelas">
          <el-input type="text" placeholder="Kelas" v-model="form.jam_mulai" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item required label="Nama Materi" :label-width="formLabelWidth">
          <el-select v-model="form.id_materi" filterable placeholder="Pilih Materi" style="display: inline">
            <el-option
              v-for="item in materiOption"
              :key="item.id"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="Pengajar">
          <el-input type="text" placeholder="Pengajar" v-model="form.id_materi" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="Ruang">
          <el-input type="text" placeholder="Ruang" v-model="form.id_materi" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item :label-width="formLabelWidth" label="Sesi">
          <el-input type="text" placeholder="Sesi" v-model="form.id_materi" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addData">Save</el-button>
      </span>
    </el-dialog>
    <!-- End of Form Tambah Data -->

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
      <el-table-column align="center" label="ID" width="55">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column label="Kode Kelas" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.kelas.masterKelas.kode_kelas }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="Kelas" width="155" align="center">
        <template slot-scope="scope">
          {{ scope.row.kelas.masterKelas.nama_kelas }}
        </template>
      </el-table-column>

      <el-table-column label="Materi" width="240" align="center">
        <template slot-scope="scope">
          {{ scope.row.materi.nama_materi }}
        </template>
      </el-table-column>

      <el-table-column label="Pengajar" width="125" align="center">
        <template slot-scope="scope">
          {{ scope.row.user.username }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="Ruang" width="150">
        <template slot-scope="scope">
          {{ scope.row.ruang.name }}
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="Hari" width="100">
        <template slot-scope="scope">
          {{scope.row.day.name}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="Jam" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.sesi.jam_mulai}} - {{ scope.row.sesi.jam_selesai | formatTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Action" width="180">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-view" circle></el-button>
          <el-button @click="editData(scope)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
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
      materiOption: [{'value': '', 'label': ''}],
      materiSelect: '',
      form: {
        id: '',
        id_ruang:{
          name:''
        },
        id_kelas:{
          kode_kelas:{
            kode_kelas:{
              nama_kelas:'',
              kode_kelas:''
            },
            jenis_kelas:''
          },
        },
        id_pengajar:{
          username:''
        },
        id_sesi:{
          jam_mulai:'',
          jam_selesai:''
        },
        id_materi:{
          nama_materi:''
        },
        id_hari:{
          name:'',
        },
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
    this.getUserInfo()
    this.getData()
  },
  
  mounted() {
    this.getData(),
    this.getMateri()
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
          this.listData.splice(index, 2)
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

    getMateri() {
      axios.get(process.env.VUE_APP_BASE_API+'/materi', {headers: this.auth})
      .then((response) => {
        response.data.data.forEach(item => {
          this.materiOption.push ( {
              value: item.id,
              label: item.nama_materi
            }
          )
        })
      })
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
          const filterVal = ['id', 'kode_kelas', 'kode_kelas', 'nama_kelas', 'username','kode_kelas']
          const listData = this.multipleSelection
          const data = this.formatJson(filterVal, listData)
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
