<template>
  
  <div>
    <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />
      
      <!-- <span class="hamburger-container">
        halo2
      </span> -->
    <div class="right-menu"> 
      <el-dropdown class="avatar-container" trigger="click">
        <div>
          <div class="avatar-wrapper">
          <avatar username="avatar" :src="avatar" :size="40" :rounded="false" class="user-avatar"></avatar>
          <!-- <img :src="avatar+'?url'" class="user-avatar"> -->
          <i class="el-icon-caret-bottom" />
        </div>
        </div>
        
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>
              Profil
            </el-dropdown-item>
          </router-link>
          <router-link to="#">
            <el-dropdown-item>
              Notification
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item class="logout" divided>
            <span style="display:block;" @click="logout">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="right-menu">
      <div class="kotak">
        <div class="username">{{username}}</div>
        <div class="roles">{{roles}}</div>
      </div> 
    </div>
    
  </div>
    <div class="container">
      <div class="run-text">
        <marquee-text repeat="1" duration="2" class="run">
              ini running text 
      </marquee-text>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import MarqueeText from 'vue-marquee-text-component'
import Avatar from 'vue-avatar'

export default {
  name: 'Helloword',
  components: {
    Breadcrumb,
    Hamburger,
    MarqueeText,
    'avatar': Avatar
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'username',
      'roles'
    ])
  },
  data(){
    return{
      url:'@/views/assets/logo/logo.png'
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .container{
    width: 100%;
    
  }
  .run-text{
    box-sizing: inherit;
      margin:auto;
      left: 30px;
    }
  .username{
    font-size: 24px;
    text-align: right;
  }
  .roles{
    font-size: 12px;
    text-align: right;
  }
  .kotak{
    box-sizing: border-box;
    display: inline-block;
    float: none;
    margin-top: 3px;
    margin-right: 5px;
    line-height: 24px;
  }
  .run{
    background: blue;
    float: right;
    position: relative;
    z-index: 5 !important;
    right: auto;
    margin: auto;
    width: 150px;

  }

  .logout{
    display: block;
    background: #2053b9;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 0px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
