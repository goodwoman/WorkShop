<template>
    <div class="content">
        <div class="edit" v-if="show">     
            <div class="header">
                <div style="height:45px;lineheight:45px"><router-link to="/" tag="div" style="line-height:45px;cursor:pointer;color:blue">回到首页</router-link></div>
                <label for="title" class="titleLable">文章标题</label>
                <input name="title" placeholder="input something here" class="" v-model="title"/>
                <label for="kind">文章种类</label>
                <a-select default-value="lucy" style="width: 120px" @change="handleChange" v-model="kind">
                    <a-select-option value="jack">
                        Jack
                    </a-select-option>
                    <a-select-option value="lucy">
                        Lucy
                    </a-select-option>
                    <a-select-option value="disabled" disabled>
                        Disabled
                    </a-select-option>
                    <a-select-option value="Yiminghe">
                        yiminghe
                    </a-select-option>
                    </a-select>
                <a-button type="primary" style="float:right;margin-right:22px" @click="save">
                    Primary
                </a-button>
            </div> 
            <mavon-editor v-model="value" style="height:550px" :toolbars="toolbars" :ref="md"
            @imgAdd="addImg" @imgDel="delImg" />
        </div>
        <result v-else></result>
    </div>
    
</template>

<script>
import Axios from "axios"
import {upload} from "../api/manage"
import Result from "../components/Result"
export default {
    name:"FullTextEdit",
    data() {
        return {
            value: '',
            defaultData: "preview",
            toolbars: {
            bold: true, // 粗体
            italic: true, // 斜体
            header: true, // 标题
            underline: true, // 下划线
            strikethrough: true, // 中划线
            mark: true, // 标记
            superscript: true, // 上角标
            subscript: true, // 下角标
            quote: true, // 引用
            ol: true, // 有序列表
            ul: true, // 无序列表
            link: true, // 链接
            imagelink: true, // 图片链接
            code: true, // code
            table: true, // 表格
            fullscreen: true, // 全屏编辑
            readmodel: true, // 沉浸式阅读
            htmlcode: true, // 展示html源码
            help: true, // 帮助
            undo: true, // 上一步
            redo: true, // 下一步
            trash: true, // 清空
            save: true, // 保存（触发events中的save事件）
            navigation: true, // 导航目录
            alignleft: true, // 左对齐
            aligncenter: true, // 居中
            alignright: true, // 右对齐
            subfield: true, // 单双栏模式
            preview: true // 预览
            },
            title:"",
            kind:"",
            content:"",
            show:true
        };
    },
    components:{
        Result
    },
    methods:{
        methods:{
        addImg(pos, file) {
            var formData=new FormData();     //新建一个表单数据,用于提交文件
            formData.append("img",file);     //添加文件,参数分别是表单参数的名字和值.
            Axios.post("/file/image",formData,{     //使用Axios进行上传图片
                headers:{
                "Content-Type":"multipart/form-data"    //设置请求头,更换内容类型为表单数据
                }
            }).then((response)=>{     //传输之后将url替换
                var data=response.data;     //data为响应返回的数据
                if(data.message=="no signIn"){     //如果还没有登陆
                this.$router.push("/user/signIn")     //路由跳转
                }else{     //否则
                this.$refs.md.$img2Url(pos,data.url);     //将原来的图片url替换成data.url,注意$img2Url是自带的函数.
                }
            });
            this.imgs[pos] = file;     //记录图片.
        },
        delImg(pos) {
            pos=pos[0];     //首先获取到图片的原来的url
            Axios.post("/api/edit/deleteImg?imgId="+pos);     //通过Axios删除图片
            delete this.imgs[pos];     //删除之前记录的图像字典中的数据
            }
        },
        save(md, html) {
            let param = {
                "userid":"123456",
                "title":this.title,
                "kind":1,
                "content":this.value,
            };
            console.log(param)
            // Axios.post("/article/insert",param,{     //使用Axios进行上传图片
            //     headers:{
            //     "Content-Type":"multipart/form-data"    //设置请求头,更换内容类型为表单数据
            //     }
            // }).then(res =>{
            //     console.log(res)
            // })
            
            upload(param).then((res)=> {
                this.show = false;
                console.log(res)
            })
        },
        handleChange(value) {
            console.log(`selected ${value}`);
        },
    }
};
</script>
<style lang="less" scoped>
    .header{
        text-align: left; 
        margin-top: 2px;
        margin-bottom:2px;
        margin-left:2px;
        label{
            width:70px;
            height: 35px;
            margin-right:6px;
        }
        input{
            padding-left:3px;
            height: 35px;
            width:55%;
            outline: none;
            border-radius: 1px;
            border: 1px solid #757575;
        }
    }
</style>
