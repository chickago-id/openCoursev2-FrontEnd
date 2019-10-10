<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="List Presensi Pengajar" />

<br>    
<el-row type="flex" class="row-bg" >
<el-form>
    <el-form-item label="Pilih Range Tanggal">
    <el-date-picker style="width: 70%"
      v-model="value2"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      :picker-options="pickerOptions">
    </el-date-picker>
    </el-form-item>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="Kelas">
        <el-select @change="getMateri" v-model="kelasSelect" placeholder="Pilih">
            <el-option
                v-for="item in kelasOption"
                :key="item.id"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="Materi">
        <el-select @change="setMateri" v-model="materiSelect" placeholder="Pilih">
            <el-option
                v-for="item in materiOption"
                :key="item.id"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="onSubmit">Filter</el-button>
    </el-form-item>
    </el-form>
</el-form>
</el-row>
    
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
      <el-table-column label="Kelas">
        <template slot-scope="scope">
          {{ scope.row.jadwal.kelas.nama_kelas }}
        </template>
      </el-table-column>
      <el-table-column label="Materi">
        <template slot-scope="scope">
          {{ scope.row.jadwal.materi.nama_materi }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Pengajar">
        <template slot-scope="scope">
          {{ scope.row.user.nama }}
        </template>
      </el-table-column>
      <el-table-column label="Jam Presensi">
        <template slot-scope="scope">
          {{ scope.row.jam_absen }}
        </template>
      </el-table-column>
      <el-table-column label="Tanggal">
        <template slot-scope="scope">
          {{ scope.row.tanggal }}
        </template>
      </el-table-column>
    </el-table>
    <!-- End of Tabel List Data -->
    <el-row type="flex" justify="end">
        <br>
        <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
        </div>
        <br>
    </el-row>
    
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
        formInline: {
            region: ''
        },
        auth: '',
        user_id: '',
        listLoading: true,
        listData: [],
        kelasOption: [{'key': '','label': '', 'value': ''}],
        kelasSelect: '',
        materiOption: [{'key': '','label': '', 'value': ''}],
        materiSelect: '',
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
        formLabelWidth: '120px',
        pickerOptions: {
            shortcuts: [{
            text: 'Last week',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
            }
            }, {
            text: 'Last month',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
            }
            }, {
            text: 'Last 3 months',
            onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
            }
            }]
        },
        value1: '',
        value2: ''
    }
  },
  created() {
    this.getUserInfo()
    this.getData()
    this.getKelas()
  },
  mounted() {
    this.getData()
  },
  methods: {
    onSubmit() {
        console.log('submit!');
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
      //axios.get(process.env.VUE_APP_BASE_API + '/kategori-nilai', {headers: this.auth})
      axios.get('http://localhost:9528/fakePresensiPengajar.json')
      .then((response) => {
        this.listData = response.data;
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
    getKelas() {
        axios.get(process.env.VUE_APP_BASE_API+'/kelas', {headers: this.auth})
      .then((response) => {
        response.data.data.forEach(item => {
          this.kelasOption.push (
            {
                key: item.id,
                label: item.masterKelas.nama_kelas,
                value: item,
            }
          )
        })
        //this.id_materi = item.id
      })
    },
    getMateri() {
        axios.get(process.env.VUE_APP_BASE_API+'/materi', {headers: this.auth})
      .then((response) => {
          console.log(response.data.data)
        response.data.data.forEach(item => {
          this.materiOption.push (
            {
                key: item.id,
                label: item.nama_materi,
                value: item,
            }
          )
        })
      })
    },
    setMateri() {
        console.log(this.kelasSelect)
        console.log(this.materiSelect)
    }
  }
}
</script>
