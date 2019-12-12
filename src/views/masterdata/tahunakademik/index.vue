<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Tahun Akademik" />

    <br />
    <el-row type="flex" class="row-bg" justify="end">
      <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
    </el-row>
    <br />

    <!-- Form Tambah Data -->
    <el-dialog title="Tambah Tahun Akademik" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="Tahun Mulai" :label-width="formLabelWidth">
          <el-input type="Date" v-model="form.tahun_mulai" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="Tahun Selesai" :label-width="formLabelWidth">
          <el-input type="Date" v-model="form.tahun_selesai" autocomplete="off"></el-input>
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
      <el-table-column label="Tahun Mulai">
        <template slot-scope="scope">{{ scope.row.tahun_mulai | formatYear }}</template>
      </el-table-column>
      <el-table-column label="Tahun Selesai">
        <template slot-scope="scope">{{ scope.row.tahun_selesai | formatYear }}</template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button
            @click="deleteData(scope.row.id_tahun_akademik, scope.$index)"
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
        id_tahun_akademik: "",
        tahun_mulai: "",
        tahun_selesai: ""
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
      axios.get(process.env.VUE_APP_BASE_API+'/tahunakademik').then(response => {
        this.listData = response.data.data;
        this.listLoading = false;
      });
    },
    clearData() {
      this.form.id_tahun_akademik = "";
      this.form.tahun_mulai = "";
      this.form.tahun_selesai = "";
      this.dialogFormVisible = true;
    },
    editData(scope) {
      this.form.id_tahun_akademik = scope.row.id_tahun_akademik;
      this.form.tahun_mulai = scope.row.tahun_mulai;
      this.form.tahun_selesai = scope.row.tahun_selesai;
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
            .delete(process.env.VUE_APP_BASE_API+'/tahunakademik/' + id, {
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
      if (this.form.id_tahun_akademik != "") {
        axios
          .post(
            process.env.VUE_APP_BASE_API +
              "/tahunakademik/" +
              this.form.id_tahun_akademik,
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
          .post(process.env.VUE_APP_BASE_API + "/tahunakademik", this.form, {
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
