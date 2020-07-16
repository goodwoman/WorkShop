<template>
<div class="content">
        <p style="font-size:16px">我的第一篇文章</p>
        <div class="header" style="background-color: #F5F5F5; padding: 24px;">
        <a-page-header
          :ghost="false"
          title="Title"
          sub-title="This is a subtitle"
          @back="() => $router.go(-1)"
        >
          <template slot="extra">
            <a-button key="3">
              Operation
            </a-button>
            <a-button key="2">
              Operation
            </a-button>
            <a-button key="1" type="primary">
              Primary
            </a-button>
          </template>
          <a-descriptions size="small" :column="3">
            <a-descriptions-item label="Created">
              Lili Qu
            </a-descriptions-item>
            <a-descriptions-item label="Association">
              <a>421421</a>
            </a-descriptions-item>
            <a-descriptions-item label="Creation Time">
              2017-01-10
            </a-descriptions-item>
            <a-descriptions-item label="Effective Time">
              2017-10-10
            </a-descriptions-item>
            <a-descriptions-item label="Remarks">
              Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
            </a-descriptions-item>
          </a-descriptions>
        </a-page-header>
    </div>
  <div class="body">
    <vue-markdown v-highlight :source="value"></vue-markdown>
  </div>
  <div class="comment">
    <a-list item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-list-item-meta
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      >
        <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
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
import VueMarkdown from 'vue-markdown'
import {getDetail} from '../api/manage'
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
export default {
  name:"Details",
data() {
        return {//value的值是经过markdown解析后的文本，可使用`@change="changeData"`在控制台打印显示
            value:`# 规划
**第一条**：我的职业生涯很长`,
            defaultData: "preview",
            data,
            article:[]
        };
    },
    methods: {
    },
    components: {
        VueMarkdown // 声明组件
    },
    mounted(){
      let id = this.$route.params.id;
      getDetail(id).then((res) => {
        console.log(res);
        
      })
      console.log(this.$route)
    }

}
</script>

<style>
tr:last-child td {
  padding-bottom: 0;
}
</style>