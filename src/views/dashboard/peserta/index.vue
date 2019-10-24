<template>
    <div style="padding:30px;">
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
            <el-table-column label="Hari">
              <template slot-scope="scope">
                {{ scope.row.day.name }}
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'DashboardPeserta',
    components: {
      
    },
    created() {
      this.getData()
    },
    data() {
      return {
        auth: {},
        selectedKelas: '',
        listData: [],
        listLoading: false
      }
    },
    methods: {
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
      }      
    }
}
</script>

<style lang="scss" scoped>

</style>
