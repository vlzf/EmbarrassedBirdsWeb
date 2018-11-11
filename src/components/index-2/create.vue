<template>
  <div class="create clear containor">
    <div class="menu right">
      <h3 class="title"># 菜单</h3>
      <div>
        <div class="menu-btn">预览</div>
        <div class="menu-btn">取消</div>
      </div>
    </div>
    <div class="message right">
      <create-list v-if="dataList" :dataList="dataList"/>
    </div>
  </div>
</template>

<script>
import createList from '@/components/index-2/create-list'
import { createMes } from '@/common/js/fn'

const MES = JSON.parse(window.sessionStorage.getItem('mes')) || createMes()

export default {
  data(){
    return {
      dataList: null
    }
  },
  components: {
    createList
  },
  mounted(){
    setTimeout(()=>{
      

      // 经过判断后，获得了第一条信息
      this.dataList = [
        {
          img:"/static/img/slider2.jpg",
          mid:0,
          pid:0,
          problem: "问题48141654168541654164168541654165+4164",
          answers: []
        }
      ]
    }, 20)
  },
  methods: {
    init(){
      
    },
    createPaper(){ // 创建问卷

    },
    createFirstProblem(){ // 生成第一道题

    },
    getFirst(){

    }
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/base2.less";
@MenuWidth: 100%/5;

.create {
  padding: 10px;
}

.message {
  padding: 10px;
  width: 100% - @MenuWidth;
}

.menu {
  padding: 10px;
  width: @MenuWidth;
  >div {
    // margin-top: 60px;
    box-shadow: 0 0 20px @ShadowColor2;
    &:hover{
      box-shadow: 0 0 20px @ShadowColor1;
    }
  }
  >h3 {
    color: @ThemeColor;
    opacity: 0;
  }
}

.menu-btn {
  transition: 0.2s;
  cursor: pointer;
  font-weight: 500;
  background: white;
  padding: 13px 20px;
  border-top: 0.5px solid rgb(240, 240, 240);
  &:first-child {
    border: none;
  }
  &:hover {
    background-color: @ThemeColor;
    color: white;
  }
  &.active {
    background-color: @ThemeColor;
    color: white;
  }
}
</style>