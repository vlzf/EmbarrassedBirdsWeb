<template>
  <div class="login">
    <div class="box">
      <div class="title">Embarrassed Birds</div>
      <div class="content">
        <div class="tab">
          <a :class="{'active': isLogin}" @click="changeStatus">登录</a>
          <a :class="{'active': !isLogin}" @click="changeStatus">注册</a>
        </div>
        <div v-show="isLogin">
          <div class="row clear">
            <label>账号</label><input type="text" v-model="account1">
          </div>
          <div class="row clear">
            <label>密码</label><input type="password" v-model="password1">
          </div>
          <div class="row clear">
            <label></label><button class="comfirm" @click="loginClick">登录</button>
            <!-- <button class="forget">忘记密码</button> -->
          </div>  
        </div>
        <div v-show="!isLogin">
          <div class="row clear">
            <label>账号</label><input type="text" v-model="account2">
          </div>
          <div class="row clear">
            <label>密码</label><input type="password" v-model="password2">
          </div>
          <div class="row clear">
            <label>确认密码</label><input type="password" v-model="comfirmPassword2">
          </div>
          <div class="row clear">
            <label></label><button class="comfirm" @click="registerClick">注册</button>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isLogin: true,

      account1: '',
      password1: '',

      account2: '',
      password2: '',
      comfirmPassword2: '',
    }
  },
  methods: {
    changeStatus(){
      this.isLogin = !this.isLogin
    },
    loginClick(){
      let account1 = this.account1,
          password1 = this.password1
      if(!account1 || !password1) return
      /**
       * 登录请求
       */
      window.location.href = './personal.html'
    },
    registerClick(){
      let account2 = this.account2,
          password2 = this.password2,
          comfirmPassword2 = this.comfirmPassword2
      if(!account2 || !password2 || comfirmPassword2) return
      if(password2 !== comfirmPassword2) {
        alert('密码不正确')
      }
      /**
       * 注册请求
       */
      this.isLogin = true
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/base2.less";

.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../../../static/img/loginBg.jpg);
  background-size: 100% 100%;
  >.box {
    width: 100%;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.2s;
    border-radius: 4px;
    // box-shadow: 0 0 2px @ShadowColor1;
  }
}

.title {
  font-size: 50px;
  margin: 10px 0;
  text-align: center;
  color: #f1fefb;
  font-weight: bold;
  text-shadow: 0 0 50px @ThemeColor;
}

.content {
  width: 380px;
  background-color: white;
  margin: 0 auto;
  padding: 10px 0;
  border-radius: 3px;
}

div.row {
  margin-bottom: 15px;
  >label {
    display: inline-block;
    width: 30%;
    text-align: right;
    vertical-align: middle;
    margin: 0;
    padding-right: 5px;
  }
  >input {
    outline: none;
    background-color: inherit;
    border-bottom: 1px solid @ThemeColor;
    font-size: 16px;
    padding: 8px;
    vertical-align: middle;
    width: 60%;
    margin: 0;
    display: inline-block;
    &:focus {
      background-color: inherit;
    }
  }
  >button {
    width: 30%;
    cursor: pointer;
    outline: none;
    margin: 0;
    display: inline-block;
    transition: 0.2s;
    &.comfirm {
      padding: 5px 0;
      background: @ThemeColor;
      color: white;
    }
  }
}
.tab {
  text-align: center;
  margin-bottom: 20px;
  border-bottom: 1px solid @ShadowColor2;
  >a {
    cursor: pointer;
    display: inline-block;
    padding: 0 5px;
    line-height: 30px;
    position: relative;
    top: 2px;
    &.active {
      border-bottom: 2px solid @ThemeColor;
      color: @ThemeColor;
      &:hover {

      }
    }
  }
}
</style>

