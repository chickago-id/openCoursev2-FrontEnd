<template>
  
  <div>
    <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />
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
          <router-link to="/notification/index">
            <el-dropdown-item>
              <el-badge :value="12" class="item">
              Notification
              </el-badge>
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
    <div class="runbar">
      <div class="run">
        <div class="pass">
              ini running text 
        </div>
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
.runbar {
  height: 30px;
  overflow: hidden;
  position: relative;
  background: transparent;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .run{
    background: transparent;
    float: none;
    position: absolute;
    z-index: 5 !important;
    // margin-left: 10px;
    width: 100%;
    // max-width:400px;
  }
  .bounce {
    position: relative;
    width: auto;
    height: 100%;
    margin: 0;
    line-height: 40px;
    text-align: left;
    /* Apply animation to this element */	
    -moz-animation: bounce 5s linear infinite alternate;
    -webkit-animation: bounce 5s linear infinite alternate;
    animation: bounce 5s linear infinite alternate;
    }
    /* Move it (define the animation) */
    @-moz-keyframes bounce {
    0%   { -moz-transform: translateX(70%); }
    100% { -moz-transform: translateX(0%); }
    }
    @-webkit-keyframes bounce {
    0%   { -webkit-transform: translateX(70%); }
    100% { -webkit-transform: translateX(0%); }
    }
    @keyframes bounce {
    0%   { 
    -moz-transform: translateX(70%); /* Firefox bug fix */
    -webkit-transform: translateX(70%); /* Firefox bug fix */
    transform: translateX(70%); 		
    }
    100% { 
    -moz-transform: translateX(0%); /* Firefox bug fix */
    -webkit-transform: translateX(0%); /* Firefox bug fix */
    transform: translateX(0%); 
    }
  }
  .pass {
    font-size: 1em;
    color: auto;
    position: relative;
    width: auto;
    height: 100%;
    margin: 0;
    line-height: 30px;
    text-align: center;
    /* Starting position */
    -moz-transform:translateX(100%);
    -webkit-transform:translateX(100%);	
    transform:translateX(100%);
    /* Apply animation to this element */	
    -moz-animation: pass 15s linear infinite;
    -webkit-animation: pass 15s linear infinite;
    animation: pass 15s linear infinite;
    }
    /* Move it (define the animation) */
    @-moz-keyframes pass {
    0%   { -moz-transform: translateX(100%); }
    100% { -moz-transform: translateX(-100%); }
    }
    @-webkit-keyframes pass {
    0%   { -webkit-transform: translateX(100%); }
    100% { -webkit-transform: translateX(-100%); }
    }
    @keyframes pass {
    0%   { 
    -moz-transform: translateX(100%); /* Firefox bug fix */
    -webkit-transform: translateX(100%); /* Firefox bug fix */
    transform: translateX(100%); 		
    }
    100% { 
    -moz-transform: translateX(-100%); /* Firefox bug fix */
    -webkit-transform: translateX(-100%); /* Firefox bug fix */
    transform: translateX(-100%); 
    }
}
  
}
</style>
