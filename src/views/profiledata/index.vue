
<template>
  <div>
    <el-card class="card" style="display: absolute; margin: 20px;">
      <form-wizard shape="shape" color="#20a0ff" title="asd" error-color="#ff4949" style="padding: 20px;" @on-complete="onComplete">
        <h2 slot="title">Lengkapi Data Diri</h2>
        <!-- <h3 slot="subtitle">profile user data</h3>   -->
        <tab-content title="Personal details" icon="el-icon-user-solid" :before-change="validateFirstStep">
          <el-row style="width: 100%;  float: right;">
            <el-col :xs="0">
            &nbsp;
            </el-col>
            <el-col :xs="24">
              <div style="padding: 30px;">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" labteel-width="120px" class="demo-ruleForm">
                  <el-form-item label="Nama Lengkap" prop="nama_lengkap">
                    <el-input v-model="ruleForm.nama_lengkap" placeholder="ex: ipang lazuardi" />
                  </el-form-item>
                  <el-form-item label="Tempat Lahir" prop="tempat_lahir">
                    <el-input v-model="ruleForm.tempat_lahir" placeholder="ex: yogyakarta" />
                  </el-form-item>
                  <el-form-item label="Tanggal Lahir" required>
                    <el-form-item prop="tanggal_lahir">
                      <el-date-picker
                        v-model="ruleForm.tanggal_lahir"
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%;"
                      />
                    </el-form-item>
                  </el-form-item>
                  <el-form-item label="Jenis Kelamin" prop="jenis_kelamin">
                    <el-radio-group v-model="ruleForm.jenis_kelamin" style="width: 100%;">
                      <el-radio label="Laki-Laki" />
                      <el-radio label="Perempuan" />
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="no telp" prop="telepon">
                    <el-input v-model="ruleForm.telepon" type="number" />
                  </el-form-item>
                  <el-form-item label="Agama" prop="agama">
                    <el-select v-model="ruleForm.agama" placeholder="pilih agama" style="width: 100%;">
                      <el-option label="Islam" value="islam" />
                      <el-option label="Kristen" value="Kristen" />
                      <el-option label="Protestan" value="Protestan" />
                      <el-option label="Budha" value="Budha" />
                      <el-option label="Hindu" value="hindu" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Status saat ini" prop="status_saat_ini">
                    <el-select v-model="ruleForm.status_saat_ini" placeholder="pilh status" style="width: 100%;">
                      <el-option label="Masih Sekolah/Kuliah" value="Masih Sekolah/Kuliah" />
                      <el-option label="Lulus kuliah" value="Lulus kuliah" />
                      <el-option label="Kerja" value="Kerja" />
                    </el-select>
                  </el-form-item>

                  <el-form-item label="Alamat" prop="alamat">
                    <el-input v-model="ruleForm.alamat" type="textarea" placeholder="ex: glagahsari 46c" />
                  </el-form-item>
                  <el-form-item label="pekerjaan" prop="pekerjaan">
                    <el-input v-model="ruleForm.pekerjaan" placeholder="ex: wiraswasta" />
                  </el-form-item>
                </el-form>
              </div>

            </el-col>
            <el-col :xs="0">
            &nbsp;
            </el-col>
          </el-row>

        </tab-content>
        <tab-content title="Additional Info" icon="el-icon-document-add" :before-change="validateTwoStep">
          <el-form ref="addForm" :model="ruleForm" :rules="rulas" labteel-width="120px" class="demo-ruleForm">
            <el-form-item label="nama orang tua" prop="nama_orangtua">
              <el-input v-model="ruleForm.nama_orangtua" />
            </el-form-item>
            <el-form-item label="no telp ortu" prop="telepon_orangtua">
              <el-input v-model="ruleForm.telepon_orangtua" type="number" />
            </el-form-item>
            <el-form-item label="asal sekolah atau kampus" prop="asal_sekolah_kampus">
              <el-input v-model="ruleForm.asal_sekolah_kampus" />
            </el-form-item>
            <el-form-item label="kodepos" prop="kode_pos">
              <el-input v-model="ruleForm.kode_pos" type="number" />
            </el-form-item>
            <el-form-item label="akun instagram" prop="akun_ig">
              <el-input v-model="ruleForm.akun_ig" />
            </el-form-item>
            <el-form-item label="Informasi Dari?" prop="informasi_dari">
              <el-select v-model="ruleForm.informasi_dari" placeholder="pilih informasi " style="width: 100%;">
                <el-option label="Instagram" value="Instagram" />
                <el-option label="Facebook" value="Kristen" />
                <el-option label="Whatsapp" value="Whatsapp" />
                <el-option label="Teman" value="Teman" />
                <el-option label="Teman dari teman" value="Teman dari teman" />
              </el-select>
            </el-form-item>
          </el-form>
        </tab-content>
        <tab-content title="Last step" icon="el-icon-document-checked">
          <h2 style="text-align: center;">apa sudah yakin?</h2>
        </tab-content>

        <el-button slot="prev" type="primary">Back</el-button>
        <el-button slot="next" type="primary">Next</el-button>
        <el-button slot="finish" type="primary">Finish</el-button>
      </form-wizard>

    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import {
  FormWizard,
  TabContent
} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
// Vue.use(VueFormWizard)
export default {
  components: {
    FormWizard,
    TabContent
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input the age'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'))
        } else {
          if (value < 18) {
            callback(new Error('Age must be greater than 18'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {

      id_user: '',
      email: '',
      listData: [],
      ruleForm: {
        id: '',
        nama_lengkap: '',
        tempat_lahir: '',
        tanggal_lahir: '',
        jenis_kelamin: '',
        telepon: '',
        agama: '',
        status_saat_ini: '',
        delivery: false,
        type: [],
        alamat: '',
        pekerjaan: '',
        nama_orangtua: '',
        telepon_orangtua: '',
        asal_sekolah_kampus: '',
        kode_pos: '',
        informasi_dari: '',
        akun_ig: ''
      },
      rules: {
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        nama_lengkap: [{
          required: true,
          message: 'Please input nama lengkap',
          trigger: 'change'
        }],
        tempat_lahir: [{
          required: true,
          message: 'Please input Tempat Lahir',
          trigger: 'blur'
        },
        {
          required: true,
          message: 'Length should be 3 to 5',
          trigger: 'blur'
        }
        ],
        agama: [{
          required: true,
          message: 'Please select agama',
          trigger: 'change'
        }],
        status_saat_ini: [{
          required: true,
          message: 'Please select Status',
          trigger: 'change'
        }],
        tanggal_lahir: [{
          type: 'date',
          required: true,
          message: 'Please pick a date birth',
          trigger: 'change'
        }],
        date2: [{
          type: 'date',
          required: true,
          message: 'Please pick a time',
          trigger: 'change'
        }],
        type: [{
          type: 'array',
          required: true,
          message: 'Please select at least one activity type',
          trigger: 'change'
        }],
        jenis_kelamin: [{
          required: true,
          message: 'Please select gender',
          trigger: 'change'
        }],
        telepon: [{
          required: true,
          message: 'Please input alamat',
          trigger: 'blur'
        }],
        alamat: [{
          required: true,
          message: 'Please input alamat',
          trigger: 'blur'
        }],
        pekerjaan: [{
          required: true,
          message: 'Please input pekerjaan',
          trigger: 'blur'
        }]
      },
      rulas: {
        nama_orangtua: [{
          required: true,
          message: 'Please input nama ortu',
          trigger: 'blur'
        }],
        telepon_orangtua: [{
          required: true,
          message: 'Please input no telp ortu',
          trigger: 'blur'
        }],
        asal_sekolah_kampus: [{
          required: true,
          message: 'Please input asal sekolah atau kampus',
          trigger: 'blur'
        }],
        informasi_dari: [{
          required: true,
          message: 'Please input akun instagram',
          trigger: 'blur'
        }],
        akun_ig: [{
          required: true,
          message: 'Please input akun instagram',
          trigger: 'blur'
        }],
        kode_pos: [{
          required: true,
          message: 'Please input kodepos  ',
          trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    onComplete: function() {
      // alert('Yay. Done!')
      // getData();
      this.addData()
    },
    validateFirstStep() {
      return new Promise((resolve, reject) => {
        this.$refs.ruleForm.validate((valid) => {
          resolve(valid)
        })
      })
    },
    validateTwoStep() {
      return new Promise((resolve, reject) => {
        this.$refs.addForm.validate((valid) => {
          resolve(valid)
        })
      })
    },

    getData() {
      const token = 'Bearer ' + localStorage.getItem('token')
      const auth = {
        Authorization: token,
        'Content-Type': 'application/json'
      }
      // this.listLoading = true;
      axios.get('http://localhost:8081/profil', { headers: auth }).then(response => {
        this.listData = response.data.data
        console.log(response.data.data)
        this.listLoading = false
        this.ruleForm.nama_lengkap = response.data.data[0].nama_lengkap
        this.ruleForm.id = response.data.data[0].id
        this.ruleForm.id_user = response.data.data[0].id_user
        this.ruleForm.email = response.data.data[0].email;
      })
    },
    addData() {
      const token = 'Bearer ' + localStorage.getItem('token')
      const auth = {
        Authorization: token,
        'Content-Type': 'application/json'
      }
      console.log(token)
      if (this.ruleForm.id !== '') {
        axios
          .post(
            process.env.VUE_APP_BASE_API + '/profil/',
            this.ruleForm,
            { headers: auth }
          )
          .then(data => {
            this.successNotif()
            // alert('Yay. Done!')

            this.ruleForm.nama_lengkap = ''
            this.ruleForm.tempat_lahir = ''
            this.ruleForm.tanggal_lahir = ''
            this.ruleForm.jenis_kelamin = ''
            this.ruleForm.agama = ''
            this.ruleForm.status_saat_ini = ''
            this.ruleForm.pekerjaan = ''
            this.ruleForm.nama_orangtua = ''
            this.ruleForm.telepon = ''
            this.ruleForm.asal_sekolah_kampus = ''
            this.ruleForm.alamat = ''
            this.ruleForm.kecamatan = ''
            this.ruleForm.kota_kabupaten = ''
            this.ruleForm.provinsi = ''
            this.ruleForm.kode_pos = ''
            this.ruleForm.akun_ig = ''
            this.dialogruleFormVisible = false
          })
      } else {
        alert('Maaf, pembaruan data gagal !')
        // this.gagalNotif();
      }
    },
    successNotif() {
      const h = this.$createElement
      this.$notify({
        title: 'Success',
        message: h(
          'i',
          { style: 'color: teal' },
          'Pembaruan data berhasil !'
        ),
        type: 'success',
        showClose: false,
        duration: 2000
      })
    },
    gagalNotif() {
      const h = this.$createElement
      this.$notify({
        title: 'Failed',
        message: h(
          'i',
          { style: 'color: teal' },
          this.msg
        ),
        type: 'info',
        showClose: false,
        duration: 2000
      })
    }
  }

}

</script>

<style>
  input[type="password"]::-ms-reveal {
    display: none;
  }

  .inputkeren {
    --pure-material-safari-helper1: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    position: relative;
    display: block;
    padding-top: 6px;
    font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
    font-size: 16px;
    line-height: 1.5;
    overflow: hidden;
  }

  /* Input, Textarea */
  .inputkeren>input,
  .inputkeren>textarea {
    box-sizing: border-box;
    margin: 0;
    border: solid 1px #dddddd;
    /* border-color: red; */
    /* Safari */
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    border-top-color: transparent;
    border-radius: 4px;
    padding: 15px 13px 15px;
    width: 100%;
    height: inherit;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
    background-color: transparent;
    box-shadow: none;
    /* Firefox */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    caret-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    transition: border 0.2s, box-shadow 0.2s;
  }

  /* Span */
  .inputkeren>input+span,
  .inputkeren>textarea+span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    width: 100%;
    max-height: 100%;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    font-size: 75%;
    line-height: 15px;
    cursor: text;
    transition: color 0.2s, font-size 0.2s, line-height 0.2s;
  }

  /* Corners */
  .inputkeren>input+span::before,
  .inputkeren>input+span::after,
  .inputkeren>textarea+span::before,
  .inputkeren>textarea+span::after {
    content: "";
    display: block;
    box-sizing: border-box;
    margin-top: 6px;
    border-top: solid 1px;
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    min-width: 10px;
    height: 8px;
    pointer-events: none;
    box-shadow: inset 0 1px transparent;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .inputkeren>input+span::before,
  .inputkeren>textarea+span::before {
    margin-right: 4px;
    border-left: solid 1px transparent;
    border-radius: 4px 0;
  }

  .inputkeren>input+span::after,
  .inputkeren>textarea+span::after {
    flex-grow: 1;
    margin-left: 4px;
    border-right: solid 1px transparent;
    border-radius: 0 4px;
  }

  /* Hover */
  .inputkeren:hover>input,
  .inputkeren:hover>textarea {
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
    border-top-color: transparent;
  }

  .inputkeren:hover>input+span::before,
  .inputkeren:hover>textarea+span::before,
  .inputkeren:hover>input+span::after,
  .inputkeren:hover>textarea+span::after {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
  }

  .inputkeren:hover>input:not(:focus):placeholder-shown,
  .inputkeren:hover>textarea:not(:focus):placeholder-shown {
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
  }

  /* Placeholder-shown */
  .inputkeren>input:not(:focus):placeholder-shown,
  .inputkeren>textarea:not(:focus):placeholder-shown {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
  }

  .inputkeren>input:not(:focus):placeholder-shown+span,
  .inputkeren>textarea:not(:focus):placeholder-shown+span {
    font-size: inherit;
    line-height: 68px;
  }

  .inputkeren>input:not(:focus):placeholder-shown+span::before,
  .inputkeren>textarea:not(:focus):placeholder-shown+span::before,
  .inputkeren>input:not(:focus):placeholder-shown+span::after,
  .inputkeren>textarea:not(:focus):placeholder-shown+span::after {
    border-top-color: transparent;
  }

  /* Focus */
  .inputkeren>input:focus,
  .inputkeren>textarea:focus {
    border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    border-top-color: transparent;
    box-shadow: inset 1px 0 var(--pure-material-safari-helper1), inset -1px 0 var(--pure-material-safari-helper1), inset 0 -1px var(--pure-material-safari-helper1);
    outline: none;
  }

  .inputkeren>input:focus+span,
  .inputkeren>textarea:focus+span {
    color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
  }

  .inputkeren>input:focus+span::before,
  .inputkeren>input:focus+span::after,
  .inputkeren>textarea:focus+span::before,
  .inputkeren>textarea:focus+span::after {
    border-top-color: var(--pure-material-safari-helper1) !important;
    box-shadow: inset 0 1px var(--pure-material-safari-helper1);
  }

  /* Disabled */
  .inputkeren>input:disabled,
  .inputkeren>input:disabled+span,
  .inputkeren>textarea:disabled,
  .inputkeren>textarea:disabled+span {
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
    border-top-color: transparent !important;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
    pointer-events: none;
  }
  .inputkeren>input:disabled+span::before,
  .inputkeren>input:disabled+span::after,
  .inputkeren>textarea:disabled+span::before,
  .inputkeren>textarea:disabled+span::after {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
  }

  .inputkeren>input:disabled:placeholder-shown,
  .inputkeren>input:disabled:placeholder-shown+span,
  .inputkeren>textarea:disabled:placeholder-shown,
  .inputkeren>textarea:disabled:placeholder-shown+span {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
  }

  .inputkeren>input:disabled:placeholder-shown+span::before,
  .inputkeren>input:disabled:placeholder-shown+span::after,
  .inputkeren>textarea:disabled:placeholder-shown+span::before,
  .inputkeren>textarea:disabled:placeholder-shown+span::after {
    border-top-color: transparent !important;
  }

  /* Faster transition in Safari for less noticable fractional font-size issue */
  @media not all and (min-resolution:.001dpcm) {
    @supports (-webkit-appearance:none) {

      .inputkeren>input,
      .inputkeren>input+span,
      .inputkeren>textarea,
      .inputkeren>textarea+span,
      .inputkeren>input+span::before,
      .inputkeren>input+span::after,
      .inputkeren>textarea+span::before,
      .inputkeren>textarea+span::after {
        transition-duration: 0.1s;
      }
    }
  }

</style>
