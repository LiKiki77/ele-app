<template>
<div class="login">
    <div class="logo">
        <img src="../assets/logo.jpg" alt="my logo image">
    </div>
    <!-- 输入框 -->
    <!-- 手机号 -->
    <InputGroup 
        type="number" 
        v-model="phone" 
        placeholder="手机号" 
        :btnTitle="btnTitle" 
        :disabled="disabled" 
        :error="errors.phone"
        @btnClick="getVerifyCode"/>
    <!-- 验证码 -->
    <InputGroup type="number" v-model="verifyCode" placeholder="验证码" :error="errors.code" />
    <!-- 用户协议 -->
    <div class="login-des">
        <label for="license" class="checkbox">
            <input type="checkbox"  id="license" v-model="isLicense">
            <p>新用户登录即自动注册，同意
                <span>《用户服务协议》</span>
            </p>
        </label>
    </div>
    <!-- 登录按钮 -->
    <div class="login-btn">
        <button :disabled="isLicense" @click="handleLogin">登录</button>
    </div>
</div>
</template>

<script>
import InputGroup from '../components/InputGroup';
export default {
    name: "login",
    components: {
        InputGroup
    },
    data() {
        return {
            phone: "",
            verifyCode: "",
            errors: {},
            btnTitle: "获取验证码",
            disabled: false,
            isLicense: false
        }
    },
    methods:{
        handleLogin() {
            // 取消错误提醒
            this.errors = {};
            // 发送请求
            this.$axios
            .post("/api/posts/sms_back", {
                phone: this.phone,
                code: this.verifyCode
            })
            .then(res => {
                console.log(res.data);
                // 检验成功 设置登录状态并且跳转到/
                // localStorage.setItem("ele_login", res.data.user._id);
                // this.$router.push("/");
            })
            .catch(err => {
                // 返回错误信息
                this.errors = {
                    code: err.response
                };
            });
        },
        getVerifyCode(){
            if(this.validataPhone()){
                 this.validateBtn();
            } 
        },
        // 验证手机号码
        validataPhone(){
            if(!this.phone){
                this.errors = {
                    phone: "手机号码不能为空"
                };
                return false;
            } else if(!/^1[345678]\d{9}$/.test(this.phone)){
                this.errors = {
                    phone: "请填写正确的手机号码"
                };
                return false;
            } else {
                this.errors = {};
                return true;
            }
        },
        // 获取验证码
        validateBtn(){
            let time = 60;
            let timer = setInterval(() => {
                if(time == 0){
                    clearInterval(timer);
                    this.btnTitle = "获取验证码";
                    this.disabled = false;
                } else {
                    // 倒计时
                    this.btnTitle = time + "秒后重试";
                    this.disabled = true;
                    time--;
                }
            },1000)
        },
    }
}
</script>

<style lang="scss" scoped>
.login {
    width: 100%;
    height: 100%;
    padding: 30px;
    box-sizing: border-box;
    background: #fff;
    .logo {
        text-align: center;
        img {
            width: 150px;
        }
    }
    .text-group {
        margin-top: 20px;
    }
    .login-des {
        margin-top: 20px;
        .checkbox {
            margin-top: 5px;
            display: flex;
        }
        p {
            line-height: 22px;
            color: #aaa;
            span {
                color: #4d90fe;
            }
        }
    }
    .login-btn {
        margin-top: 20px;
        button {
            width: 100%;
            height: 40px;
            background-color: #8ab4f8;
            border-radius: 4px;
            font-size: 14px;
            color: #fff;
            border: none;
            outline: none;
        }
        button[disabled] {
            background-color: #4d90fe;
        }
    }
}
</style>