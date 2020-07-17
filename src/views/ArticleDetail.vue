<template>
<div class="content">
        <p style="font-size:16px">{{articleDetail.title}}</p>
        <div class="header" style="background-color: #F5F5F5; padding: 24px;width:900px;margin:0 auto">
        <a-page-header
          :ghost="false"
          title="Title"
          :sub-title="articleDetail.title"
          @back="() => $router.go(-1)" style="font-size:16px">
          <a-descriptions size="small" :column="3">
            <a-descriptions-item label="作者">
              {{articleDetail.articleuser}}
            </a-descriptions-item>
            <a-descriptions-item label="评论数">
              <a>{{articleDetail.commentnum}}</a>
            </a-descriptions-item>
            <a-descriptions-item label="发布时间">
              {{articleDetail.createtime}}
            </a-descriptions-item>
            <a-descriptions-item label="收藏数">
              {{articleDetail.collectnum}}
            </a-descriptions-item>
            <a-descriptions-item label="点赞数">
              {{articleDetail.goodnum}}
            </a-descriptions-item>
            <a-descriptions-item label="观看人数">
              1.5万
            </a-descriptions-item>
          </a-descriptions>
        </a-page-header>
    </div>
  <div class="body">
    <vue-markdown v-highlight :source="articleDetail.content"></vue-markdown>
  </div>
  <div class="footInfo">
    <span>评分&nbsp;</span>
    <template>
      <a-rate :default-value="4" disabled />
    </template>
  </div>
  <div class="addComment">
    <a-list
      v-if="comments.length"
      :data-source="comments"
      :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
      item-layout="horizontal"
    >
      <a-list-item slot="renderItem" slot-scope="item, index">
        <a-comment
          :author="item.author"
          :avatar="item.avatar"
          :content="item.content"
          :datetime="item.datetime"
        />
      </a-list-item>
    </a-list>
    <a-comment>
      <div slot="content">
        <a-form-item>
          <a-textarea :rows="4" :value="value" @change="handleChange" placeholder="大侠请留步，让我们看到你的足迹..." />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit" style="margin-right:-650px;background-color:#fff color:#000">
            Add Comment
          </a-button>
        </a-form-item>
      </div>
    </a-comment>
  </div>
</div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
import {getDetail} from '../api/manage'
import moment from 'moment';
import {submitComment} from '../api/manage'
export default {
  name:"Details",
data() {
        return {//value的值是经过markdown解析后的文本，可使用`@change="changeData"`在控制台打印显示
            defaultData: "preview",
            article:[],
          moment,
          comments: [{          
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
              datetime: moment().subtract(1, 'days'),
            },
            {
              
              author: 'Han Solo',
              avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
              content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
              datetime: moment().subtract(2, 'days'),
            },],
          submitting: false,
          value: '',
          articleDetail:[]
        }
    },
    methods: {
        handleSubmit() {
          if (!this.value) {
            return;
          }
          this.submitting = true;
          let commentValue = this.value;
          setTimeout(() => {
            this.submitting = false;
            this.comments = [
              {
                author: 'Han Solo',
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                content: this.value,
                datetime: moment().fromNow(),
              },
              ...this.comments,
            ];
            this.value = '';
          }, 1000);
          let param = JSON.stringify({
            comment:submitComment
          })
          submitComment(param).then(res =>{
            console.log("ok")
          });
        },
        handleChange(e) {
          this.value = e.target.value;
        }
    },
    components: {
        VueMarkdown // 声明组件
    },
    mounted(){
      let id = this.$route.params.id;
      getDetail(id).then((res) => {
        this.articleDetail = res.data.data
        console.log(this.articleDetail);
        console.log(res.data.data.commentmap);
        let i = 0;
        let temp = res.data.data.commentmap;
        if(JSON.stringify(temp) !== {}){
          for (let key in temp) {
            this.comments[i].author = key
            this.comments[i].content = temp[key]
            this.comments[i].avatar ='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            this.comments[i].datetime = Math.floor(Math.random()*200)+0 + " days ag0"
            i++
          } 
        }  
      })
    },
    // watch:{
    //   articleDetail(){
    //     return articleDetail
    //   }
    // }

}
</script>

<style scoped>
tr:last-child td {
  padding-bottom: 0;
}
.content{
  background-color:rgb(245, 245, 245)
}
.body{
  width:850px;
  margin:0 auto;
  text-align:left;
  background-color:#Fff;
  padding:6px 20px;
  text-indent:1.5em;
}
.comment{
  width:850px;
  margin:20px auto;
  background-color:#fff;
  margin-top:-20px
}
.footInfo{
  background-color:#fff;
  margin:20px auto;
  margin-top:0px;
  width:850px;
  text-align:left;
  padding-left:12px;
  padding-bottom:6px;
}
.addComment{
  width:860px;
  margin:0 auto;
  margin-top:-10px;
}
</style>