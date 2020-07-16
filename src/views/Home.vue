<template>
  <div class="home">
    <Header></Header>
    <div class="bodycontent" style="width:900px;margin:10px auto">
      <a-list
    class="demo-loadmore-list"
    :loading="loading"
    item-layout="horizontal"
    :data-source="data"
    style="textAlign:left"
  >
    <div
      v-if="showLoadingMore"
      slot="loadMore"
      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
    >
      <a-spin v-if="loadingMore" />
      <a-button v-else @click="onLoadMore">
        loading more
      </a-button>
    </div>
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a slot="actions">edit</a>
      <a slot="actions" @click="delArticle">delete</a>
      <a slot="actions" ><router-link :to="data" >more</router-link></a>
      <!-- <a slot="actions">more</a> -->
      <a-list-item-meta style="cursor:pointer"
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      >
        <a slot="title" href="https://www.antdv.com/">{{ item.name.last }}</a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-list-item-meta>
      
    </a-list-item>
  </a-list>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src

import Header from "../components/common/Header"
import reqwest from 'reqwest';
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
import {deleteArticle} from "../api/manage"
export default {
  name: 'Home',
  components:{
    Header
  },
  data() {
    return {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
    };
  },
  mounted() {
    this.getData(res => {
      this.loading = false;
      this.data = res.results;
    });
  },
  methods: {
    getData(callback) {
      reqwest({
        url: fakeDataUrl,
        type: 'json',
        method: 'get',
        contentType: 'application/json',
        success: res => {
          callback(res);
        },
      });
    },
    delArticle(){
      let id = 1
      deleteArticle(1).then(res => {
        console.log("delete successed")
      })
    },
    onLoadMore() {
      this.loadingMore = true;
      this.getData(res => {
        this.data = this.data.concat(res.results);
        this.loadingMore = false;
        this.$nextTick(() => {
          window.dispatchEvent(new Event('resize'));
        });
      });
    },
  },
  
}
</script>
