<template>
  <div class="content">   
      <a-menu  mode="horizontal" style="padding-left:-200px">
        <a-menu-item key="logo" class="logo"></a-menu-item>
        <a-menu-item key="heart" @click="getHeart"> <a-icon type="mail" />技术心得</a-menu-item>
        <a-menu-item key="techlogy" @click="getTech" > <a-icon type="appstore" />新技术 </a-menu-item>
        <a-menu-item key="policy" @click="getPolicy"> <a-icon type="appstore" />公司政策</a-menu-item>
        <a-menu-item key="search"><a-input-search placeholder="input search text" enter-button @keypress.native.enter="onSearch" class="searchinput" v-model="keywords"/></a-menu-item>
      <a-sub-menu>    
        <span slot="title" class="submenu-title-wrapper"
          ><a-icon type="menu-unfold" />写文章</span
        >       
          <a-menu-item key="setting:1">
            <a-icon type="edit" /><router-link to="/edit" tag="span">写文章</router-link>
          </a-menu-item>
          <a-menu-item key="setting:4">
            <a-icon type="user" /><router-link to="/home" tag="span">我的主页</router-link>
          </a-menu-item>
          <a-menu-item key="setting:2">
            <a-icon type="like" /><router-link to="/edit" tag="span">我赞过的</router-link>
          </a-menu-item>      
          <a-menu-item key="setting:3">
            <a-icon type="message" /><router-link to="/edit" tag="span">我的评论</router-link>
          </a-menu-item>
          <a-menu-item key="setting:4">
            <a-icon type="star" /><router-link to="/edit" tag="span">我的收藏</router-link>
          </a-menu-item>      
      </a-sub-menu>
      <a-sub-menu v-if="isLogin">    
        <span slot="title" class="submenu-title-wrapper">
          <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style="color: #f56a00; backgroundColor: #fde3cf"/>
          {{username}}
        </span>       
          <a-menu-item key="setting:1">
            <a-icon type="setting" />设置
          </a-menu-item>
          <a-menu-item key="setting:4" @click="loginOut">
            <a-icon type="left-square" />退出登录
          </a-menu-item>  
      </a-sub-menu>
      <a-menu-item key="validate" v-if="!isLogin" style="color:red"><router-link to="/login" tag="span">登录</router-link></a-menu-item>
      <a-menu-item key="validate" v-if="!isLogin" >|</a-menu-item>
      <a-menu-item key="validate" v-if="!isLogin" style="color:red"><router-link to="/register" tag="span">注册</router-link></a-menu-item>
      
    </a-menu>
    
  </div>
</template>

<script>
import {getHeartList,getTechologyList,getPolicyList,getkeywords,getAllList} from "../../api/manage"
export default {
    data() {
    return {
      // current: [''],
      keywords:"",
      isLogin:false ,
      username:""
    };
  },
  mounted(){
    console.log(sessionStorage.getItem("username"))
    this.isLogin = sessionStorage.getItem("accessToken") == "logined" ? true:false
    this.username = sessionStorage.getItem("username") == undefined ? "": sessionStorage.getItem("username")
    getAllList().then((res) =>{
      console.log(res)
      alert("AllList change")
      this.$store.commit('updateResultList',res.data.data);
    })
  },
  methods:{
    getHeart(){
      getHeartList().then(res => {
        alert("getHeart change")
        this.$store.commit('updateResultList',res.data.data.rows);
      })
      
    },
    getTech(){
      getTechologyList().then(res =>{
        alert("getTech change")
        this.$store.commit('updateResultList',res.data.data.rows);
      })
    },
    getPolicy(){
      getPolicyList().then(res => {
        alert("getPolicy change")
        this.$store.commit('updateResultList',res.data.data.rows);
      })
    },
    onSearch(){
      console.log("onsearch is running")
      let param = JSON.stringify({
        queryString:this.keywords
      });
      getkeywords(param).then((res) => {
        console.log(res);
        this.$store.commit("updateResultList",res.data.data)
      })

    },
    loginOut() {
      console.log("is loginout")
      this.isLogin = false
      sessionStorage.clear()
    }
  }
  
}
</script>

<style lang="less">
    .logo{
        width:120px;
        height:46px;
        margin-left: -200px;
        overflow: hidden;
        background-image: url("../../assets/logo/wpg.jpg");
        background-size: contain;
        background-repeat: no-repeat;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }
    .searchinput{
        line-height: 46px;
        vertical-align: center;
        margin: 6px;
    }
</style>