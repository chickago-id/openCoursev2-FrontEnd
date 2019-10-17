<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="List Institusi" />

<br>    
<el-row type="flex" class="row-bg" justify="end">
          <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
</el-row>
<br>    
    
    <!-- Form Tambah Data -->
    <el-dialog title="Tambah Data" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="Kode Institusi" :label-width="formLabelWidth">
          <el-input v-model="form.kode_institusi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="Nama Institusi" :label-width="formLabelWidth">
          <el-input v-model="form.nama_institusi" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="Alamat" :label-width="formLabelWidth">
          <el-input v-model="form.alamat" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="Email" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="No. Telepon" :label-width="formLabelWidth">
          <el-input v-model="form.no_telepon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="Website" :label-width="formLabelWidth">
          <el-input v-model="form.website" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="NPWP" :label-width="formLabelWidth">
          <el-input v-model="form.npwp" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="Negara" :label-width="formLabelWidth">
        <el-select filterable @change="showProvinsi($event)" v-model="negaraSelect" placeholder="Select">
          <el-option
            v-for="item in negaraOption"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>   
        </el-form-item>
        <el-form-item required label="Provinsi" :label-width="formLabelWidth">
          <el-select filterable @change="showKota($event)" v-model="provSelect" placeholder="Select">
          <el-option 
            v-for="item in provOption"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item required label="Kota" :label-width="formLabelWidth">
          <el-select filterable @change="setKota($event)" v-model="kotaSelect" placeholder="Select">
          <el-option
            v-for="item in kotaOption"
            :key="item.key"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item required label="Kode Pos" :label-width="formLabelWidth">
          <el-input v-model="form.kode_pos" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item required label="Logo" :label-width="formLabelWidth">
          <input type="file" @change="onFileChanged">
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onUpload">Confirm</el-button>
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
      <el-table-column label="Kode Institusi">
        <template slot-scope="scope">
          {{ scope.row.kode_institusi }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Institusi">
        <template slot-scope="scope">
          {{ scope.row.nama_institusi }}
        </template>
      </el-table-column>
      <el-table-column label="Email">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column label="No. Telepon">
        <template slot-scope="scope">
          {{ scope.row.no_telepon }}
        </template>
      </el-table-column>
      <el-table-column label="Alamat">
        <template slot-scope="scope">
          {{ scope.row.alamat }}
        </template>
      </el-table-column>
      <el-table-column label="Logo">
        <template slot-scope="scope">
          <img width="100px" :src="scope.row.download_path" alt="gambar" srcset="">
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
      negaraOption: [{'key': '', 'value': '', 'label': ''}],
      provOption: [{'key': '','value': '', 'label': ''}],
      kotaOption: [{'key': '', 'value': '', 'label': ''}],
      negaraSelect: '',
      nama_negara: '',
      provSelect: '',
      provId: '',
      kotaSelect: '',
      kotaId: '',
      nama_kota: '',
      user_id: '',
      auth: '',
      userData: null,
      listLoading: true,
      listData: [],
      form: {
        id: '',
        kode_institusi: '',
        nama_institusi: '',
        alamat: '',
        email: '',
        no_telepon: '',
        website: '',
        npwp: '',
        negara: '',
        provinsi: '',
        kota: '',
        kode_pos: '',
        logo: '',
      },
      successAlertVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      file: '',
      selectedFile: null
    }
  },
  created() {
    this.getUserInfo()
    this.getData()
    this.getNegara()
  },
  mounted() {
    this.getData()
    this.getUserInfo()
  },
  methods: {
    onFileChanged (event) {
      this.file = event.target.files[0]
      this.selectedFile = event.target.files[0]
      console.log(this.file)
      console.log(this.selectedFile)
    },
    addData(){
      if(this.form.id != '') {
        this.form.updated_by = this.user_id
        axios.put(process.env.VUE_APP_BASE_API + '/institute-profile/' + this.form.id,
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else { 
        this.form.created_by = this.user_id
        this.form.updated_by = this.user_id
        axios.post(process.env.VUE_APP_BASE_API + '/institute-profile', 
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            console.log(data)
            this.dialogFormVisible = false
        })
      }
    },
    onUpload() {
      if(this.form.id != '') {
        const formData = new FormData()
        formData.append('id', this.form.id)
        formData.append('file', this.selectedFile, this.selectedFile.name)
        formData.append('nama_institusi', this.form.nama_institusi)
        formData.append('alamat', this.form.alamat)
        formData.append('kode_institusi', this.form.kode_institusi)
        formData.append('email', this.form.email)
        formData.append('no_telepon', this.form.no_telepon)
        formData.append('website', this.form.website)
        formData.append('npwp', this.form.npwp)
        formData.append('negara', this.form.negaara)
        formData.append('provinsi', this.form.provinsi)
        formData.append('kota', this.form.kota)
        formData.append('kode_pos', this.kode_pos)
        formData.append('auth', this.auth)
        axios.put(process.env.VUE_APP_BASE_API + 
          '/institute-profile/' + this.form.id, 
          formData, {headers: this.auth}
        ).then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else {
        const formData = new FormData()
        formData.append('file', this.selectedFile, this.selectedFile.name)
        formData.append('nama_institusi', this.form.nama_institusi)
        formData.append('alamat', this.form.alamat)
        formData.append('kode_institusi', this.form.kode_institusi)
        formData.append('email', this.form.email)
        formData.append('no_telepon', this.form.no_telepon)
        formData.append('website', this.form.website)
        formData.append('npwp', this.form.npwp)
        formData.append('negara', this.form.negaara)
        formData.append('provinsi', this.form.provinsi)
        formData.append('kota', this.form.kota)
        formData.append('kode_pos', this.kode_pos)
        formData.append('auth', this.auth)
        axios.post(process.env.VUE_APP_BASE_API + 
          '/institute-profile', 
          formData, {headers: this.auth}
        ).then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
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
    getNegara() {
      axios.get('http://localhost:9528/countryList.json')
        .then((response) => {
            response.data.forEach(negara => {
                // let text = prov.name
                // let value = prov.id
                this.negaraOption.push({
                    key: negara.countryShortCode,
                    label: negara.countryName,
                    value: negara.countryName
                })
            })
        })
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
          this.userData = JSON.parse(response.data.data)
          console.log(this.userData + 'user data coy')
          this.user_id = this.userData.user.id
        })
      } else {
        this.roles = ''
      }
    },
    getData() {
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/institute-profile', {headers: this.auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    clearData() {
      this.form.id = ''
      this.form.kode_institusi = ''
      this.form.nama_institusi = ''
      this.form.alamat = ''
      this.form.email = ''
      this.form.no_telepon = ''
      this.form.website = ''
      this.form.npwp = ''
      this.form.negara = ''
      this.form.provinsi = ''
      this.form.kota = ''
      this.form.kode_pos = ''
      this.form.logo = ''
      this.dialogFormVisible = true
      this.negaraSelect = ''
      this.provSelect = ''
      this.kotaSelect = ''
    },
    editData(scope){
      this.dialogFormVisible = true 
      this.form.id = scope.row.id
      this.form.kode_institusi = scope.row.kode_institusi
      this.form.nama_institusi = scope.row.nama_institusi
      this.form.alamat = scope.row.alamat
      this.form.email = scope.row.email
      this.form.no_telepon = scope.row.no_telepon
      this.form.website = scope.row.website
      this.form.npwp = scope.row.npwp
      this.form.negara = scope.row.negara
      this.form.provinsi = scope.row.provinsi
      this.form.kota = scope.row.kota
      this.form.kode_pos = scope.row.kode_pos
      this.form.logo = scope.row.logo
      this.negaraSelect = scope.row.negara
      this.provSelect = scope.row.provinsi
      this.kotaSelect = scope.row.kota
    },
    showDetail(scope) {
    axios.get(scope.row.download_path, {headers: this.auth}).then((response) => {
        console.log(response)
        //response.data.forEach(kota => {
        //  if(kota.province_id == this.provId)
        //  {
        //    this.kotaOption.push({
        //      key: kota.id,
        //      label: kota.name,
        //      value: kota
        //    })
        //  }
        //})
      })
    },
    deleteData(id, index){
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          axios.delete(process.env.VUE_APP_BASE_API + '/institute-profile/' + id, { headers: this.auth })
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
      if(this.form.id != '') {
        this.form.updated_by = this.user_id
        axios.put(process.env.VUE_APP_BASE_API + '/institute-profile/' + this.form.id,
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            this.dialogFormVisible = false
          })
      } else { 
        this.form.created_by = this.user_id
        this.form.updated_by = this.user_id
        axios.post(process.env.VUE_APP_BASE_API + '/institute-profile', 
          this.form, { headers: this.auth })
          .then((data) => {
            this.getData()
            this.addNotif()
            console.log(data)
            this.dialogFormVisible = false
        })
      }
    },
    showProvinsi() {
      this.provOption = []
      this.kotaOption = []
      this.form.negara = this.negaraSelect
      axios.get('http://localhost:9528/provinsi.json').then((response) => {
            this.provOption.push({
              key:'',
              label: 'Silakan Pilih',
              value: ''
            })
            this.kotaOption.push({
                key:'',
                label: 'Silakan Pilih',
                value: ''
            })
            this.provSelect = ''
            this.kotaSelect = ''
            response.data.forEach(prov => {
              this.provOption.push({
                key: prov.id,
                label: prov.name,
                value: prov
              })
            })
          })
    },
    showKota() {
      this.kotaOption = []
      this.provId = this.provSelect.id
      this.form.provinsi = this.provSelect.name
      this.provSelect = this.provSelect.name
      axios.get('http://localhost:9528/kota.json').then((response) => {
        response.data.forEach(kota => {
          if(kota.province_id == this.provId)
          {
            this.kotaOption.push({
              key: kota.id,
              label: kota.name,
              value: kota
            })
          }
        })
      }) 
    },
    setKota() {
      this.kotaId = this.kotaSelect.id
      this.form.kota = this.kotaSelect.name
      this.kotaSelect = this.kotaSelect.name
      console.log(this.form.negara)
      console.log(this.form.provinsi)
      console.log(this.form.kota)
       
    }
  },
  submitUpload() {
    let formData = new FormData();
    formData.append('file', this.file);
    this.axios.post('http://localhost:9528/api.php',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    ).then(function(data){
      console.log(data.data);
    })
    .catch(function(){
      console.log('FAILURE!!');
    });
  }
}
</script>
