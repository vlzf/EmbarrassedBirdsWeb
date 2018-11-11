<template>
  <div id="app">
    <login/>
  </div>
</template>

<script>
import login from '@/components/index-2/login'

export default {
  name: 'App',
  components: {
    login
  }
}
</script>

<style lang="less">
@import url(../../common/less/global);
</style>
