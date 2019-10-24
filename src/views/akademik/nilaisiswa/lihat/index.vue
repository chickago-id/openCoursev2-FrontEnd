<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Lihat Nilai" />

<br>    
<br>    
    
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
      <el-table-column label="Kode Materi">
        <template slot-scope="scope">
          {{ scope.row.kelasPeserta.kelas.kode_kelas }}
        </template>
      </el-table-column>
      <el-table-column label="Nama Materi">
        <template slot-scope="scope">
          {{ scope.row.kategoriNilaiMateri.materi.nama_materi }}
        </template>
      </el-table-column>
      <el-table-column label="Nilai Angka">
        <template slot-scope="scope">
          {{ scope.row.nilai_input }}
        </template>
      </el-table-column>
    </el-table>
    <!-- End of List Data -->
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
      auth: {},
      listLoading: true,
      listData: [],
      form: {
        id_kategori_nilai: '',
        nama_kategori: '',
        created_by: 1,//''
        updated_by: 1,//'',
        created_date: '',
        updated_date: '',
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
      this.auth = auth
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/nilai-siswa/get/peserta', {headers: this.auth})
      .then((response) => {
        this.listData = response.data.data;
        this.listLoading = false
      })
    },
    editData(scope){
      this.dialogFormVisible = true 
      this.form.id_kategori_nilai = scope.row.id_kategori_nilai
      this.form.nama_kategori = scope.row.nama_kategori
      this.form.updated_by = 1;//scope.row.updated_by;
    }
  }
}
</script>
