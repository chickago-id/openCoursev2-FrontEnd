<template>
  <el-card class="container" style="background: #ccc">
    <el-row>
      <el-col :xs="0" :sm="1" :md="1" :lg="2" :xl="4">
        <div class="">&nbsp;</div>
      </el-col>

      <el-col :xs="24" :sm="11" :md="11" :lg="10" :xl="8">
        <div class="grid-contentbg-purple-light asd" style="background: #fff; height: 650px; padding: 60px;">
          <el-tabs :tab-position="tabPosition" style="height: 200px;">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-login" /> Sign in instead</span>
              <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="form"
                auto-complete="on"
                label-position="left"
                style=""
              >

                <div style="text-align: center">
                  <i><img src="http://alfabanksemarang.com/downlot.php?file=LOGO1.png" alt="" style="width: 200px;"></i>
                  <h2>Sign In</h2>
                  <p>to continue to Application</p>
                </div>
                <el-form-item prop="username">
                  <label class="inputkeren">
                    <input
                      ref="username"
                      v-model="loginForm.username"
                      type="text"
                      placeholder=" "
                      name="username"
                      tabindex="1"
                      auto-complete="on"
                    >
                    <span>Username</span>
                  </label>
                </el-form-item>
                <el-form-item prop="password">
                  <label class="inputkeren">
                    <input
                      :key="passwordType"
                      ref="password"
                      v-model="loginForm.password"
                      :type="passwordType"
                      placeholder=" "
                      name="password"
                      tabindex="2"
                      auto-complete="on"
                      autocomplete="on"

                      @keyup.enter="handleLogin"
                     
                    >

                    <span>Password</span>
                    <span class="show-pwd" @click="showPwd">
                      <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                    </span>
                  </label>
                </el-form-item>
                <br>
                <el-row>
                  <el-col :span="2" :xs="0">&nbsp;</el-col>
                  <el-col :span="11" :xs="24">
                    <el-button
                      :loading="loading"
                      type="primary"
                      style="background: ;border-radius: 5px; width: 100%;margin-bottom:30px;"
                      @click.native.prevent="handleLogin"
                    >Sign In</el-button></el-col>
                  <el-col :span="3" :xs="24" style="padding-top: 10px; text-align: center; color: #666666;  ">or</el-col>

                  <el-col :span="8" :xs="24">
                    <el-container style="text-align: center;">
                      <a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSvKQW20ZCh1MWqgO7jZvWCAvvVtXBqet-n6QCpm8A3ZtckpWil" alt="" style="height:40px;  float: left; "></a>
                    &nbsp; &nbsp;
                      <a href="#"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Facebook_circle_pictogram.svg/512px-Facebook_circle_pictogram.svg.png" alt="" style="height: 42px;  float: right"></a>

                    </el-container>
                  </el-col>
                </el-row>
                <div class="tips" />
              </el-form>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label"><i class="el-icon-out" /> Create Account</span>
              <register />
            </el-tab-pane>
          </el-tabs>

        </div>
      </el-col>
      <el-col :xs="24" :sm="11" :md="11" :lg="10" :xl="8">
        <div class="grid-content bg-purple" style="color: white;">
          <div class="block">
            <el-carousel height="650px" width="300px">
              <el-carousel-item v-for="items in info" :key="items.id">

                <img :src="items.image" alt="Snow" style="width:100%; height: 100%;">
                <div class="top-left">
                  <h2>
                    <b>{{ items.subject }}</b></h2>
                </div>
                <div class="bottom-right">
                  {{ items.bodymessage }}
                  <a href="#"><b><u>Read More</u></b></a>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </el-col>

      <el-col :xs="0" :sm="1" :md="1" :lg="2" :xl="4">
        <div class="grid-content bg-purple-light">&nbsp;</div>
      </el-col>
    </el-row>

  </el-card>
  <!-- Kai -->
</template>

<script>
import axios from 'axios'
import register from '@/views/login/register'

import 'themify-icons-scss/scss/themify-icons.scss'

// import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  components: {
    register
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please input username'))
      } else if (value.length < 3) {
        callback(new Error('The username can not be less than 3 digits'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('please input password'))
      } else if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      info: [],
      msg: '',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{
          required: true,
          trigger: 'blur',
          validator: validateUsername
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
      tabPosition: 'top',
      otherQuery: {},
      showDialog: false
    }
  },
  computed: {
    status() {
      return this.$store.getters.authStatus
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          // this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getCarousel()
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
    gagalNotif() {
      const h = this.$createElement
      this.$notify({
        message: h(
          'i',
          { style: 'color: red' },
          'Username atau password salah',
        ),
        type: 'error',
        showClose: false,
        duration: 2000
      })
      this.loading = false
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch((err) => {
              this.msg = err
              this.gagalNotif()
            })
        } else {
          this.msg = 'error submit!!'
          this.gagalNotif()
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    getCarousel() {
      this.listLoading = true
      axios.get(process.env.VUE_APP_BASE_API + '/mailbox/carousel')
        .then(response => (this.info = response.data.data))
      console.log(this.info)
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
    background-color: #86afdd;
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

  /* Container holding the image and the text */
.container {
  position: relative;
  text-align: center;
  // color: white;
}

/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
}

/* Top left text */
.top-left {
  position: absolute;
  top: 40%;
   right: 16px;
  left: 16px;
}

/* Top right text */
.top-right {
  position: absolute;
  top: 35%;
  right: 16px;
}

/* Bottom right text */
.bottom-right {
  position: absolute;
  bottom: 30px;
  left: 16px;
  right: 16px;
}

/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  // padding: 50%;
  left: 50%;
  // transform: translate(-50%, -50%);
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
    line-height: 1.5;
    overflow: hidden;
  }

  /* Input, Textarea */
  .inputkeren>input,
  .inputkeren>textarea {
    box-sizing: border-box;
    margin: 0;
    border: solid 1px #dddddd;
    /* border-color: red; */
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
