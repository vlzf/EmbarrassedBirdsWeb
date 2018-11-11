<template>
  <div class="problem-list">
    <h3 class="title"># 编辑问卷</h3>
    <div class="paper-head">
      <div class="row clear">
        <label>标题</label>
        <input type="text" placeholder="标题">
      </div>
      <div class="row clear">
        <label>描述</label>
        <textarea></textarea>
      </div>
    </div>
    <section class="clear">
      <div class="left answer-text">
        <h4 class="title"># 当前分支</h4>
        <div v-if="lastTarget">
          <div :class="{'small-title': true, 'active': curFetchIndex === i}"
            v-for="(e,i) in lastTarget.answers"
            :key="i"
            @click="nextProblem(i)"
          >
            <h4>{{e.text?e.text:'选项名未设置'}}</h4>
          </div>
        </div>
        <div v-if="!lastTarget||!lastTarget.answers.length">
          <div class="small-title center">
            <h4>暂无</h4>
          </div>
        </div>
        <div class="btn-box">
          <div class="btn next" @click="pushTack(undefined)" v-show="target!==null">
            <h4>前进</h4>
          </div>
          <div class="btn back" @click="popTack" v-show="tack.length">
            <h4>后退</h4>
          </div>
        </div>
      </div>
      <div class="left answer-edit">
        <h4 class="title"># 问题编辑</h4>
        <create-item 
          v-if="target" 
          @output="getEditResult"
          
          :mid="target.mid"
          :problem="target.problem"
          :answers="target.answers"
          :img="target.img"
        />
      </div>
    </section>
  </div>
</template>

<script>
import createItem from '@/components/index-2/create-item'

export default {
  components: {
    createItem
  },
  props: {
    title: {
      type: String,
      default: '编辑问卷'
    },
    dataList: {
      type: Array,
      default: ()=> [
        {
          img:"/static/img/slider2.jpg",
          mid:0,
          pid:0,
          problem: "问题48141654168541654164168541654165+4164",
          answers: []
        }
      ]
    },
    pid: {

    }
  },
  data(){
    return {
      target: null,
      tack: [],
      curFetchIndex: -1,
      list: []
    }
  },
  computed: {
    lastTarget(){
      let len = this.tack.length
      return len > 0 ? this.tack[len-1] : null
    }
  },
  mounted() {
    setTimeout(() => {
      this.injectData()
    }, 20);
  },
  methods: {
    injectData(){
      this.list = this.dataList
      this.target = this.list[0] // 获取第一个
      console.log(this.target)
    },
    getEditResult(d){
      this.pushTack(d)
    },
    pushTack(d){
      if(d || this.target){
        this.tack.push(d || this.target)
        this.target = null
        this.curFetchIndex = -1  
      }
    },
    popTack(){
      if(!this.tack.length) return
      this.target = this.tack.pop()
      if(!this.target.length) return
      var list = this.lastTarget.answers
      for(var i = 0; i < list.length; i++){
        if(list[i].next === this.target.mid) {
          this.curFetchIndex = i
          return
        }
      }
      this.curFetchIndex = -1
    },
    nextProblem(i){ // 显示下一个
      this.curFetchIndex = i
      var next = this.lastTarget.answers[i].next
      if(next) {
        this.target = this.findProblem(next)
      } else {
        this.createNextProblem()
      }
    },
    findProblem(mid){ // 查本地缓存
      var list = this.list, i = list.length
      while(i--){
        if(list[i].mid === mid){
          return list[i]
        } 
      }
      return null
    },
    createNextProblem(){

      // 请求后获得数据
      var d = {
        img:"./static/img/slider2.jpg",
        mid:Math.random()*100|0,
        pid:25,
        problem: "",
        answers: []
      }
      this.list.push(d)
      
      // 更新缓存
      this.lastTarget.answers[this.curFetchIndex].next = d.mid
      this.target = d
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/base2.less";
.hide {
  display: none;
}

.title {
  color: @ThemeColor;
}


.paper-head {
  transition: 0.2s;
  padding: 30px 0px;
  margin-bottom: 20px;
  background-color: white;
  box-shadow: 0 0 5px @ShadowColor2;
  &:hover {
    box-shadow: 0 0 5px @ShadowColor1;
  }
  >.row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
    >input[type=text] {
      width: 40%;
      float: left;
      display: block;
      font-size: 17px;
      padding: 5px 8px;
      box-shadow: 0 0 3px #ccc;
      outline-color: @ThemeColor;
      color: #ccc;
      background-color: inherit;
    }
    >label {
      display: block;
      float: left;
      font-size: 18px;
      width: 80px;
      padding: 2px 0;
      text-align: right;
      font-weight: bold;
      color: @ThemeColor;
      margin-right: 20px;
    }
    >textarea {
      width: 400px;
      height: 100px;
      min-height: 70px;
      max-height: 200px;
      min-width: 400px;
      max-width: 600px;
      float: left;
      display: block;
      font-size: 17px;
      padding: 5px 8px;
      box-shadow: 0 0 3px #ccc;
      outline-color: @ThemeColor;
      color: #ccc;
      background-color: inherit;
    }
  }
}


@AnswerTextWidth: 25%;
.answer-text {
  width: @AnswerTextWidth;
  min-height: 20px;
}

.answer-edit {
  width: 100% - @AnswerTextWidth;
  padding-left: 20px;
  min-height: 400px;
}

.small-title {
  transition: 0.2s;
  box-shadow: 0 0 8px @ShadowColor2;
  padding: 1px 10px;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: @ThemeColor;
  background-color: white;
  &:hover{
    color: white;
    background-color: @ThemeColor;
  }
  &.active {
    color: white;
    background-color: @ThemeColor;
  }
  >h4 {
    font-weight: normal;
  }
}


div.btn-box {
  margin: 20px 0;
}
.btn {
  margin-bottom: 5px;
  transition: 0.2s;
  box-shadow: 0 0 8px @ShadowColor2;
  padding: 1px 10px;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
  text-align: center;
  >h4 {
    font-weight: normal;
  }
  &.back{
    &:hover{
      background-color: #e20202;
    }
    background-color: @Red;
  }
  &.next{
    &:hover{
      background-color: #0074d4;
    }
    background-color: @Blue;
  }
}
</style>