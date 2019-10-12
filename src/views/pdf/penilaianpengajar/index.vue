<template>
  <div style="padding:30px;">
  
  
    <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="Efforts to generate PDF">
    <div class="article__heading">
      <div class="article__heading__title">
        <!-- {{ article.title }} -->
      <!-- List Data -->
     
 <el-table
    :data="tableData"
    stripe
    style="width: 100%"
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
      <el-table-column  prop="nama" label="Nama Pengajar">
        <!-- <template slot-scope="scope">
          {{ scope.row.user.username }}
        </template> -->
        
      </el-table-column>
            <el-table-column prop="kelas" label="Kelas">
        <!-- <template slot-scope="scope">
          {{ scope.row.user.username }}
        </template>-->
      </el-table-column> 
      <el-table-column prop="period" label="Period">
        <!-- <template slot-scope="scope">
          {{ scope.row.kategori_nilai.nama_kategori }}
        </template> -->
      </el-table-column>
      <el-table-column prop="value" label="Total Skor" >
<!-- <el-rate
  v-model="value"
  disabled
  show-score
  text-color="#ff9900"
  score-template="{value}">
</el-rate> -->
      </el-table-column>
    </el-table> 
<!-- End of List Data -->    
      </div>
    </div>
    <!-- <div ref="content" class="node-article-content" v-html="article.content" /> -->
  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
    computed: {
    ...mapGetters(["token", "username", "roles"])
  },
  data(){
    

    return {

      article: '',
      fullscreenLoading: true,
      tableData: [{
          nama: 'Supi Core',
          kelas: 'Design grafis',
          period: 'Agustus',
          user: 'Tom',
          value:'4.2',
        },{
          nama: 'Supi Core Dua',
          kelas: 'Design grafis',
          period: 'Agustus',
          user: 'Cinta',
          value:'4',
        },],      
        value1:'1',  
        value2:'2', 
        value3:'3',  
        value4:'4',
        value5:'5',
        
        
      auth: '',
      id_user: '',
      listLoading: true,
      materiOption: [{'value': '', 'label': ''}],
      materiSelect: '',
      kategoriOption: [{'value': '', 'label': ''}],
      form: {
        id: '',
        id_materi: '',
        id_kategori_nilai: '',
        bobot_nilai: ''
      },
      successAlertVisible: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dialogFormVisible3: false,
      formLabelWidth: '280px',
      listData: [],
      listDataByIdMateri: [],
      sisaBobotNilai: 100
    }
  },
  created() {
    this.getUserInfo();
    this.getData();
    this.getKelas();
  },
  mounted() {
    this.fetchData();
    this.getData();
    this.getKelas();
    this.getTahunA();
  },
  methods: {
    fetchData() {
       import('@/views/report/penilaianpengajar/index').then(data => {
         const { title } = data.default
         document.title = title
         this.article = data.default
         setTimeout(() => {
           this.fullscreenLoading = false
           this.$nextTick(() => {
             window.print()
           })
         }, 3000)
       })
    },
     getData() {
      this.listLoading = true;
      //axios.get(process.env.VUE_APP_BASE_API + '/kategori-nilai', {headers: this.auth})
      axios 
        .get("http://localhost:9528/fakePresensiSiswa.json")
        .then(response => {
          this.listData = response.data;
          this.listLoading = false;
        });
    },
      getUserInfo() {
      if (localStorage.getItem("token") != null) {
        const token = "Bearer " + localStorage.getItem("token");
        const auth = {
          Authorization: token,
          "Content-Type": "application/json"
        };
        this.auth = auth;
        axios
          .get(process.env.VUE_APP_ROOT_API + "/profil", { headers: auth })
          .then(response => {
            let userData = JSON.parse(response.data.data);
            this.user_id = userData.user.id;
          });
      } else {
        this.roles = "";
      }
    },
      getKelas() {
      axios
        .get(process.env.VUE_APP_BASE_API + "/kelas", { headers: this.auth })
        .then(response => {
          response.data.data.forEach(item => {
            this.kelasOption.push({
              key: item.id,
              label: item.masterKelas.kode_kelas,
              value: item
            });
          });
          //this.id_materi = item.id
        });
    },
     getTahunA() {
      axios
        .get(process.env.VUE_APP_BASE_API + "/tahun_akademik", { headers: this.auth })
        .then(response => {
          console.log(response.data.data);
          response.data.data.forEach(item => {
            this.materiOption.push({
              key: item.id,
              label: item.tahun_mulai,
              value: item
            });
          });
        });
    },
  }
}
</script>

<style lang="scss">
@mixin clearfix {
  &:before {
    display: table;
    content: '';
    clear: both;
  }

  &:after {
    display: table;
    content: '';
    clear: both;
  }
}

.main-article {
  padding: 20px;
  margin: 0 auto;
  display: block;
  width: 740px;
  background: #fff;
}

.article__heading {
  position: relative;
  padding: 0 0 20px;
  overflow: hidden;
}

.article__heading__title {
  display: block;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 32px;
  line-height: 48px;
  font-weight: 600;
  color: #333;
  overflow: hidden;
}

.node-article-content {
  margin: 20px 0 0;
  @include clearfix;
  font-size: 16px;
  color: #333;
  letter-spacing: 0.5px;
  line-height: 28px;
  margin-bottom: 30px;
  font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;

  &> :last-child {
    margin-bottom: 0;
  }

  b,
  strong {
    font-weight: inherit;
    font-weight: bolder;
  }

  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }

  p {
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;

  }

  ul {
    margin-bottom: 30px;
  }

  li {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;

    letter-spacing: .01rem;
    font-weight: 400;
    font-style: normal;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;
    margin-left: 30px;
    margin-bottom: 14px;
  }

  a {
    text-decoration: none;
    background-repeat: repeat-x;
    background-image: linear-gradient(to right, rgba(0, 0, 0, .84) 100%, rgba(0, 0, 0, 0) 0);
    background-size: 1px 1px;
    background-position: 0 calc(1em + 1px);
    padding: 0 6px;
  }

  code {
    background: rgba(0, 0, 0, .05);
    padding: 3px 4px;
    margin: 0 2px;
    font-size: 16px;
    display: inline-block;
  }

  img {
    border: 0;
  }

  /* 解决 IE6-7 图片缩放锯齿问题 */
  img {
    -ms-interpolation-mode: bicubic;
  }

  blockquote {
    --x-height-multiplier: 0.375;
    --baseline-multiplier: 0.17;
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
    letter-spacing: .01rem;
    font-weight: 400;
    font-style: italic;
    font-size: 21px;
    line-height: 1.58;
    letter-spacing: -.003em;
    border-left: 3px solid rgba(0, 0, 0, .84);
    padding-left: 20px;
    margin-left: -23px;
    padding-bottom: 2px;
  }

  a {
    text-decoration: none;
  }

  h2,
  h3,
  h4 {
    font-size: 34px;
    line-height: 1.15;
    letter-spacing: -.015em;
    margin: 53px 0 0;
  }

  h4 {
    font-size: 26px;
  }
}
</style>
