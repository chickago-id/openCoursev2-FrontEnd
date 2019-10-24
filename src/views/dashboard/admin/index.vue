<template>
    <div class="dashboard-editor-container">
      <github-corner class="github-corner"/>
      
      <DataView/>
      <!-- untuk ref ke halaman yang dituju (belum fungsi) -->
      <div class="collapsible">
        <div class="source">
          <el-row :gutter="32">
          
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-col :xs="24" :sm="12" :lg="12">
              <el-collapse-item title="Periode" name="1">
                <div class="chart-wrapper">
                  <LineChart/>
                  <!-- untuk lihat total vs Periode -->
                </div>
              </el-collapse-item>
            </el-col>
            
            <el-col :xs="24" :sm="12" :lg="12">
              <el-collapse-item title="Kelas" name="2">
                <div class="chart-wrapper">
                  <TipeChart/>
                  <!-- untuk lihat kelas vs peserta -->
                </div>
              </el-collapse-item>
            </el-col>
          </el-collapse>
         
        </el-row>
         </div>
        
      </div>
      
     <el-row gutter="32">
          <el-col :xs="24" :sm="12" :lg="24">
            <div class="chart-wrapper">
                <BarChart/> 
                <!-- untuk lihat rekap jumlah kelas -->
                <PesertaChart/>
                <!-- untuk lihat rekap peserta -->
            </div>
          </el-col>
        </el-row>
      <el-row :gutter="32">
          <!-- <el-col :xs="24" :sm="12" :lg="14">
            <div class="chart-wrapper">
              <line-chart :chart-data="lineChartData" />
            </div>
          </el-col> -->
           <el-col :xs="24" :sm="12" :lg="24">
            <div class="chart-wrapper">
              <pie-chart />
              <!-- diagram banyaknya peserta berdasarkan kelas -->
            </div>
          </el-col>
        </el-row>
        
      <el-row :gutter="8">
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 48}" :xl="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
          <transaction-table />
          <!-- daftar nama siswa -->
        </el-col>
      </el-row>
    </div>
</template>

<script>
// import panelGroup from './components/panelGrup' << gak dipake di hapus saja
// import panGroup from './components/panGrup'<< gak dipake
import DataView from './components/DataView'
import LineChart from './components/LineChart'
import TipeChart from './components/ClassTypeChart'
import TransactionTable from './components/TransactionTable'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import PesertaChart from './components/PesertaChart'
import { log } from 'util'

const lineChartData = {
  periodic: {
    jumlahKelas: [15, 19, 14, 10, 10, 13, 23, 14, 0, 0, 0, 0],
    jumlahPeserta: [63, 61, 66, 27, 12, 41, 135, 24, 0, 0, 0, 0]
  },
  tipe: {
    totalKelas: [30, 68, 12, 6, 2],
    totalPeserta: [108, 72, 180, 57, 12]
  },
  sertifikat: {
    expectedData: [25, 20, 15, 30, 35, 50, 40, 15, 30, 35, 50, 40],
    actualData: [17, 37, 22, 28, 42, 11, 61, 22, 28, 42, 11, 61]
  }
}


export default {
    name: 'DashboardAdmin',
    components: {
      // panelGroup, << gak dipake
      // panGroup, << gak dipake
      DataView,
      LineChart,
      TipeChart,
      TransactionTable,
      PieChart,
      BarChart,
      PesertaChart
    },
    data() {
      return {
        lineChartData: lineChartData.periodic,
        activeNames: ['1','2'],
        activeName: 'satu',
        tabPosition: 'top'
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },
      handleTipeChartData(type) {
        this.lineChartData = lineChartData[type]
      },
      handleChange(val){
        console.log(val);
        
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 12px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .collapsible {
    background-color: transparent;
    color: transparent;
    cursor: pointer;  
    padding-bottom: 18px;
    width: 100%;
    border: none;
    text-align: center;
    outline: none;
    font-size: 15px;
  }


  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    font-family:Arial, Helvetica, sans-serif
  }

  .source{
    background: #fff;
    border-bottom: 5px solid white;
    padding-right: 18px;
    padding-left: 18px;
    
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
