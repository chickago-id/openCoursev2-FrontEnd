<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Kategori Nilai" />
    
    <el-table
      v-loading="listLoading"
      :data="dataKategoriNilai"
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
      <el-table-column label="Nama Kategori">
        <template slot-scope="scope">
          {{ scope.row.nama_kategori }}
        </template>
      </el-table-column>
      <el-table-column label="Created Date">
        <template slot-scope="scope">
          {{ scope.row.created_date }}
        </template>
      </el-table-column>
      <!-- <el-table-column label="Updated Date">
        <template slot-scope="scope">
          {{ scope.row.updated_date }}
        </template>
      </el-table-column> -->
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="editButton(scope)">Edit</el-button>
          <el-button size="mini" type="danger" @click="deleteButton(scope.row.id_kategori_nilai)">Hapus</el-button>
        </template>
      </el-table-column>
    </el-table>
    
{{username}}    
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
      
      list: null,
      listLoading: true,
      dataKategoriNilai: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
     getData() {
      this.listLoading = true
      axios.get('http://localhost:8081/kategori-nilai')
      .then((response) => {
        this.dataKategoriNilai = response.data.data;
        this.listLoading = false
      })
    },
    editButton(scope){
      console.log(scope.row.nama_kategori)
      
    },
    deleteButton(id){
      if(confirm("Do you really want to delete?")){
        const token = 'Bearer '+localStorage.getItem('token')
        const auth = {
          'Authorization' : token,
          'Content-Type' : 'application/json'
        }
        //const id_kategori_nilai = this.dataKategoriNilai[id].id_kategori_nilai
        console.log(id)
        axios.delete('http://localhost:8081/kategori-nilai/'+id, { headers: auth })
        .then((res) =>{
        console.log(res)
        this.dataKategoriNilai.splice(id, 1)
        }, (error) => {
          console.log(error)
        }) 
      } 
      this.getData()
    }, 
    
  }
}
</script>
