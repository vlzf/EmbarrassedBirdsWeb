<template>
  <div class="paper-list">
    <h3 class="title"># {{title}}</h3>
    <section class="list">
      <paper-item v-for="(e,i) in data" :key="i"
        :title="e.title"
        :link="e.link"
      />
    </section>
  </div>
</template>

<script>
import paperItem from '@/components/index-2/paper-item'

export default {
  components: {
    paperItem
  },
  props: {
    title: {
      type: String,
      default: '问卷'
    },
    data: {
      type: Array,
      default: ()=>[
        {
          title: '标题',
          link: '#'
        },
        {
          title: '标题',
          link: '#'
        },
        {
          title: '标题',
          link: '#'
        }
      ]
    },
    // hidden: {
    //   type: Boolean,
    //   default: false
    // }
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

.list {
  box-shadow: 0 0 20px @ShadowColor2;
}
</style>
