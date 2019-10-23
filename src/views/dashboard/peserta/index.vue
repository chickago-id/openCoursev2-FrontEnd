<template>
    <div class="dashboard-editor-container">
      
      
      <h1>Peserta</h1>
      {{this.$store.state.permission.routes}}asdsa
      </div>
</template>

<script>

export default {
    name: 'DashboardPeserta',
    components: {
      
    },
    data() {
      return {
      //  lineChartData: lineChartData.siswa
      }
    },
    methods: {
      
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
