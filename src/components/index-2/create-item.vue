<template>
  <div :class="'create-item clear '+(big?'':' small-window ')" :name="number">
    
    <div class="watch">
      <problem-item
        :img="myImg"
        :answersStr="answersStr"
        :problem="myProblem"
      />
    </div>
    <div class="edit">
      <div class="tool-box">
        <span @click="shrink">{{big?'缩小':'放大'}}</span>|<span>删除</span>
      </div>
      <h4 class="title">
        # {{mid}} 
        <span class="subtext" :title="myProblem" v-show="!big">
          {{myProblem}}
        </span>
      </h4>
      <div class="box" v-show="boxIndex === 0">
        <div class="row clear">
          <label>问题：</label>
          <textarea v-model="myProblem"></textarea>
        </div>
        <div class="row clear">
          <label>图片：</label>
          <form ref="imgForm">
            <input type="file" ref="imgFile">
          </form>
        </div>
        <div class="row clear">
          <button @click="changeBoxIndex">选项设置</button>
        </div>  
      </div>
      <div class="box" v-show="boxIndex === 1">
        <table>
          <thead>
            <tr>
              <th class="ctx">选项内容</th>
              <th class="delete">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(e,i) in myAnswers" :key="i">
              <td class="ctx"><input type="text" v-model="e.text"/></td>
              <td class="delete" @click="deleteAnswer(i)">删除</td>
            </tr>
          </tbody>
        </table>
        <div class="row clear">
          <button @click="output">{{hasChange?'提交':'下一步'}}</button>
          <button @click="addAnswer">可添加选项({{4 - myAnswers.length}})</button>
          <button @click="changeBoxIndex">返回</button>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import problemItem from '@/components/index-2/problem-item'
import { imgBase64 } from '@/common/js/fn'
const ANSWER_NUMBER = 4
class Answer{
  constructor(text, next){
    this.text = text || ''
    this.next = next || ''
  }
}
export default {
  components: {
    problemItem
  },
  props: {
    number: {
      type: Number,
      default: 0
    },
    pid: {
      type: Number,
      default: 0
    },
    mid: {
      type: Number,
      default: 0
    },
    problem: {
      type: String,
      default: '问题48141654168541654164168541654165+4164'
    },
    answers: {
      type: Array,
      default: ()=>[]
    },
    img: {
      type: String,
      default: '/static/img/slider2.jpg'
    }
  },
  data(){
    return {
      boxIndex: 0,
      big: true,

      myProblem: '',
      myAnswers: [],
      myImg: '',
      hasChange: false
    }
  },
  created(){
    this.injectData()
  },
  mounted(){
    setTimeout(()=>{
      this.initEvent()
    },20)
  },
  computed: {
    answersStr(){
      return JSON.stringify(this.myAnswers)
    },
  },
  watch: {
    answersStr(){
      this.hasChange = true
      this.$emit('haschange', true)
    },
    myProblem(){
      this.$emit('haschange', true)
    },
    myImg(){
      this.$emit('haschange', true)
    },
    mid() { // 换题目又重新注入数据
      this.injectData()
      this.$refs['imgForm'].reset()
    }
  },
  methods: {
    injectData(){
      this.myProblem = this.problem
      this.myAnswers = JSON.parse(JSON.stringify(this.answers))
      this.myImg = this.img
    },
    initEvent(){
      var t = this
      this.$refs['imgFile'].addEventListener('change', function(params) {
        imgBase64(this.files[0])
        .then((d)=>{
          t.myImg = d
        }).catch((e)=>{
          console.log(e)
        })
      })
    },
    changeBoxIndex(){
      this.boxIndex = (this.boxIndex + 1) % 2
    },
    deleteAnswer(index){
      this.myAnswers.splice(index, 1)
    },
    addAnswer(){
      if(this.myAnswers.length >= ANSWER_NUMBER){
        return
      }
      this.myAnswers.push(new Answer())
    },
    output(){
      if(this.hasChange) {
        this.submit() // 提交
        this.hasChange = false // 更改完成
        return
      }
      // console.log(this.myAnswers)
      this.$emit('output', {
        "pid": this.pid, // 试卷 id
        "mid": this.mid, // 题目 id
        "problem": this.myProblem, // 题目内容
        "img": this.myImg, // 图片地址
        "answers": this.myAnswers // 选项
      })
    },
    submit(){ // 提交

    },
    shrink(){
      this.big = !this.big 
    },
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/base2.less";

@EditWidth: 50%;

.title{
  color: @ThemeColor;
  >.subtext {
    font-size: 17px;
    font-weight: normal;
    margin-left: 15px;
    display: inline-block;
    vertical-align: middle;
    width: 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #ccc;
  }
}


.hide {
  display: none;
}
.create-item {
  width: 100%;
  transition: 0.2s;
  position: relative;
  // cursor: pointer;
  margin-bottom: 20px;
  // padding: 10px;
  background: #2d2d2d;
  border-top: 0.5px solid rgb(240, 240, 240);
  &:first-child {
    border: none;
  }
  &:hover {
    box-shadow: 0 0 20px @ShadowColor1;
    
  }
}

.watch {
  // width: 100% - @EditWidth;
  position: relative;
  // height: 300px;
  transition: 0.2s;
}

.edit {
  transition: 0.2s;
  // width: @EditWidth;
  padding: 1px 10px 20px 10px;
  color: @ThemeColor;
  position: relative;
  &:hover {
    >.tool-box {
      display: block;
    }
  }
}

.row {
  margin-bottom: 10px;
  >label {
    display: block;
    padding: 2px 5px;
    font-weight: 600;
    float: left;
    width: 15%;
    text-align: right;
  }
  >textarea {
    float: left;
    display: block;
    min-width: 85%;
    max-width: 85%;
    max-height: 150px;
    min-height: 80px;
    padding: 5px;
    background-color: rgb(88, 88, 88);
    outline-color: @ThemeColor;
    height: 60px;
    color: white;
    font-size: 15px;
    font-weight: 600;
  }
  >input[name=file] {
    width: 85%;
  }
  >button {
    cursor: pointer;
    padding: 3px 10px;
    font-size: 15px;
    float: right;
    margin: 0 2px;
  }
}

.box>table {
  width: 100%;
  margin-bottom: 10px;
  
  th, td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgb(88, 88, 88);
    text-align: center;
  }
  th {
    padding: 3px;
  }
  th.ctx {
    width: 75%;
    max-width: 75%;
  }
  th.next {
    width: 15%;
  }
  th.delete {
    width: 10%;
  }
  th.btn-tip {
    width: 25%;
    min-width: 25%;
  }
  td>input {
    padding: 5px;
    color: white;
    background-color: inherit;
    text-align: inherit;
    width: 100%;
    outline-color: @ThemeColor;
  }
  td.ctx {
    width: 75%;
  }
  td.next {
    width: 15%;
    color: white;
    background-color: @ThemeColor;
    cursor: pointer;
  }
  td.delete {
    width: 10%;
    color: white;
    background-color: @Red;
    cursor: pointer;
  }
}

.tool-box {
  transition: 0.2s;
  display: none;
  height: 40px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 10px;
  color: #ccc;
  font-size: 13px;
  >span {
    line-height: 40px;
    padding: 0 5px;
    font-size: inherit;
    cursor: pointer;
  }
}

.create-item.small-window {
  transition: 0.2s;
  // display: inline-block;
  // margin-right: 3%;
  margin-bottom: 0;
  >.watch {
    transition: 0.2s;
    overflow: hidden;
    width: 0;
    height: 0;
  }
  >.edit {
    transition: 0.2s;
    width: 100%;
    overflow: hidden;
    height: 40px;
    padding-bottom: 0;
    >.box {
      display: none;
    }
  }
}
</style>