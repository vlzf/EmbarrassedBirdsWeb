<template>
  <div id="app">
    <my-nav/>
    <section class="gallery-area">
      <gallery></gallery>
    </section>
    <section class="main">
      <create/>
    </section>
    <footer class="containor">
      @Embarrassed Birds
    </footer>
  </div>
</template>

<script>
import myNav from '@/components/index-2/nav'
import gallery from '@/components/index-2/gallery'
import create from '@/components/index-2/create'

export default {
  name: 'App',
  components: {
    myNav,
    gallery,
    create,
  },
  data(){
    return {
      
    }
  }
}
</script>

<style lang="less">
@import url(../../common/less/global);
</style>