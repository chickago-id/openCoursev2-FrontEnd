<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item :key="item">
      <h3 class="medium">Halo</h3>
    </el-carousel-item>
    <el-carousel-item>
        ini satu
    </el-carousel-item>
    <el-carousel-item>
        ini 2
    </el-carousel-item>
    <el-carousel-item>
        ini 3
    </el-carousel-item>
    <el-carousel-item>
        ini empta
    </el-carousel-item>
  </el-carousel>
</template>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>