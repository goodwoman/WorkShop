<template>
  <div class="content">
    <div
    v-infinite-scroll="handleInfiniteOnLoad"
    class="demo-infinite-container"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
      <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="resultList" style="width:800px;margin:0 auto;textAlign:left">
    <div slot="footer"><b>ant design vue</b> footer part</div>
    <a-list-item slot="renderItem" key="item.title" slot-scope="item" style="text-algin:left">
      <template v-for="{ type, text } in actions" slot="actions">
        <span :key="type">
          <a-icon :type="type" style="margin-right: 8px" />
          {{ text }}
        </span>
      </template>
      <a-list-item-meta :description="item.username">
        <a slot="title" href="#"> <router-link :to="`/detail/`+ item.articleid">{{ item.title }}</router-link></a>
        <!-- <a-avatar slot="avatar" :src="item.avatar" /> -->
      </a-list-item-meta>
      {{ item.content }}
      <!-- <router-link :to="{name:'Detail',query:{id:item.articleid}}"> -->
    </a-list-item>
  </a-list>
    </div>
  </div>
</template>

<script>
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    title: `vue的使用 ${i}`,
    username:
      'Jackson',
      articleid:
      "12434",
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}
export default {
  name:"ArticleList",
  computed:{
    resultList(){
      console.log("resultList is changed")
      console.log(this.$store.state.resultList)
      return this.$store.state.resultList    
    }
  },
  data() {
    return {
      listData,
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 5,
      },
      actions: [
        { type: 'star-o', text: '156' },
        { type: 'like-o', text: '156' },
        { type: 'message', text: '2' },
        {type:'clock-circle',text:'2019-08-23 23:30'}
      ],
    };
  }
}
</script>

<style lang="less">
.watch{
    position:absolute;
    bottom:0;
    right: 0;
    margin-bottom: 0px;
    span{
        float: right;
        width:50px;
        height:25px;
        margin-top:6px;      
        text-align: center;
        a-icon{
            float: left;
        }
    }
    
}

</style>