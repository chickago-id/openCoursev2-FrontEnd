<template>
  <el-card class="container" style="background: #ccc">
    <el-row >
      <el-col :xs="0" :sm="1" :md="4" :lg="3" :xl="1">
        <div class="">&nbsp;</div>
      </el-col>
     
      <el-col :xs="24" :sm="11" :md="8" :lg="9" :xl="11" :span="24" >
        <div class="grid-content bg-purple-light asd" style="background: #fff; height: 650px; padding: 60px;">
          <el-tabs :tab-position="tabPosition" style="height: 200px;">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-login"></i> Sign in instead</span>
              <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="form" auto-complete="on"
                label-position="left" style="">

                <div style="text-align: center">
                  <i><img src="http://alfabanksemarang.com/downlot.php?file=LOGO1.png" alt="" style="width: 250px;"></i>
                  <h2>Sign In</h2>
                  <p>to continue to Application</p>
                </div>
                <el-form-item prop="username">
                  <label class="inputkeren">
                    <input type="text" placeholder=" " ref="username" v-model="loginForm.username" name="username"
                      tabindex="1" auto-complete="on">
                    <span>Username</span>
                  </label>
                </el-form-item>
                <el-form-item prop="password">
                  <label class="inputkeren">
                    <input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
                      placeholder=" " name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin">
                    <span>Password</span>
                    <span class="show-pwd" @click="showPwd">
                      <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                  </label>
                </el-form-item>
                <br>
                <el-row >
                  <el-col :span="13">
                    <el-button :loading="loading" type="primary" style="background: ;border-radius: 30px; width: 100%;margin-bottom:30px;"
                  @click.native.prevent="handleLogin">Sign In</el-button></el-col>
                  <el-col :span="3" style="padding-top: 10px; text-align: center; color: #666666;  " >or</el-col>
                  <el-col :span="8" style="">
                    <el-container>
                    <a href="#" ><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvKQW20ZCh1MWqgO7jZvWCAvvVtXBqet-n6QCpm8A3ZtckpWil" alt="" style="height:40px;  float: left; " ></a>
                    &nbsp; &nbsp;
                  <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Facebook_circle_pictogram.svg/512px-Facebook_circle_pictogram.svg.png" alt=""  style="height: 42px;  float: right" ></a>
                   </el-container>
                  </el-col>
                </el-row>
                <div class="tips">
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="el-icon-out"></i> Create Account</span>
              <register />
            </el-tab-pane>
          </el-tabs>

        </div>
      </el-col>
       <el-col :xs="24" :sm="11" :md="8" :lg="9" :xl="11" :span="24" offse="24" >
        <div class="grid-content bg-purple">
          <div class="block">
            <el-carousel height="650px" width="300px">
              <el-carousel-item v-for="item in 4" :key="item">
                
            
                <h3 class="small" style="text-align: center; margin-bottom:30px;">{{ item }}</h3>
                    <h3 class="small" style="text-align: center; bottom:30px;">Subject</h3>
                
                    <p style="text-align: left; bottom: 50px; left: 8%; position: absolute;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores debitis voluptas veritatis dolorum accusamus perferendis blanditiis molestiae deleniti quos, odit alias id omnis doloremque necessitatibus nemo <a style="color: blue;" href="#">Read More</a></p>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>
      
      <el-col :xs="0" :sm="1" :md="4" :lg="3" :xl="1">
        <div class="grid-content bg-purple-light">&nbsp;</div>
      </el-col>
    </el-row>

  </el-card>
  <!-- Kai -->
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

<style lang="scss" scoped>
  $bg:#d8d8d8;
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
      padding: 2px 0px 0;
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
      top: 25px;
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

  .grid-contents {
    border-radius: 4px;
    min-height: 36px;
  }

  .asd {
    // padding: 25px;
  }

</style>




<style>
  input[type="password"]::-ms-reveal {
    display: none;
  }

  .inputkeren {
    --pure-material-safari-helper1: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    position: relative;
    display: block;
    padding-top: 6px;
    font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
    font-size: 16px;
    line-height: 1.0;
    overflow: hidden;
  }

  /* Input, Textarea */
  .inputkeren>input,
  .inputkeren>textarea {
    box-sizing: border-box;
    margin: 0;
    border: solid 1px red;
    /* Safari */
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    border-top-color: transparent;
    border-radius: 4px;
    padding: 15px 13px 15px;
    width: 100%;
    height: inherit;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
    background-color: transparent;
    box-shadow: none;
    /* Firefox */
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    caret-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    transition: border 0.2s, box-shadow 0.2s;
  }

  /* Span */
  .inputkeren>input+span,
  .inputkeren>textarea+span {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    width: 100%;
    max-height: 100%;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    font-size: 75%;
    line-height: 15px;
    cursor: text;
    transition: color 0.2s, font-size 0.2s, line-height 0.2s;
  }

  /* Corners */
  .inputkeren>input+span::before,
  .inputkeren>input+span::after,
  .inputkeren>textarea+span::before,
  .inputkeren>textarea+span::after {
    content: "";
    display: block;
    box-sizing: border-box;
    margin-top: 6px;
    border-top: solid 1px;
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
    min-width: 10px;
    height: 8px;
    pointer-events: none;
    box-shadow: inset 0 1px transparent;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .inputkeren>input+span::before,
  .inputkeren>textarea+span::before {
    margin-right: 4px;
    border-left: solid 1px transparent;
    border-radius: 4px 0;
  }

  .inputkeren>input+span::after,
  .inputkeren>textarea+span::after {
    flex-grow: 1;
    margin-left: 4px;
    border-right: solid 1px transparent;
    border-radius: 0 4px;
  }

  /* Hover */
  .inputkeren:hover>input,
  .inputkeren:hover>textarea {
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
    border-top-color: transparent;
  }

  .inputkeren:hover>input+span::before,
  .inputkeren:hover>textarea+span::before,
  .inputkeren:hover>input+span::after,
  .inputkeren:hover>textarea+span::after {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
  }

  .inputkeren:hover>input:not(:focus):placeholder-shown,
  .inputkeren:hover>textarea:not(:focus):placeholder-shown {
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
  }

  /* Placeholder-shown */
  .inputkeren>input:not(:focus):placeholder-shown,
  .inputkeren>textarea:not(:focus):placeholder-shown {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.6);
  }

  .inputkeren>input:not(:focus):placeholder-shown+span,
  .inputkeren>textarea:not(:focus):placeholder-shown+span {
    font-size: inherit;
    line-height: 68px;
  }

  .inputkeren>input:not(:focus):placeholder-shown+span::before,
  .inputkeren>textarea:not(:focus):placeholder-shown+span::before,
  .inputkeren>input:not(:focus):placeholder-shown+span::after,
  .inputkeren>textarea:not(:focus):placeholder-shown+span::after {
    border-top-color: transparent;
  }

  /* Focus */
  .inputkeren>input:focus,
  .inputkeren>textarea:focus {
    border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    border-top-color: transparent;
    box-shadow: inset 1px 0 var(--pure-material-safari-helper1), inset -1px 0 var(--pure-material-safari-helper1), inset 0 -1px var(--pure-material-safari-helper1);
    outline: none;
  }

  .inputkeren>input:focus+span,
  .inputkeren>textarea:focus+span {
    color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
  }

  .inputkeren>input:focus+span::before,
  .inputkeren>input:focus+span::after,
  .inputkeren>textarea:focus+span::before,
  .inputkeren>textarea:focus+span::after {
    border-top-color: var(--pure-material-safari-helper1) !important;
    box-shadow: inset 0 1px var(--pure-material-safari-helper1);
  }

  /* Disabled */
  .inputkeren>input:disabled,
  .inputkeren>input:disabled+span,
  .inputkeren>textarea:disabled,
  .inputkeren>textarea:disabled+span {
    border-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
    border-top-color: transparent !important;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
    pointer-events: none;
  }

  .inputkeren>input:disabled+span::before,
  .inputkeren>input:disabled+span::after,
  .inputkeren>textarea:disabled+span::before,
  .inputkeren>textarea:disabled+span::after {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
  }

  .inputkeren>input:disabled:placeholder-shown,
  .inputkeren>input:disabled:placeholder-shown+span,
  .inputkeren>textarea:disabled:placeholder-shown,
  .inputkeren>textarea:disabled:placeholder-shown+span {
    border-top-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38) !important;
  }

  .inputkeren>input:disabled:placeholder-shown+span::before,
  .inputkeren>input:disabled:placeholder-shown+span::after,
  .inputkeren>textarea:disabled:placeholder-shown+span::before,
  .inputkeren>textarea:disabled:placeholder-shown+span::after {
    border-top-color: transparent !important;
  }

  /* Faster transition in Safari for less noticable fractional font-size issue */
  @media not all and (min-resolution:.001dpcm) {
    @supports (-webkit-appearance:none) {

      .inputkeren>input,
      .inputkeren>input+span,
      .inputkeren>textarea,
      .inputkeren>textarea+span,
      .inputkeren>input+span::before,
      .inputkeren>input+span::after,
      .inputkeren>textarea+span::before,
      .inputkeren>textarea+span::after {
        transition-duration: 0.1s;
      }
    }
  }

</style>
