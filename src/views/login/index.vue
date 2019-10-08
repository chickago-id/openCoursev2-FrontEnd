
<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :xs="0" :sm="2" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple">&nbsp;</div>
      </el-col>
      <el-col :xs="12" :sm="10" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple-light">
          <el-tabs :tab-position="tabPosition" style="height: 200px;">
            <el-tab-pane>
              <span slot="label" style="color: white"><i class="el-icon-login"></i> Sign In</span>
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="form" auto-complete="on"
                label-position="left">

                <div class="title-container">
                  <h3 class="title">Sign In</h3>
                </div>
                <el-form-item prop="username">
                  <span class="svg-container">
                    <svg-icon icon-class="user" />
                  </span>
                  <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username"
                    type="text" tabindex="1" auto-complete="on" />
                </el-form-item>
                <el-form-item prop="password">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                    placeholder="Password" name="password" tabindex="2" auto-complete="on"
                    @keyup.enter.native="handleLogin" />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </el-form-item>
                <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                  @click.native.prevent="handleLogin">Login</el-button>
                <div class="tips">
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label" style="color: white"><i class="el-icon-out"></i> Sign Up</span>
              <register />
            </el-tab-pane>
          </el-tabs>

        </div>
      </el-col>
      <el-col :xs="12" :sm="10" :md="8" :lg="9" :xl="11">
        <div class="grid-content bg-purple">
          <div class="block">
            <el-carousel height="690px" width="300p">
              <el-carousel-item v-for="item in 4" :key="item">
                <p>Corousal slider img</p>
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      <el-col :xs="0" :sm="2" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple-light">&nbsp;</div>
      </el-col>
    </el-row>

  </div>
<!-- KAI -->
</template>

<script>
  import axios from 'axios'
  import register from "@/views/login/register"

  import {
    validUsername
  } from '@/utils/validate'
  export default {
    name: 'Login',
    components: {
      register
    },
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
        loginForm: {
          username: '',
          password: ''
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
        redirect: undefined,
tabPosition: 'top'

      }
    },
    computed: {
      status() {
        return this.$store.getters.authStatus;
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

      login() {
        let username = this.username
        let password = this.password
        this.$store.dispatch('login', {
            username,
            password
          })
          .then(() => {
            // this.$router.push('/fill')
            this.ceklengkap()
            this.hideModal()
          })
          .catch(err => console.log(err))
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          console.log(this.loginForm.username)
          if (valid) {

            let username = this.loginForm.username
            let password = this.loginForm.password
            console.log(username)

            this.$store.dispatch('user/login', {
                username,
                password
              })
              .then(() => this.$router.push('/'))
              .catch(err => console.log(err))

            /* this.$store.dispatch('login', this.loginForm)
            .then(() => this.$router.push('/'))
            .catch((err) => {
              console.log(err)
              this.loading = false
            }) */

            /* this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            }).catch(() => {
              this.loading = false
            }) */
          } else {
            console.log('Errror boskuu')
            return false
          }
        })
      },
      ceklengkap() {
        const token = 'Bearer ' + localStorage.getItem('token')
        const ndas = {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
        axios.get(process.env.VUE_APP_BASE_API + '/profil', {
            headers: ndas
          })
          .then(response => {
            // console.log(response.data)
            // var baru = JSON.parse(response.data)
            // console.log(JSON.parse(response.data.data))
            let lengkapi = JSON.parse(response.data.data)
            console.log(lengkapi)
            if (lengkapi.alamat != null) {
              console.log('isi')
              // window.location = '/'
              this.$router.push('/afterlogin')
            } else {
              console.log('kosong isi')
              // window.location = '/'
              // window.location = this.$router.push('/fill')
              this.$router.push('/fill')
            }
          })
      }
    }
  }

</script>
<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .container {
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
  $bg:#2d3a4b;
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
      padding: 50px 35px 0;
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

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

</style>