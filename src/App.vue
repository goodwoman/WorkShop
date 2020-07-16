<template>
  <div id="app">
    <!-- <ArticleDetail></ArticleDetail> -->
    <!-- <router-view></router-view> -->
    <Login></Login>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
// import Header from "./components/common/Header"
// import ArticleList from "./components/ArticleList"
// import FullTextList from "./views/FullTextEdit"
// import ArticleDetalis from "./views/ArticleDetail"
// export default {
//   name:"App",
//   data(){
//     return {
//       routerShow:true,
//       bodyShow:true
//     }
//   },
//   components:{
//     Header,
//     ArticleList,
//     FullTextList,
//     ArticleDetalis
//   },
//   methods:{
//     changeUrl(url) {
//       console.log(url);
//       this.isShow = true
//       this.bodyShow = false
//     }
//   },
//   watch:{
//     $route:{
//       handler:function(route){
//         console.log(route)
//         routerShow:true;
//       }
//     }
//   }
//}
import HeaderPage from "./views/HeaderPage"
import ArticleDetail from "./views/ArticleDetail"
import Login from "./views/Login"
export default {
  name:"App",
  data(){
    return {
      routerShow:true,
      bodyShow:true
    }
  },
  components:{
    HeaderPage,
    ArticleDetail,
    Login
  },
}

</script>
