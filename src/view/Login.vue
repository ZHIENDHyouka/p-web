<template>
  <div id="app">
    <div class="loginbackgroundImg" v-show="!showRegisterOrLogin">
      <el-form
          :rules="loginRules" ref="loginForm"
          class="loginContainer" :model="loginForm">
        <h3 class="loginTitle">登录</h3>
        <el-form-item prop="userAccount">
          <el-input type="text" placeholder="请输入账号" v-model="loginForm.userAccount"></el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="password" auto-complete="false"
                    placeholder="请输入密码" v-model="loginForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round style="margin-left: 80px; width: 100px" @click="login('loginForm')">登录
          </el-button>
          <el-link style="margin-left: 10px; color: cornflowerblue" @click="changeRegister">注册</el-link>
        </el-form-item>
      </el-form>
    </div>

    <div class="loginbackgroundImg" v-show="showRegisterOrLogin">
      <el-form ref="registerForm" class="loginContainer"
               :model="registerForm" :rules="registerRules">
        <h3 class="loginTitle">注册</h3>
        <el-form-item prop="userAccount">
          <el-input type="text" placeholder="请输入账号" v-model="registerForm.userAccount"></el-input>
        </el-form-item>
        <el-form-item prop="userPwd">
          <el-input type="password" auto-complete="false"
                    placeholder="请输入密码" v-model="registerForm.userPwd"></el-input>
        </el-form-item>
        <el-form-item prop="userName">
          <el-input auto-complete="false" type="text"
                    placeholder="请输入昵称" v-model="registerForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-radio v-model="registerForm.sex" label="1">男</el-radio>
          <el-radio v-model="registerForm.sex" label="0">女</el-radio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round style="margin-left: 80px; width: 100px" @click="register('registerForm')">注册
          </el-button>
          <el-link style="margin-left: 10px;color: cornflowerblue" @click="changeRegister">登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {login, register} from "@/utils/api";

export default {
  name: 'app',
  data() {
    return {
      showRegisterOrLogin: false,
      registerForm: {
        userAccount: '',
        userPwd: '',
        userName: '',
        sex: '',
      },
      loginForm: {
        userAccount: '',
        userPwd: '',
      },
      loginRules: {
        userAccount: [
          {required: true, message: '请输入账号', trigger: 'blur'},
        ],
        userPwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      },
      registerRules: {
        userAccount: [
          {required: true, message: '请输入账号', trigger: 'blur'},
        ],
        userPwd: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        sex: [
          { required: true, message: '请至少选择一个性别', trigger: 'change'},
        ],
      },
    }
  },
  methods: {
    changeRegister() {
      this.showRegisterOrLogin = !this.showRegisterOrLogin;
      this.clearRegisterForm();
      this.clearLoginForm();
    },
    login(loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          login(this.loginForm).then(res => {
            const message = res.msg;
            const code = res.code;
            this.returnInfo(message, code);
          })
          this.clearLoginForm();
        } else {
          return false;
        }
      });
    },
    register(registerForm) {
      console.log(this.registerForm);
      this.$refs[registerForm].validate((valid) => {
        if (valid) {
          register(this.registerForm).then((res) => {
            const message = res.msg;
            const code = res.code;
            const flag = this.returnInfo(message, code);
            if (flag) {
              this.changeRegister();
              this.loginForm.userAccount = this.registerForm.userAccount;
              this.loginForm.userPwd = this.registerForm.userPwd;
            }
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
      // this.showRegisterOrLogin=!this.showRegisterOrLogin;
    },
    clearLoginForm() {
      this.loginForm.userAccount = '';
      this.loginForm.userPwd = '';
    },
    clearRegisterForm() {
      this.registerForm.sex = '';
      this.registerForm.userAccount = '';
      this.registerForm.userName = '';
      this.registerForm.userPwd = '';
    },
    returnInfo(message, code) {
      if (code === 0) {
        this.$message.success(message);
        return true;
      } else {
        this.$message.error(message);
        return false;
      }
    }
  }
}
</script>

<style scoped>
.loginContainer {
  /*圆角*/
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background-color: rgba(85, 0, 0, 0);
  border: 1px solid azure;
  box-shadow: 0 0 25px rgba(222, 187, 195, 1);
  border-color: lavenderblush;
}

.loginTitle {
  margin: 0px auto 20px auto;
  text-align: center;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}

.loginbackgroundImg {
  width: 100%;
  height: 100%;
  /*background-image: url("img/dinner.jpg");*/
  /* background: lavenderblush; */
  /*使div占满整个屏幕*/
  position: fixed;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

/*input输入框变成透明*/
/deep/ .el-input__inner {
  background-color: transparent !important;
  border: 1px solid #1296db;
}

/*input { !*背景透明*! background-color: transparent; !*去边框*! border: 0; !*去外边框*! outline: none; !*文本颜色*! color: white; }*/


</style>
