<template>
  <div class="paper-item">
    <h4>{{title}}</h4>
    <div class="tool-box">
      <span class="edit">编辑</span>|<span class="send">发送</span>|<span class="delete">删除</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    link: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/base2.less";

.paper-item {
  transition: 0.2s;
  position: relative;
  cursor: pointer;
  padding: 10px 20px;
  background: white;
  border-top: 0.5px solid rgb(240, 240, 240);
  &:first-child {
    border: none;
  }
  &:hover {
    background: @ThemeColor;
    color: white;
    box-shadow: 0 0 20px @ShadowColor1;
    &>.tool-box {
      display: block;
    }
  }
  >.tool-box {
    display: none;
    position: absolute;
    top: 0;
    right: 20px;
    height: 60px;
    font-size: 13px;
    color: white;
    >span {
      line-height: 60px;
      padding: 0 10px;
      &:hover {
        text-decoration: solid underline;
      }
    }
  }
}
</style>