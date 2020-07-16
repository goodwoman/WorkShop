<template>
<div class="content">
  <Header></Header>
  <ArticleList></ArticleList>
</div>
  
</template>

<script>
import Header from "../components/common/Header"
import ArticleList from "../components/ArticleList"
export default {
  name:"HeaderPage",
  components:{
    Header,
    ArticleList
  }
}
</script>

<style>

</style>
