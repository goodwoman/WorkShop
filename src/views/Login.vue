<template>
  <div class="content">
      <a-form :form="form" @submit="handleSubmit" style="margin:100px auto;width:700px">
        <a-form-item v-bind="formItemLayout" label="Phone Number" style="margin-top:50px">
        <a-input v-model="phone"
            v-decorator="[
            'phone',
            {
                rules: [{ required: true, message: 'Please input your phone number!' }],
            },
            ]"
            style="width: 100%;"
        >
            <a-select
            slot="addonBefore"
            v-decorator="['prefix', { initialValue: '86' }]"
            style="width: 70px"
            >
            <a-select-option value="86">
                +86
            </a-select-option>
            <a-select-option value="87">
                +87
            </a-select-option>
            </a-select>
        </a-input>
        </a-form-item>
        <a-form-item
        v-bind="formItemLayout"
        label="Captcha"
        extra="We must make sure that your are a human."
        >
        <a-row :gutter="8">
            <a-col :span="12">
            <a-input v-model="captcha"
                v-decorator="[
                'captcha',
                { rules: [{ required: true, message: 'Please input the captcha you got!' }] },
                ]"
            />
            </a-col>
            <a-col :span="12">
            <a-button @click="getCaptcha" :disabled="isdisabledFn">Get captcha</a-button>
            </a-col>
        </a-row>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
        <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
            I have read the
            <a href="">
            agreement
            </a>
        </a-checkbox>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
        <a-button type="primary" html-type="submit">
            Login
        </a-button>
        </a-form-item>
  </a-form>
  </div>
</template>

<script>
import {login,getYzm} from "../api/login"
import notification from 'ant-design-vue/es/notification';
export default {
  data() {
    return {
        phone:"",
        captcha:"",
        isdisabledFn:false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          login(this.phone,this.captcha).then(res => {
              if(res.msg == "ok"){
                sessionStorage.setItem('accessToken' , 写入登录成功返回的登录令牌或者自定义的判断字符串) 
                this.$router.push("/")
              }
              else{
                  notification.error({
                    message: '登录失败',
                    description: '验证码不正确，请确认后重新输入',
                });
              }              
          })
        }
      });

    },
    getCaptcha(){
      console.log("getCaptcha is running")
      console.log(this.phone)
      if(this.phone == null || this.phone == ""){
          console.log("请输入正确的手机号")
          notification.error({
            message: '输入失败',
            description: '请输入正确的手机号',
        });
      }else{
          getYzm(this.phone).then(res =>{
              if(res.msg == "ok")
                this.isdisabledFn = true;
          })
      }
    },
  },
  
};
</script>
<style>
</style>