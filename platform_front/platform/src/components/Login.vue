<template>
  <!-- class 属性，可以设置样式 -->
  <v-main><!--放到main组件里，避免组件和其他组件重叠-->
  <div class="login">
    <h1>登陆</h1>
    <v-text-field
      v-model="username"
      label="账号"
      outlined
      clearable
    ></v-text-field>
    <!-- type 是 html 的 inpu 的属性，可以设置为 password -->
    <v-text-field
      v-model="password"
      label="密码"
      outlined
      type="password"
      clearable 
    ></v-text-field>
    <v-btn depressed color="primary" @click="login()"> 登陆 </v-btn>
    <!-- @ 是 vue 的语法，将 click 事件绑定到一个函数  -->
    <v-btn depressed @click="goSignUp()"> 注册 </v-btn>
    <v-btn depressed @click="delToken()"> 清除token </v-btn>
  </div>
  </v-main><!--放到main组件里，避免组件和其他组件重叠-->
</template>
<script>
export default {
    // data 在vue 代表定义数据
    // data是函数，因为Vue中代表实例变量
    data() {
        return {username:"", password: "" }
    },

  // methods 代表声明一个函数
  methods: {
    login() {
        // let代表定义变量
        let loginData = {username: this.username, password: this.password};
        
        //使用vue实例中注册的api
        //.then 是axios的回调方法 获取返回结果
        // =>函数：se6函数，定义一个匿名函数,好处是使用当前环境
        this.$api.user.login(loginData).then(response=> {
            // localstorage是存储到浏览器中的一个数据，全局可用
            if (response.status == 200) {
              localStorage.setItem("token", response.data.access_token);
              this.$router.push({ name: "TestCase" })
            }
        });
        this.$api.testcase.getTestcase().then(response => {
            console.log(response);
        });
    },
    goSignUp() {
      // this.$router.push：把一个路由推入栈
      this.$router.push({ name: "SignUp" });
    },
    delToken() {
      localStorage.removeItem("token");
    }
  },
};
</script>
<style scoped>
/* .代表 class */
.login {
  /* 将长度规定为 500 */
  width: 500px;
  /* 将整个标签居中 */
  margin: 0 auto;
  /* 将文本和按钮居中 */
  text-align: center;
}
</style>