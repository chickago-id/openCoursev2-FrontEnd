<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="Nama Siswa" min-width="200">
      <template style="font-size:36px;">
        <h4>Local</h4>
        <!-- {{ scope.row.order_no | orderNoFilter }} slot-scope="scope" -->
      </template>
    </el-table-column>
    <el-table-column label="Waktu" width="195" align="center">
      local
      <!-- <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template> -->
    </el-table-column>
    <el-table-column label="Kelas" width="100" align="center">
      <template>
        joasm
      </template>
      <!-- <template slot-scope="{row}">
          {{ row.status }}
      </template> -->
    </el-table-column>
    <el-table-column label="Ruang" width="100" align="center">
      <template>
        jand
      </template>
      <!-- <template slot-scope="{row}">
          {{ row.status }}
      </template> -->
    </el-table-column>
  </el-table>
  <!-- Yang dikomen sementara tidak digunakan, untuk GET data -->
</template>

<script>
import { transactionList } from '@/api/remote-search'

export default {
  data() {
    return {
      list: ['halo']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>
