<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { relative } from 'path'

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
    // position:{
    //   type:Object,
    //   default:relative
    // },
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
        text: 'Rekap Jumlah Kelas Berdasarkan Jenis Kelas',
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
            data: [6, 4, 3, 5, 0, 5, 3, 4, 0, 0, 0, 0]
        },
        {
            name: 'Privat',
            type: 'bar',
            data: [6, 12, 7, 3, 10, 6, 14, 10, 0, 0, 0, 0]
        },
        {
            name: 'Sertifikasi',
            type: 'bar',
            data: [2, 2, 1, 1, 0, 1, 5, 0, 0, 0, 0, 0]
        },
        {
            name: 'Rombel',
            type: 'bar',
            data: [0, 1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0]
        },
        {
            name: 'Profesi',
            type: 'bar',
            data: [1, 0, 0, 1, 0, 0, 0, 0, 0, 0]
        }
    ]
      })
    }
  }
}
</script>
