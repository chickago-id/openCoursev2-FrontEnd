<template>
  <div>
    <el-card class="card" style="display: absolute; margin: 20px;">
      <form-wizard
        shape="shape"
        color="#20a0ff"
        title="asd"
        error-color="#ff4949"
        style="padding: 20px;"
        @on-complete="onComplete"
      >
        <h2 slot="title">Lengkapi Data Diri</h2>
        <!-- <h3 slot="subtitle">profile user data</h3>   -->
        <tab-content title="Personal details" icon="ti-user" :before-change="validateFirstStep">
          <el-row style="width: 100%;  float: right;">
            <el-col :xs="0">
              &nbsp;
            </el-col>
            <el-col :xs="24">
              <div style="padding: 30px;">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" labteel-width="120px" class="demo-ruleForm">
                  <el-form-item label="Nama Lengkap (Tanpa Gelar)" prop="nama_lengkap">
                    <el-input v-model="ruleForm.nama_lengkap" placeholder="e.g. : Alfa Romeo" />
                  </el-form-item>
                  <el-form-item label="Jenis Kelamin" prop="jenis_kelamin">
                    <el-radio-group v-model="ruleForm.jenis_kelamin" style="width: 100%;">
                      <el-radio label="Laki-Laki" />
                      <el-radio label="Perempuan" />
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="Tempat Lahir" prop="tempat_lahir">
                    <el-input v-model="ruleForm.tempat_lahir" placeholder="e.g. : Yogyakarta" />
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

                  <el-form-item label="Agama" prop="agama">
                    <el-select v-model="ruleForm.agama" placeholder="pilih agama" style="width: 100%;">
                      <el-option label="Islam" value="Islam" />
                      <el-option label="Kristen" value="Kristen" />
                      <el-option label="Protestan" value="Protestan" />
                      <el-option label="Budha" value="Budha" />
                      <el-option label="Hindu" value="Hindu" />
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Nama Orang Tua (Ibu) Tanpa Gelar" prop="nama_orangtua">
                    <el-input v-model="ruleForm.nama_orangtua" placeholder="e.g : Alfa Remeo" />
                  </el-form-item>

                </el-form>
              </div>

            </el-col>
            <el-col :xs="0">
              &nbsp;
            </el-col>
          </el-row>

        </tab-content>
        <tab-content title="Additional information" icon="ti-settings" :before-change="validateTwoStep">
          <el-form
            ref="addForm"
            :label-position="labelPosition"
            label-width="100px"
            :model="ruleForm"
            :rules="rulas"
            class="demo-ruleForm"
          >

            <el-form-item label="Alamat" prop="alamat">
              <el-input v-model="ruleForm.alamat" type="textarea" placeholder="e.g. : Jl. Glagahsari 46C Yogyakarta" />
            </el-form-item>

            <el-form-item label="Provinsi" prop="provinsiSelect">
              <el-select v-model="ruleForm.provinsiSelect" filterable placeholder="Select" @change="showKota($event)">
                <el-option v-for="item in provinsiOption" :key="item.key" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="Kota / Kabupaten " prop="kota_kabupatenSelect">
              <el-select v-model="ruleForm.kota_kabupatenSelect" filterable placeholder="Select" @change="showKecamatan($event)">
                <el-option
                  v-for="item in kota_kabupatenOption"
                  :key="item.key"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="kecamatan" prop="kecamatanSelect">
              <el-select v-model="ruleForm.kecamatanSelect" filterable placeholder="Select" @change="setKecamatan($event)">
                <el-option v-for="item in kecamatanOption" :key="item.key" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="Kodepos" prop="kode_pos">
              <el-input v-model="ruleForm.kode_pos" type="number" placeholder="e.g : 55161" />
            </el-form-item>
            <el-form-item label="Telepon / HP " prop="telepon">
              <el-input v-model="ruleForm.telepon" type="number" placeholder="e.g : 081299988777" />
            </el-form-item>
            <el-form-item label="Telepon Orang Tua / HP" prop="telepon_orangtua">
              <el-input v-model="ruleForm.telepon_orangtua" type="number" placeholder="e.g : 081299988777" />
            </el-form-item>

            <el-form-item label="Akun Instagram" prop="akun_ig">
              <el-input v-model="ruleForm.akun_ig" placeholder="e.g : alfabank_jogja" />
            </el-form-item>

            <el-form-item label="Status sekolah" prop="status_saat_ini">
              <el-select v-model="ruleForm.status_saat_ini" placeholder="pilh status" style="width: 100%;">
                <el-option label="Masih Sekolah/Kuliah" value="Masih Sekolah/Kuliah" />
                <el-option label="Lulus kuliah" value="Lulus kuliah" />
                <el-option label="Sudah Bekerja" value="Sudah Bekerja" />
                <el-option label="Lulus Sekolah" value="Lulus Sekolah" />
              </el-select>
            </el-form-item>

            <el-form-item label="Asal Sekolah / Kampus" prop="asal_sekolah_kampus">
              <el-input v-model="ruleForm.asal_sekolah_kampus" placeholder="e.g : Universitas Gajah Mada " />
            </el-form-item>

            <el-form-item label="Pekerjaan" prop="pekerjaan">
              <el-input v-model="ruleForm.pekerjaan" placeholder="e.g. : Wiraswasta" />
            </el-form-item>

            <el-form-item label="Informasi Dari?" prop="informasi_dari">
              <el-select v-model="ruleForm.informasi_dari" placeholder="Pilih informasi " style="width: 100%;">
                <el-option label="Website" value="Website" />
                <el-option label="Facebook" value="Kristen" />
                <el-option label="Google" value="Google" />
                <el-option label="Instagram" value="Instagram" />
                <el-option label="Brosur" value="Brosur" />
                <el-option label="Rontek" value="Rontek" />
                <el-option label="Teman" value="Teman" />
                <el-option label="Orang Tua" value="Orang Tua" />
                <el-option label="Alumni Alfabank" value="Alumni Alfabank" />
                <el-option label="Guru" value="Guru" />
                <el-option label="Presentasi di sekolah" value="Presentasi di sekolah" />
                <el-option label="Media cetak" value="Media cetak" />
                <el-option label="Media Elektronik" value="Media Elektronik" />
                <el-option label="Teman dari teman" value="Teman dari teman" />
              </el-select>
            </el-form-item>
          </el-form>
        </tab-content>
        <tab-content title="Last step" icon="ti-check">
          <h2 style="text-align: center;">Apa Sudah Yakin ?</h2>
        </tab-content>

        <el-button slot="prev" type="primary">Back</el-button>
        <el-button slot="next" type="primary">Next</el-button>
        <el-button slot="finish" type="primary">Submit</el-button>
      </form-wizard>

    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import { getProvinsi } from '@/api/provinsi'
import { getKota } from '@/api/kota'
import { getKecamatan } from '@/api/kecamatan'

import {
  FormWizard,
  TabContent
} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import 'themify-icons-scss/scss/themify-icons.scss'
// Vue.use(VueFormWizard)
export default {
  components: {
    FormWizard,
    TabContent
  },

  data() {
    var validateProv = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Pilih Provinsi'))
      } else {
        callback()
      }
    }
    var validateKota = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Pilih Kota / Kabupaten'))
      } else {
        callback()
      }
    }
    var validateKecamatan = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Pilih Kecamtan'))
      } else {
        callback()
      }
    }

    return {
      provinsiOption: [{
        'key': '',
        'value': '',
        'label': 'Silahkan Pilih'
      }],
      kota_kabupatenOption: [{
        'key': '',
        'value': '',
        'label': ''
      }],
      kecamatanOption: [{
        'key': '',
        'value': '',
        'label': ''
      }],
      provinsiSelect: '',
      kota_kabupatenSelect: '',
      kecamatanSelect: '',
      provId: '',
      kecamatanId: '',
      nama_kecamatan: '',
      nama_provinsi: '',
      nama_kota_kabupaten: '',
      kota_kabupaten: '',
      kota_kabupatenId: '',
      user_id: '',
      auth: '',
      userData: null,
      listLoading: true,
      // listData: [],
      id_user: '',
      email: '',
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
        provinsi: '',
        kota_kabupaten: '',
        kecamatan: '',
        nama_orangtua: '',
        telepon_orangtua: '',
        asal_sekolah_kampus: '',
        kode_pos: '',
        informasi_dari: '',
        akun_ig: '',
        provId: '',
        provinsiSelect: '',
        kota_kabupatenSelect: '',
        kecamatanSelect: ''

      },
      successAlertVisible: false,
      dialogFormVisible: false,
      labelPosition: 'top',

      rules: {
        // age: [
        //   { validator: checkAge, trigger: 'blur' }
        // ],
        nama_lengkap: [{
          required: true,
          message: 'Masukan Nama Lengkap Tanpa Gelar',
          trigger: 'change'
        },
        {
          max: 25,
          message: 'max 25 characters',
          trigger: 'blur'
        },
        {
          required: true,
          pattern: /^[a-zA-Z ]+$/,
          message: 'Just Alphabet',
          trigger: 'blur'
        }
        ],
        tempat_lahir: [{
          required: true,
          message: 'Masukan Tempat Lahir',
          trigger: 'blur'
        },
        {
          max: 25,
          message: 'max 55 characters',
          trigger: 'blur'
        },
        {
          required: true,
          pattern: /^[a-zA-Z ]+$/,
          message: 'Just Alphabet',
          trigger: 'blur'
        }
        ],
        agama: [{
          required: true,
          message: 'Silahkan Masukan Agama',
          trigger: 'change'
        }],

        tanggal_lahir: [{
          type: 'date',
          required: true,
          message: 'Silahkan pick a date birth',
          trigger: 'change'
        }],
        date2: [{
          type: 'date',
          required: true,
          message: 'Silahkan pick a time',
          trigger: 'change'
        }],

        jenis_kelamin: [{
          required: true,
          message: 'Pilih Jenis Kelamin',
          trigger: 'change'
        }],
        nama_orangtua: [{
          required: true,
          message: 'Silahkan input nama orang tua',
          trigger: 'blur'
        },
        {
          max: 35,
          message: 'max 35 characters',
          trigger: 'blur'
        }
        ]
      },
      rulas: {
        alamat: [{
          required: true,
          message: 'Silahkan input alamat',
          trigger: 'blur'
        },
        {
          max: 30,
          message: 'max 30 characters',
          trigger: 'blur'
        },
        {
          required: true,
          pattern: /^[0-9 A-Z a-z_.-]+$/,
          message: 'Character Special not allowed',
          trigger: 'blur'
        }
        ],
        provinsiSelect: [{
          required: true,
          validator: validateProv,
          trigger: 'change'
        }],
        kota_kabupatenSelect: [{
          required: true,
          validator: validateKota,
          trigger: 'change'
        }],
        kecamatanSelect: [{
          required: true,
          validator: validateKecamatan,
          trigger: 'blur'
        }],

        telepon_orangtua: [{
          required: true,
          message: 'Silahkan input telepon orang tua',
          trigger: 'blur'
        },
        {
          min: 10,
          max: 13,
          message: 'Length should be 10 to 13',
          trigger: 'blur'
        },
        {
          required: true,
          pattern: /^^(^\+62\s?|^0)(\d{3,4}?){2}\d{2,4}/,
          message: 'Silahkan input correct phone number',
          trigger: 'blur'
        }
        ],
        asal_sekolah_kampus: [{
          required: true,
          message: 'Silahkan input asal sekolah atau kampus',
          trigger: 'blur'
        },
        {
          max: 30,
          message: 'max 30 characters',
          trigger: 'blur'
        }
        ],
        telepon: [{
          required: true,
          message: 'Silahkan input telepon',
          trigger: 'blur'
        },
        {
          min: 10,
          max: 13,
          message: 'Nomer telpon minimal 10 & maksimal 13 nomer',
          trigger: 'blur'
        },
        {
          required: true,
          pattern: /^^(^\+62\s?|^0)(\d{3,4}?){2}\d{2,4}/,
          message: 'Silahkan masukan nomer dengan benar',
          trigger: 'blur'
        }
        ],
        status_saat_ini: [{
          required: true,
          message: 'Silahkan pilih Status',
          trigger: 'change'
        }],

        informasi_dari: [{
          required: true,
          message: 'Silahkan input akun instagram',
          trigger: 'blur'
        }],
        akun_ig: [{
          required: true,
          message: 'Silahkan input akun instagram',
          trigger: 'blur'
        },
        {
          max: 16,
          message: 'max 16 characters',
          trigger: 'blur'
        },
        {
          required: true,
          pattern: /^[-.a-zA-Z ]+$/,
          message: 'Hanya Alphabet',
          trigger: 'blur'
        }
        ],
        pekerjaan: [{
          required: true,
          message: 'Silahkan Masukan Pekerjaan',
          trigger: 'blur'
        },
        {
          max: 16,
          message: 'max 16 characters',
          trigger: 'blur'
        },
        {
          required: true,
          pattern: /^[a-zA-Z ]+$/,
          message: 'Just alphabet',
          trigger: 'blur'
        }
        ],
        kode_pos: [{
          required: true,
          message: 'Silahkan Masukan Kodepos  ',
          trigger: 'blur'
        },
        {
          min: 5,
          max: 5,
          message: 'kode pos just 5 digits',
          trigger: 'blur'
        }

        ]
      }

    }
  },

  created() {
    this.getData()

    this.fetchProvinsi()
  },
  computed: {
    provinsi(){
      return getProvinsi()
    },
    kota() {
      return getKota()
    },
    kecamatan() {
      return getKecamatan()
    }
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
      axios.get('http://167.71.203.32:2020/profil', {
        headers: auth
      }).then(response => {
        // this.listData = response.data.data
        // console.log(response.data.data)
        this.listLoading = false
        this.ruleForm.nama_lengkap = response.data.data[0].nama_lengkap
        this.ruleForm.provinsi = response.data.data[0].provinsi
        this.ruleForm.telepon = response.data.data[0].telepon
        this.ruleForm.jenis_kelamin = response.data.data[0].jenis_kelamin
        this.ruleForm.tempat_lahir = response.data.data[0].tempat_lahir
        this.ruleForm.agama = response.data.data[0].agama
        this.ruleForm.nama_orangtua = response.data.data[0].nama_orangtua
        this.ruleForm.alamat = response.data.data[0].alamat
        this.ruleForm.telepon_orangtua = response.data.data[0].telepon_orangtua
        this.ruleForm.kode_pos = response.data.data[0].kode_pos
        this.ruleForm.akun_ig = response.data.data[0].akun_ig
        this.ruleForm.status_saat_ini = response.data.data[0].status_saat_ini
        this.ruleForm.asal_sekolah_kampus = response.data.data[0].asal_sekolah_kampus
        this.ruleForm.pekerjaan = response.data.data[0].pekerjaan
        this.ruleForm.informasi_dari = response.data.data[0].informasi_dari
        this.ruleForm.id = response.data.data[0].id
        this.ruleForm.id_user = response.data.data[0].id_user
        this.ruleForm.email = response.data.data[0].email
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
            this.ruleForm, {
              headers: auth
            }
          )
          .then(data => {
            this.successNotif()
            // alert('Yay. Done!')
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
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
          'i', {
            style: 'color: teal'
          },
          'Pembaruan data berhasil !'
        ),
        type: 'success',
        showClose: false,
        duration: 5000
      })
    },
    fetchProvinsi() {
      // axios.get('http://localhost:9528/provinsi.json')
      //   .then((response) => {
      //     response.data.forEach(provinsi => {
      //       // let text = prov.name
      //       // let value = prov.id
      //       this.provinsiOption.push({
      //         key: provinsi.id,
      //         label: provinsi.name,
      //         value: provinsi
      //       })
      //     })
      //   })
      this.provinsi.forEach(item =>{
        console.log(item)
        this.provinsiOption.push({
                key: item.id,
                label: item.name,
                value: item
              })
      })
    },

    showKota() {
      this.kota_kabupatenOption = []
      this.kecamatanOption = []
      this.kota_kabupatenId = this.ruleForm.provinsiSelect.id
      this.ruleForm.provinsi = this.ruleForm.provinsiSelect.name
      this.ruleForm.provinsiSelect = this.ruleForm.provinsiSelect.name
      this.kota_kabupatenOption.push({
          key: '',
          label: 'Silakan Pilih',
          value: ''
        })
        this.kecamatanOption.push({
          key: '',
          label: 'Silakan Pilih',
          value: ''
        })
      this.kota.forEach(el => {
        if (el.province_id === this.kota_kabupatenId) {
            this.kota_kabupatenOption.push({
              key: el.id,
              label: el.name,
              value: el

            })
          }
      })
      // axios.get('http://localhost:9528/kota.json').then((response) => {
      //   // console.log(this.ruleForm.provinsiSelect, response)
      //   this.kota_kabupatenOption.push({
      //     key: '',
      //     label: 'Silakan Pilih',
      //     value: ''
      //   })
      //   this.kecamatanOption.push({
      //     key: '',
      //     label: 'Silakan Pilih',
      //     value: ''
      //   })
      //   this.ruleForm.kota_kabupatenSelect = ''
      //   this.ruleForm.kecamatanSelect = ''
      //   response.data.forEach(kota_kabupaten => {
      //     if (kota_kabupaten.province_id === this.kota_kabupatenId) {
      //       this.kota_kabupatenOption.push({
      //         key: kota_kabupaten.id,
      //         label: kota_kabupaten.name,
      //         value: kota_kabupaten

      //       })
      //     }
      //   })
      // })
      // console.log(this.ruleForm.provinsi)
    },
    showKecamatan() {
      this.kecamatanOption = []
      this.kecamatanId = this.ruleForm.kota_kabupatenSelect.id
      this.ruleForm.kota_kabupaten = this.ruleForm.kota_kabupatenSelect.name
      this.ruleForm.kota_kabupatenSelect = this.ruleForm.kota_kabupatenSelect.name
      this,kecamatan.forEach(el => {
        if (el.regency_id === this.kecamatanId) {
            this.kecamatanOption.push({
              key: el.id,
              label: el.name,
              value: el
            })
          }
      })
      // axios.get('http://localhost:9528/kecamatan.json').then((response) => {
      //     // console.log(this.ruleForm.kota_kabupatenSelect, response)
      //   response.data.forEach(kecamatan => {
      //     if (kecamatan.regency_id === this.kecamatanId) {
      //       this.kecamatanOption.push({
      //         key: kecamatan.id,
      //         label: kecamatan.name,
      //         value: kecamatan
      //       })
      //     }
      //   })
      // })
    },
    setKecamatan() {
      this.kecamatanId = this.ruleForm.kecamatanSelect.id
      this.ruleForm.kecamatan = this.ruleForm.kecamatanSelect.name
      this.ruleForm.kecamatanSelect = this.ruleForm.kecamatanSelect.name
      console.log(this.ruleForm.provinsi)
      console.log(this.ruleForm.kota_kabupaten)
      console.log(this.ruleForm.kecamatan)
    },

    gagalNotif() {
      const h = this.$createElement
      this.$notify({
        title: 'Failed',
        message: h(
          'i', {
            style: 'color: teal'
          },
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

</style>
