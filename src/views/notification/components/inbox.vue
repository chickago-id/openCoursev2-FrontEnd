<template>
  <div>
     <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
   
    <el-table-column lprop="name" label="Inbox"  width="160">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>Name: {{ scope.row.name }}</p>
          <p>Addr: {{ scope.row.kelas }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
     <el-table-column  prop="message" width="540">
         <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>Date: {{ scope.row.date }}</p>
          <div slot="reference" class="name-wrapper">
            {{ scope.row.message }}
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      align="right">
      <!-- <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"/>
      </template> -->
      <template slot-scope="scope" width="40">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
           <el-button  type="danger" icon="el-icon-delete" circle size="mini"
          @click="handleDelete(scope.$index, scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    name: 'inbox',
  props: {
    msg: String
  },
    data() {
      return {
        tableData: [{
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          name: 'Tom',
          kelas: 'No. 189, Grove St, Los Angeles',
          date: '2016-05-03'
        }, {
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          name: 'John',
          kelas: 'No. 189, Grove St, Los Angeles',
          date: '2016-05-03'
        }, {
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          name: 'Morgan',
          kelas: 'No. 189, Grove St, Los Angeles',
          date: '2016-05-03'
        }, {
          message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          name: 'Jessy',
          kelas: 'No. 189, Grove St, Los Angeles',
          date: '2016-05-03',
        }],
        search: '',
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
  }
</script>
