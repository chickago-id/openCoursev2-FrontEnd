<template>
  <div style="padding:30px;">
    <el-alert :closable="false" title="Kelas" />

    <br />
    <el-row type="flex" class="row-bg" justify="end">
      <el-button size="mini" type="primary" @click="clearData">Tambah</el-button>
    </el-row>
    <br />

    <!-- Form Tambah Data -->
    <el-dialog title="Tambah Kelas" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item required label="Nama Kelas" :label-width="formLabelWidth">
          <el-select id="namakelas" v-model="form.kode_kelas" @change="kelasinfo">
            <el-option
              v-for="item in namakelasops"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="form.kode_kelas" autocomplete="off"></el-input> -->
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="Jenis Kelas" :label-width="formLabelWidth">
          <el-select v-model="form.jenis_kelas">
            <el-option
              v-for="item in jkop"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="form.jenis_kelas" autocomplete="off"></el-input> -->
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="Jumlah Pertemuan" :label-width="formLabelWidth">
          <el-input v-model="form.jumlah_pertemuan" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="Biaya" :label-width="formLabelWidth">
          <el-input v-model="form.biaya" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="Status" :label-width="formLabelWidth">
          <el-select v-model="form.status">
            <el-option
              v-for="item in statusop"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="form.status" autocomplete="off"></el-input> -->
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="Tanggal Mulai" :label-width="formLabelWidth">
          <el-input type="date" v-model="form.tanggal_mulai" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item required label="Target Peserta" :label-width="formLabelWidth">
          <el-input v-model="form.target_peserta" autocomplete="off"></el-input>
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
      <el-table-column label="Nama Kelas">
        <template slot-scope="scope">{{ scope.row.kode_kelas }}</template>
      </el-table-column>
      <el-table-column label="Jenis Kelas">
        <template slot-scope="scope">{{ scope.row.jenis_kelas }}</template>
      </el-table-column>
      <el-table-column label="Jumlah Pertemuan">
        <template slot-scope="scope">{{ scope.row.jumlah_pertemuan }}</template>
      </el-table-column>
      <el-table-column label="Status">
        <template slot-scope="scope">{{ scope.row.status }}</template>
      </el-table-column>
      <el-table-column label="Tanggal Mulai">
        <template slot-scope="scope">{{ scope.row.tanggal_mulai }}</template>
      </el-table-column>
      <el-table-column label="Target Peserta">
        <template slot-scope="scope">{{ scope.row.target_peserta }}</template>
      </el-table-column>
      <el-table-column label="Nama Pengajar">
        <template slot-scope="scope">{{ scope.row.tanggal_mulai }}</template>
      </el-table-column>
      <el-table-column label="Action">
        <template slot-scope="scope">
          <el-button @click="editData(scope)" size="mini" type="warning" icon="el-icon-edit" circle></el-button>
          <el-button
            @click="deleteData(scope.row.id, scope.$index)"
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
      statusop: [
        { value: "aktif", text: "Aktif" },
        { value: "pending", text: "Pending" }
      ],
      jkop: [
        { value: "profesi", text: "Profesi" },
        { value: "private", text: "Private" },
        { value: "intensif", text: "Intensif" }
      ],
      form: {
        id: "",
        kode_kelas: "",
        biaya: "",
        jenis_kelas: "",
        jumlah_pertemuan: "",
        status: "",
        tanggal_mulai: "",
        target_peserta: ""
      },
      namakelasops: [{ text: "Silakan Pilih", value: null, disabled: true }],
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
    this.getmasterKelas();
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
    getmasterKelas() {
      axios.get("http://localhost:8081/masterkelas").then(response => {
        // this.namamateri = response.data.data;
        // console.log(response)
        response.data.data.forEach(masterKelas => {
          this.namakelasops.push({
            text: masterKelas.nama_kelas,
            value: masterKelas.kode_kelas
          });
        });
        console.log(response);
      });
    },
    getNamaPengajar() {
      axios.get("http://localhost:8081/user").then(response => {});
      console.log(response);
    },
    kelasinfo() {
      const id = this.form.kode_kelas;
      axios.get("http://localhost:8081/masterkelas/" + id).then(response => {
        // console.log(response)
        this.form.nama_kelas = response.data.data[0].nama_kelas;
      });
    },
    getData() {
      this.listLoading = true;
      axios.get("http://localhost:8081/kelas").then(response => {
        this.listData = response.data.data;
        this.listLoading = false;
      });
    },
    clearData() {
      this.form.id = "";
      this.form.kode_kelas = "";
      this.form.biaya = "";
      this.form.jenis_kelas = "";
      this.form.jumlah_pertemuan = "";
      this.form.status = "";
      this.form.tanggal_mulai = "";
      this.form.target_peserta = "";
      this.dialogFormVisible = true;
    },
    editData(scope) {
      this.form.id = scope.row.id;
      this.form.kode_kelas = scope.row.kode_kelas;
      this.form.biaya = scope.row.biaya;
      this.form.jenis_kelas = scope.row.jenis_kelas;
      this.form.jumlah_pertemuan = scope.row.jumlah_pertemuan;
      this.form.status = scope.row.status;
      this.form.tanggal_mulai = scope.row.tanggal_mulai;
      this.form.target_peserta = scope.row.target_peserta;
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
            .delete("http://localhost:8081/kelas/" + id, {
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
      if (this.form.id != "") {
        axios
          .post(
            process.env.VUE_APP_BASE_API + "/kelas/" + this.form.id,
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
          .post(process.env.VUE_APP_BASE_API + "/kelas", this.form, {
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
