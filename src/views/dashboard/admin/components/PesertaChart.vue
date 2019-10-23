<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: Boolean,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
         title: {
        text: 'Rekap Peserta Berdasarkan Jumlah Kelas',
        subtext: ''
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {}
        }
    },
    legend: {
        data: ['Intensif', 'Privat', 'Sertifikasi', 'Rombel', 'Profesi']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['Januari','Februari','Maret','April','Mei','Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    series: [
        {
            name: 'Intensif',
            type: 'bar',
            data: [27, 13, 13, 16, 0, 14, 11, 14, 0, 0, 0, 0]
        },
        {
            name: 'Privat',
            type: 'bar',
            data: [7, 12, 7, 3, 12, 6, 15, 10, 0, 0, 0, 0]
        },
        {
            name: 'Sertifikasi',
            type: 'bar',
            data: [24, 31, 18, 1, 0, 1, 105, 0, 0, 0, 0, 0]
        },
        {
            name: 'Rombel',
            type: 'bar',
            data: [0, 5, 28, 0, 0, 20, 4, 0, 0, 0, 0, 0]
        },
        {
            name: 'Profesi',
            type: 'bar',
            data: [5, 0, 0, 7, 0, 0, 0, 0, 0, 0]
        }
    ]
      })
    }
  }
}
</script>
