<template>
  <div>

<el-dialog
  title="Inbox"
  :visible.sync="dialogVisible"
  width="80%"
  :before-close="handleClose">
  <el-menu background-color="#545c64"
      text-color="#fff">
                        <el-menu-item >
        <strong>{{subject}}</strong>
        
      </el-menu-item>
  </el-menu>
            
            
  
     <el-card>
       <el-row :gutter="20">
  <el-col :span="16"><div class="grid-content bg-purple" style="font-weight:bold">Dari: {{ sender }}</div></el-col>
  <el-col :span="8"><div class="grid-content bg-purple" align="right">{{date}}</div></el-col>
</el-row>
<br><br>
      {{bodymessage}}
    
    </el-card>
    
  <span slot="footer" class="dialog-footer"> 
    <el-button @click="dialogVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
  </span>
</el-dialog>



    <el-table
      v-loading="listLoading"
      :data="listData"
      element-loading-text="Loading" 
    >
   
     <el-table-column  label="Inbox" width="150" >
       
      <template slot-scope="scope" >
            <el-tag size="medium">{{ scope.row.userDetail.nama_lengkap }}</el-tag>
      </template>
    </el-table-column>

    
     <el-table-column   width="450">
         <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>Date: {{ scope.row.date }}</p>
          <div slot="reference" class="name-wrapper" >
             <a style="font-weight: bold">{{ scope.row.subject }}  </a>
             <br>
             <div v-if=" scope.row.bodymessage.length<60">{{ scope.row.bodymessage }}</div> 
             <div v-else>{{  scope.row.bodymessage.substring(0,60)+"..." }}</div>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column
      align="right"   >
      <template slot-scope="scope">
        <el-button  type="primary" icon="el-icon-view" circle size="mini"
          @click="showData(scope)"></el-button>
      
           <el-button  type="danger" icon="el-icon-delete" circle size="mini"
          @click="deleteData(scope.row.id, scope.$index)"></el-button>
      </template>
    </el-table-column>
  </el-table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from "axios";


  export default {
    computed: {
    ...mapGetters([ "username", "roles"])
  },
   data() {
    return {
      list: null,
      listLoading: true,
      listData: [],
      bodymessage: [],
      sender: [],
      subject:[],
      date:[],
      url:[],
      form: {
        id: "",
      },
      successAlertVisible: false,
      dialogVisible: false,
      formLabelWidth: "150px"
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.getData();
  },
  
  methods: {
  getData() {
    const token = "Bearer " + localStorage.getItem("token");
      const auth = {
        Authorization: token,
        "Content-Type": "application/json"
      };
      this.listLoading = true;
      axios.get("http://localhost:8081/mailbox",{ headers: auth }
          ).then(response => {
            console.log(response.data.data.sender);
        this.listData = response.data.data;
        this.listLoading = false;
      });
  
    },
  showData(scope){
      this.dialogVisible = true;
      this.bodymessage = scope.row.bodymessage;
      this.sender = scope.row.userDetail.nama_lengkap;
      this.subject = scope.row.subject;
      this.date = scope.row.date;
      this.url = scope.row.uri;
  },
  deleteData(id, index) {
      this.$confirm(
        "This will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          const token = "Bearer " + localStorage.getItem("token");
          const auth = {
            Authorization: token,
            "Content-Type": "application/json"
          };
          console.log(id);
          axios.delete("http://localhost:8081/mailbox" + id, {
              headers: auth
            })
            .then(
              res => {
                console.log(res);
                this.listData.splice(index, 1);
              },
              error => {
                console.log(error);
              }
            );
          this.$message({
            type: "success",
            message: "Delete completed"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
      this.getData();
    },
  }
  }
</script>
