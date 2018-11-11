<template>
  <div class="personal clear containor">
    <div class="menu right">
      <h3 class="title"># 菜单</h3>
      <div>
        <div class="menu-btn">问卷</div>
        <div class="menu-btn">创建问卷</div>
        <div class="menu-btn">待定</div>
        <!-- <div class="menu-btn">2313</div>
        <div class="menu-btn">2313</div> -->
      </div>
    </div>
    <div class="message right">
      <paper-list/>
    </div>
  </div>
</template>

<script>
import paperList from '@/components/index-2/paper-list'

export default {
  data(){
    return {

    }
  },
  components: {
    paperList
  }
}
</script>

<style lang="less" scoped>
@import "../../common/less/base2.less";
@MenuWidth: 100%/5;

.personal {
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

