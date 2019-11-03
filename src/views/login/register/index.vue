<template>
  <div>
    <div class="title-container">
      <h1 style="text-align: center;">Sign Up</h1>
      <h5 style="text-align: center;">to continue to application</h5>
    </div>
    <el-form ref="form" :model="form" status-icon class="demo-form" :rules="regisVal">
      <el-form-item prop="username">
        <label class="inputkeren">
          <input v-model="form.username" type="text" placeholder=" " autocomplete="off">
          <span>Username</span>
        </label>
      </el-form-item>
      <el-form-item required="" prop="email">
        <label class="inputkeren">
          <input v-model="form.email" type="email" placeholder=" " autocomplete="off">
          <span>Email</span>
        </label>
      </el-form-item>
      <el-form-item prop="password">
        <label class="inputkeren">
          <input :key="passwordType" v-model="form.password" :type="passwordType" placeholder=" " autocomplete="off">
          <span>Password</span>
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </label>
      </el-form-item>
      <el-form-item prop="password2">
        <label class="inputkeren">
          <input
            :key="passwordType"
            v-model="form.password2"
            :type="passwordType"
            placeholder=" "
            autocomplete="off"
          >
          <span>Re-Password</span>
        </label>
      </el-form-item>
    </el-form>
    <span>
      <el-button @click="clearData">Cancel</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="submitForm('form')"
      >Confirm</el-button>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  computed: {
    ...mapGetters(['token', 'username', 'roles'])
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (value.length < 6) {
        callback(new Error('The password must more than 6 digits'))
      } else {
        if (this.form.password2 !== '') {
          this.$refs.form.validateField('password2')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== this.form.password) {
        callback(new Error('Two inputs don\'t match!'))
      } else {
        callback()
      }
    }
    return {
      msg: '',
      list: null,
      listLoading: true,
      listData: [],
      password2: '',
      form: {
        username: '',
        email: '',
        password: ''
      },
      regisVal: {
        username: [
          { required: true, message: 'Please input username', trigger: 'blur' },
          { min: 3, max: 8, message: 'Length should be 3 to 8', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      loading: false,
      passwordType: 'password'
    }
  },
  mounted() {

  },
  methods: {

    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.addData()
          // this.successNotif();
        } else {
          this.gagalNotif()
          console.log('error submit!!')
          return false
        }
      })
    },
    handleClick(tab, event) {
      console.log(tab, event)
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
    successNotif() {
      const h = this.$createElement
      this.$notify({
        title: 'Success',
        message: h(
          'i',
          { style: 'color: teal' },
          'Create Account Success'
        ),
        type: 'success',
        showClose: false,
        duration: 2000
      })
    },
    gagalNotif() {
      const h = this.$createElement
      this.$notify({
        title: 'Failed',
        message: h(
          'i',
          { style: 'color: teal' },
          this.msg
        ),
        type: 'info',
        showClose: false,
        duration: 2000
      })
    },
    clearData() {
      this.form.username = ''
      this.form.email = ''
      this.form.password = ''
      this.form.password2 = ''
    },
    addData() {
      const token = 'Bearer ' + localStorage.getItem('token')
      const auth = {
        Authorization: token,
        'Content-Type': 'application/json'
      }
      console.log(token)
      if (this.form.username !== '' && this.form.email !== '' && this.form.password !== '') {
        axios
          .post(
            process.env.VUE_APP_BASE_API +
              '/buat-akun',
            this.form,
            { headers: auth }
          )
          .then(data => {
            this.loading = true
            console.log(data.data.message)
            if (data.data.status === 'error') {
              this.msg = data.data.message
              this.gagalNotif()
              this.loading = false
            } else {
              // this.getData()
              this.successNotif()
              this.clearData()
              this.loading = false
            }
            /* if(data.data.status === 'error') {
              alert(data.data.message)
            }
            this.getData();
            this.successNotif();
            this.clearData(); */
            this.dialogFormVisible = false
          })
      } else {
        this.gagalNotif()
        this.loading = false
      }
    }

  }
}
</script>
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
</style>
