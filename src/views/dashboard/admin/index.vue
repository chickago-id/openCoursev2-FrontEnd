<template>
    <div class="dashboard-editor-container">
      <github-corner class="github-corner"/>
      
      <panel-group @handleSetLineChartData="handleSetLineChartData" />
      
      <el-row gutter="32">
          <el-col :xs="24" :sm="12" :lg="14">
            <div class="chart-wrapper">
              <line-chart :chart-data="lineChartData" />
            </div>
          </el-col>
           <el-col :xs="24" :sm="12" :lg="10">
            <div class="chart-wrapper">
              <pie-chart />
            </div>
          </el-col>
        </el-row>
        <el-row gutter="32">
          <el-col :xs="24" :sm="12" :lg="24">
            <div class="chart-wrapper">
              <bar-chart/>
            </div>
          </el-col>
        </el-row>
      <el-row :gutter="8">
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 48}" :xl="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
          <transaction-table />
        </el-col>
      </el-row>
    </div>
</template>

<script>
import panelGroup from './components/panelGrup'
import LineChart from './components/LineChart'
import TransactionTable from './components/TransactionTable'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

const lineChartData = {
  siswa: {
    expectedData: [40, 65, 45, 40, 50, 90, 35, 40, 65, 45, 40, 50],
    actualData: [61, 50, 30, 73, 86, 92, 57, 30, 73, 86, 92, 57]
  },
  kelas: {
    expectedData: [7, 10, 10, 5, 5, 6, 7, 1, 4, 9, 2, 8],
    actualData: [4, 10, 8, 3, 5, 9, 10, 8, 3, 5, 9, 10]
  },
  sertifikat: {
    expectedData: [25, 20, 15, 30, 35, 50, 40, 15, 30, 35, 50, 40],
    actualData: [17, 37, 22, 28, 42, 11, 61, 22, 28, 42, 11, 61]
  }
}


export default {
    name: 'DashboardAdmin',
    components: {
      panelGroup,
      LineChart,
      TransactionTable,
      PieChart,
      BarChart
    },
    data() {
      return {
        lineChartData: lineChartData.siswa
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
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

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    font-family:Arial, Helvetica, sans-serif
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
