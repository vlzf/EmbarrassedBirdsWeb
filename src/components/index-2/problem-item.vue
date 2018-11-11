<template>
  <div class="problem-item clear" :style="(!!img?'background-image:url('+ img +');':'')">
    <section class="ctx">
      <div v-show="problem" class="problem-text">{{problem}}</div>
      <a v-for="(e, i) in answers"
        :key="i"
        :link="e.next"
      >{{e.text?e.text:'暂无'}}</a>
    </section>
  </div>
</template>

<script>
export default {
  props: {
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
      default: '问题'
    },
    img: {
      type: String,
      default: './static/img/slider1.jpg'
    },
    answersStr: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
    }
  },
  computed: {
    answers(){
      return JSON.parse(this.answersStr)
    }
  }
}
</script>

<style lang="less" scoped>
// :style="(!!img?'background:url('+ img +');':'')"
@import "../../common/less/base2.less";

@EditWidth: 50%;

.title{
  color: @ThemeColor;
}
.hide {
  display: none;
}
.problem-item {
  min-height: 100px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: 0.2s;
  position: relative;
  background-size: 100%;
  background-repeat: no-repeat;
  // cursor: pointer;
  // padding: 10px;
  background-color: white;
  background-position: center;
  border-top: 0.5px solid rgb(240, 240, 240);
  &:first-child {
    border: none;
  }
  padding-bottom: 20px;
}

// img.bg {
//   display: block;
//   width: 100%;
//   min-width: 100%;
//   min-height: 100%;
// }


.watch {
  width: 100% - @EditWidth;
  position: relative;
}

section.ctx {
  color: black;
  .problem-text {
    text-align: left;
    width: 100%;
    margin: 0 auto 20px;
    word-break:break-all;
    font-size: 24px;
    padding: 20px 5%;
    background-color: rgba(255, 255, 255, 0.7);
  }

  a {
    // text-align: center;
    transition: 0.2s;
    display: block;
    padding: 7px 15px;
    width: 70%;
    margin: 0 auto 0;
    word-break:break-all;
    font-size: 18px;
    cursor: pointer;
    background: white;
    border-top: 1px @ShadowColor2 solid;
    &:hover {
      background-color: @ThemeColor;
      border-color: @ThemeColor;
      color: white;
    }
  }
}

</style>