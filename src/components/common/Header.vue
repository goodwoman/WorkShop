<template>
  <div class="content">   
      <a-menu v-model="current" mode="horizontal" style="padding-left:-200px">
        <a-menu-item key="logo" class="logo"></a-menu-item>
        <a-menu-item key="heart"> <a-icon type="mail" />技术心得 </a-menu-item>
        <a-menu-item key="techlogy" > <a-icon type="appstore" />新技术 </a-menu-item>
        <a-menu-item key="policy" > <a-icon type="appstore" />公司政策</a-menu-item>
        <a-menu-item key="search"><a-input-search placeholder="input search text" enter-button @search="onSearch" class="searchinput"/></a-menu-item>
      <a-sub-menu>    
        <span slot="title" class="submenu-title-wrapper"
          ><a-icon type="menu-unfold" />写文章</span
        >       
          <a-menu-item key="setting:1">
            <a-icon type="edit" />写文章
          </a-menu-item>
          <a-menu-item key="setting:4">
            <a-icon type="user" />我的主页
          </a-menu-item>
          <a-menu-item key="setting:2">
            <a-icon type="like" />我赞过的
          </a-menu-item>      
          <a-menu-item key="setting:3">
            <a-icon type="message" />我的评论
          </a-menu-item>
          <a-menu-item key="setting:4">
            <a-icon type="star" />我的收藏
          </a-menu-item>      
      </a-sub-menu>
      <a-sub-menu v-if="true">    
        <span slot="title" class="submenu-title-wrapper"
          ><a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" style="color: #f56a00; backgroundColor: #fde3cf"/></span
        >       
          <a-menu-item key="setting:1">
            <a-icon type="setting" />设置
          </a-menu-item>
          <a-menu-item key="setting:4">
            <a-icon type="left-square" />退出登录
          </a-menu-item>  
      </a-sub-menu>
      <a-menu-item key="validate" v-if="false"><a href="#" style="color:red">登录</a></a-menu-item>
      <a-menu-item key="validate" v-if="false">|</a-menu-item>
      <a-menu-item key="validate" v-if="false"><a href="#" style="color:red">注册</a></a-menu-item>
    </a-menu>
    
  </div>
</template>

<script>
export default {
    data() {
    return {
      current: ['mail'],
    };
  },
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