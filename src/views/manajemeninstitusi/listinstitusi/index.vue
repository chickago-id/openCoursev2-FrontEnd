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
          <el-upload
  action=""
  :auto-upload="false"
  >
  <el-button size="mini" type="primary">Add file</el-button>
</el-upload>

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
      formLabelWidth: '120px'
    }
  },
  created() {
    this.getUserInfo()
    this.getData()
    this.getNegara()
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
          let userData = JSON.parse(response.data.data)
          this.user_id = userData.user.id
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
          });
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
  }
}
</script>
