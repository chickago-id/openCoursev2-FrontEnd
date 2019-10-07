<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Master Kelas" />

    <br />
    <el-row type="flex" class="row-bg" justify="end">
      <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
    </el-row>
    <br />

    <!-- Form Tambah Data -->
    <el-dialog title="Tambah Master Kelas" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="Kode Kelas" :label-width="formLabelWidth">
          <el-input v-model="form.kode_kelas" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="Nama Kelas" :label-width="formLabelWidth">
          <el-input v-model="form.nama_kelas" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addData">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- End of Form Tambah Data -->

    <!-- List Data Table -->
    <el-table
      v-loading="listLoading"
      :data="listData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column label="Kode Kelas">
        <template slot-scope="scope">{{ scope.row.kode_kelas }}</template>
      </el-table-column>
      <el-table-column label="Nama Kelas">
        <template slot-scope="scope">{{ scope.row.nama_kelas }}</template>
      </el-table-column>
      <el-table-column label="Create Date">
        <template slot-scope="scope">{{ scope.row.created_date }}</template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button
            @click="deleteData(scope.row.kode_kelas, scope.$index)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- End of List Data Table -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapGetters(["token", "username", "roles"])
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listData: [],
      form: {
        kode_kelas: "",
        nama_kelas: "",
        created_by: "",
        created_date: "",
        updated_by: "",
        updated_date: ""
      },
      successAlertVisible: false,
      dialogFormVisible: false,
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
    addNotif() {
      const h = this.$createElement;
      this.$notify({
        title: "Success",
        message: h(
          "i",
          { style: "color: teal" },
          "Data berhasil ditambah/diperbaharui"
        ),
        type: "success",
        showClose: false,
        duration: 2000
      });
    },
    getData() {
      this.listLoading = true;
      axios.get("http://localhost:8081/masterkelas").then(response => {
        this.listData = response.data.data;
        this.listLoading = false;
      });
    },
    clearData() {
      this.form.kode_kelas = "";
      this.form.nama_kelas = "";
      this.form.created_by = 1;
      this.form.created_date = "";
      this.form.updated_by = 1;
      this.form.updated_date = "";
      this.dialogFormVisible = true;
    },
    editData(scope) {
      this.form.kode_kelas = scope.row.kode_kelas;
      this.form.nama_kelas = scope.row.nama_kelas;
      this.form.updated_by = 1;
      this.dialogFormVisible = true;
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
          axios
            .delete("http://localhost:8081/masterkelas/" + id, {
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
    addData() {
      const token = "Bearer " + localStorage.getItem("token");
      const auth = {
        Authorization: token,
        "Content-Type": "application/json"
      };
      console.log(token);
      if (this.form.kode_kelas != "") {
        axios
          .post(
            process.env.VUE_APP_BASE_API +
              "/masterkelas/" +
              this.form.kode_kelas,
            this.form,
            { headers: auth }
          )
          .then(data => {
            this.getData();
            this.addNotif();
            this.dialogFormVisible = false;
          });
      } else {
        axios
          .post(process.env.VUE_APP_BASE_API + "/masterkelas", this.form, {
            headers: auth
          })
          .then(data => {
            this.getData();
            this.addNotif();
            this.dialogFormVisible = false;
          });
      }
    }
  }
};
</script>
