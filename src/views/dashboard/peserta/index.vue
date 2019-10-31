<template>
    <div style="padding:30px;">

      <el-dialog align="center" title="Info Detail Jadwal" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-table
            v-loading="listLoading"
            :data="listData"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row>

          <el-table-column align="center" label="No" width="50">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="Materi">
              <template slot-scope="scope">
                <!-- {{ scope.row.masterKelas.nama_kelas }} -->
              </template>
            </el-table-column>
            <el-table-column label="Instruktur">
              <template slot-scope="scope">
                <!-- {{ scope.row.userDetail.nama_lengkap }} -->
              </template>
            </el-table-column>
            <el-table-column label="Sesi">
              <template slot-scope="scope">
                <!-- {{ scope.row.userDetail.nama_lengkap }} -->
              </template>
            </el-table-column>
            <el-table-column label="Durasi per Sesi">
              <template slot-scope="scope">
                <!-- {{ scope.row.userDetail.nama_lengkap }} -->
              </template>
            </el-table-column>
            </el-table>
        </el-form>
      </el-dialog>

    <el-alert :closable="false" title="Dashboard Peserta" />
    <br/>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card header="Status Peserta" shadow="always">
          Aktif
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="Jumlah Kelas yang diikuti" shadow="always">
          1
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card header="Jumlah materi yang diikuti" shadow="always">
          20
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="12">
      <el-col >
        <el-card header="Jadwal Kursus" shadow="always">
          <!-- List Data -->
          <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="regData">Enroll</el-button>
            </span>
          <el-table
            v-loading="listLoading"
            :data="listData"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="No" width="95">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="Kelas">
              <template slot-scope="scope">
                {{ scope.row.masterKelas.nama_kelas }}
              </template>
            </el-table-column>
            <el-table-column label="Jam">
              <template slot-scope="scope">
                {{ scope.row.sesi.jam_mulai }} - {{ scope.row.sesi.jam_selesai }}
              </template>
            </el-table-column>
            <el-table-column label="Ruang">
              <template slot-scope="scope">
                {{ scope.row.ruang.name }}
              </template>
            </el-table-column>
            <el-table-column label="Materi">
              <template slot-scope="scope">
                {{ scope.row.materi.nama_materi }}
              </template>
            </el-table-column>
            <el-table-column label="Instruktur">
              <template slot-scope="scope">
                {{ scope.row.userDetail.nama_lengkap }}
              </template>
            </el-table-column>
          </el-table>
          <!-- End of List Data -->
        </el-card>
      </el-col>
    </el-row>

  <br />
  <el-row :gutter="12">
      <el-col >
        <el-card header="Kelas Sedang Dibuka" shadow="always">
          <!-- List Data -->
          <el-table
            v-loading="listLoading"
            :data="listData2"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="No" width="50">
              <template slot-scope="scope">
                {{ scope.$index+1 }}
              </template>
            </el-table-column>
            <el-table-column label="Tipe Kelas">
              <template slot-scope="scope">
                {{ scope.row.kelasType.name }}
              </template>
            </el-table-column>
            <el-table-column label="Nama Kelas">
              <template slot-scope="scope">
                {{ scope.row.masterKelas.nama_kelas }}
              </template>
            </el-table-column>
            <el-table-column label="Pertemuan" align="center">
              <template slot-scope="scope">
                {{ scope.row.jumlah_pertemuan }}
              </template>
            </el-table-column>
            <el-table-column label="Biaya">
              <template slot-scope="scope">
                {{ scope.row.biaya }}
              </template>
            </el-table-column>
            <el-table-column label="Status" align="center" width="100">
              <template slot-scope="scope">
                <el-tag size="mini"> {{ scope.row.status.name }} </el-tag> 
              </template>
            </el-table-column>
            <el-table-column label="Tanggal Mulai">
              <template slot-scope="scope">
                {{ scope.row.tanggal_mulai | formatDate}}
              </template>
            </el-table-column>
            <el-table-column label="Peserta" align="center">
              <template slot-scope="scope">
                {{ scope.row.target_peserta }}
              </template>
            </el-table-column>

            <el-table-column align="center" label="Action" width="180">
            <template slot-scope="scope">
              <el-button @click="infoData(scope)" type="info" size="mini">Info</el-button>
              <el-button @click="enRoll(scope)" size="mini" type="primary">Enroll</el-button>
            </template>
          </el-table-column>
          </el-table>
          <!-- End of List Data icon="el-icon-edit-outline" --> 
        </el-card>
      </el-col>
    </el-row>

    <br>
    <el-row>
      <el-col>
        <el-card :gutter="12">
            <Kelas/>
        </el-card>
      </el-col>
    </el-row>
   
  </div>
</template>

<script>
import axios from 'axios'
import Kelas from './components/CarouselCard'
// import Vue2Filters from 'vue2-filters'

// Vue.use(Vue2Filters)

export default {
    name: 'DashboardPeserta',
    components: {
      Kelas
    },
    created() {
      this.getData()
      this.getKelas()
    },
    data() {
      return {
        auth: {},
        selectedKelas: '',
        listData: [],
        listData2: [],
        listLoading: false,
        dialogFormVisible: false,
    //    formLabelWidth: '150px'
      }
    },
    methods: {
      formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
      getData() {
        const token = 'Bearer '+localStorage.getItem('token')
        const auth = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
        this.auth = auth
        this.listLoading = true
        axios.get(process.env.VUE_APP_BASE_API + '/jadwal', {headers: this.auth})
        .then((response) => {
          console.log(response.data.data)
          this.listData = response.data.data;
          this.listLoading = false
        })
      },

      getKelas() {
        const token = 'Bearer '+localStorage.getItem('token')
        const auth = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
      }
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/kelas/enroll', {headers: auth})
      .then((response) => {
        this.listData2 = response.data.data;
        this.listLoading = false
      })
    },

    infoData(scope){
      this.dialogFormVisible = true 
      this.form.id = scope.row.id;
    },

    }
}
</script>

<style lang="scss" scoped>

</style>
