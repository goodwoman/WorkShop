<template>
<div class="content">
        <p style="font-size:16px">我的第一篇文章</p>
        <div class="header" style="background-color: #F5F5F5; padding: 24px;width:900px;margin:0 auto">
        <a-page-header
          :ghost="false"
          title="Title"
          :sub-title="`我的第一篇文章`"
          @back="() => $router.go(-1)" style="font-size:16px">
          <a-descriptions size="small" :column="3">
            <a-descriptions-item label="作者">
              Lili Qu
            </a-descriptions-item>
            <a-descriptions-item label="评论数">
              <a>1212</a>
            </a-descriptions-item>
            <a-descriptions-item label="发布时间">
              2017-01-10
            </a-descriptions-item>
            <a-descriptions-item label="收藏数">
              345
            </a-descriptions-item>
            <a-descriptions-item label="点赞数">
              3412
            </a-descriptions-item>
            <a-descriptions-item label="观看人数">
              1.5万
            </a-descriptions-item>
          </a-descriptions>
        </a-page-header>
    </div>
  <div class="body">
    <vue-markdown v-highlight :source="text"></vue-markdown>
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
  <!-- <div class="comment">
    <a-list
    class="comment-list"
    :header="`${data.length} replies`"
    item-layout="horizontal"
    :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-comment :author="item.author" :avatar="item.avatar">
        <template slot="actions">
          <span v-for="action in item.actions">{{ action }}</span>
        </template>
        <p slot="content" style="text-align:left;text-indent:1.5rem">
          {{ item.content }}
        </p>
        <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ item.datetime.fromNow() }}</span>
        </a-tooltip>
      </a-comment>
    </a-list-item>
    </a-list>
  </div>   -->
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
            text:`@[Toc]
### HTTP协议
#### 概况
HTTTP协议是超文本传输协议，它定义了客户端和服务器之间交换报文的格式和方式，默认使用80端口。它使用TCP作为传输层协议，保证数据连接的可靠性。

HTTP是一个无状态的协议，HTTP服务器不会保存关于客户端的任何信息，若要保存客户端的信息到服务器，使服务器能够识别客户端，那么应该借助cookie和session。

HTTP有两种连接模式，一种是持续连接，一种是非持续连接。非持续连接指的是服务器必须为每一个请求的对象建立和维护一个全新的连接。持续连接下，TCP连接默认不关闭，可以被多个请求复用。采取持续连接的好处是可以避免每次建立TCP连接三次握手所花费的时间。在HTTP1.0以前使用的非持续的连接，但是可在请求时，加上Connection：keep-alive来要求服务器不要关闭TCP连接。在HTTP1.1以后默认采用的是持续连接。目前对于同一个域，大多数浏览器支持同时建立6个持久连接。
#### HTTP请求报文
HTTP报文有两种，一种是请求报文，一种是响应报文。
HTTP请求报文的格式如下：
HTTP请求报文的第一行叫做请求行，后面的行叫做首部行，首部行后还可以跟一个实体主体。请求首部之后有一个空行，这个空行不能省略，它用来划分首部与实体。
请求行有三个字段：方法字段、URL
字段和HTTP版本字段。
方法字段可以取几种不同的是，一般有GET、POST、HEAD、PUT和DELETE。一般GET方法制备用于向服务器获取数据。POST方法用于将实体提交到指定的资源，通常会造成服务器资源的修改。HEAD方法与GET方法类似，但是在返回的响应中，不包含请求对象。（HEAD方法常用于查看资源在服务器的状态，不需要拿到数据的需求中）。PUT方法用于上传文件到服务器，DELETE方法用于删除服务器上的对象。虽然请求的方法很多，但 更多表达的是一种语义上的区别，并不是说 POST 能做的事情，GET 就不能做了，主要看我们如何选择。`,
            defaultData: "preview",
            article:[],
            data: [
            {
              
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
            },
          ],
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
        console.log(res);    
      })
      console.log(this.$route)
    }

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