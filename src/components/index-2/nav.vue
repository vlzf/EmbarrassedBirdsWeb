<template>
  <div :class="{'nav':true, 'clear': true, 'bg-hide': navTop < 140}">
    <div class="containor">
      <span class="title left">Embarrassed Birds</span>
      <div class="right login-box">
        <a href="./login.html">登录</a>
      </div>
      <div class="btns right" ref="btns">
        <div class="btn left" 
          v-for="(item,i) in links"
          :curIndex="i"
          :key="i"
          :link="item.link"
        >
          <span>{{item.title}}</span>
        </div>
        <i class="line" :style="'width:'+lineWidth+'px;left:'+lineLeft+'px;'"></i>
      </div>  
    </div>
  </div>
</template>

<script>
import { onEvent } from '@/common/js/dom'
import { throttle, debounce } from '@/common/js/timer'
// :style="'top:'+navTop+'px;'"
export default {
  data(){
    return {
      child: null,
      btns: null,
      lineWidth: 0,
      lineLeft: 0,
      navTop: 0,
      hidden: false
    }
  },
  props: {
    links: {
      type: Array,
      default: ()=> [
        {
          title: '个人中心',
          link: ''
        },
        {
          title: '关于我们',
          link: ''
        },
      ]
    },
    curIndex: {
      type: Number,
      default: 0
    },
  },
  mounted(){
    setTimeout(()=>{
      this.init()
    }, 20)
  },
  watch: {
    navTop(nv, ov){
      this.hidden = nv - ov < 0

    }
  },
  methods: {
    init(){
      this.btns ||  (this.btns = this.$refs['btns'])
      this.child || (this.child = this.btns.children)
      if(this.child.length === 0) return
      this.lineWidth = this.child[this.curIndex].clientWidth
      this.lineLeft = this.child[this.curIndex].offsetLeft

      var t = this
      onEvent(
        this.btns, 'btn', 'mousemove', 
        throttle(function() {
          t.lineLeft = this.offsetLeft - 0
          t.lineWidth = this.clientWidth - 0
        }, 150)
      )
      this.btns.addEventListener('mouseleave', ()=>{
        this.lineWidth = this.child[this.curIndex].clientWidth
        this.lineLeft = this.child[this.curIndex].offsetLeft
      })
      onEvent(
        this.btns, 'btn', 'click', 
        throttle(function() {
          window.location.href = this.getAttribute('link')
        }, 200)
      )

      window.addEventListener('scroll', debounce(function(){
        t.navTop = this.scrollY
        // t.hidden = false
      },200))
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/base2.less";
@Nav-Height: 60px;

.nav {
  transition: 0.2s;
  position: fixed;
  top: 0;
  width: 100%;
  height: @Nav-Height;
  background: @ThemeColor;
  // box-shadow: 0 2px 3px rgb(200, 200, 200);
  z-index: 10;
  &.bg-hide {
    background: none;
  }
  &.hide {
    display: none;
  }
  >.containor {
    min-width: 700px;
  }
}

.title {
  color: @White;
  font-size: 28px;
  line-height: @Nav-Height;
  padding: 0 20px;
}

.login-box {
  height: @Nav-Height;
  margin: 0 20px;
  color: white;
  line-height: @Nav-Height;
  &>a {
    cursor: pointer;
    padding: 0 5px;
    vertical-align: middle;
    font-size: 14px;
    &:hover {
      text-decoration: solid underline @White;
    }
  }
}

.btns {
  height: @Nav-Height;
  position: relative;
  margin-right: 20px;
  >.btn {
    transition: 0.2s;
    color: @White;
    cursor: pointer;
    >span {
      line-height: @Nav-Height;
      padding: 0 15px;
      font-size: 16px;
    }
  }
}

.line {
  display: block;
  transition: 0.2s;
  position: absolute;
  bottom: 2px;
  left: 0;
  height: 3px;
  border-radius: 2px;
  background: @White;
}

a {
  color: white;
  outline: none;
  &:active {
    color: white;
  }
  &:visited {
    color: white;
  }
}
</style>
