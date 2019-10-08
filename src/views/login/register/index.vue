
<template>
  <div class="container">
    <div role="group">

      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
        label-position="left">

        <div class="title-container">
          <h3 class="title">Sign Up</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input id="username" ref="username" v-model="loginForm.username" placeholder="Username" name="username"
            type="text" tabindex="1" auto-complete="on" />
        </el-form-item>
        <el-form-item prop="email"><span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input id="email" v-model="akun.email" type="email" placeholder="Mail@example.com"></el-input>

        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input id="password" :key="passwordType" ref="password" v-model="akun.password" :type="passwordType"
            placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input id="password2" :key="passwordType" ref="password" v-model="akun.password2" :type="passwordType"
            placeholder="Re-Password" name="password1" tabindex="2" auto-complete="on"
            @keyup.enter.native="handleLogin" />
        </el-form-item>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin">Sign Up</el-button>

      </el-form>
    </div>
  </div>
  <!-- kai -->
</template>

<script>

  import axios from 'axios'
  import {
    validUsername
  } from '@/utils/validate'


  export default {

    name: 'Login',
    data() {

      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        activeName: 'first',
        loginForm: {
          username: '',
          password: ''
        },
        akun: {
          domains: [{
            key: 1,
            value: ''
          }],
          email: ''
        },


        loginRules: {
          username: [{
            required: true,
            trigger: 'blur' /* , validator: validateUsername */
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.loading = true
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            let username = this.loginForm.username
            let password = this.loginForm.password
            th
is.$store.dispatch('user/login', {
                username,
                password
              })
              .then(() => this.$router.push('/'))
              .catch(err => console.log(err))
            this.loading = false
          } else {
            this.loading = false
            console.log('Anda gagal sign in')
            return false
          }
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  .el-tab-pane label {
    color: white;
  }

  .el-card {
    width: 440px;
    height: auto;
    padding: 20px;
    background: linear-gradient(rgb(255, 255, 255), #283443, #283443, #283443, #283443, #283443);
    position: fixed;
    top: 20%;
    left: 50%;
    margin-top: -120px;
    margin-left: -220px;
  }

  /* reset element-ui css */
  .container {
    padding: 8%;
    .el-input {
      display: inline-block;
      height: 35px;
      width: 55%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style lang="scss" scoped>
  $bg: transparent;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 60px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

</style>