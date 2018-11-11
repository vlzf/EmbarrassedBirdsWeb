<template>
  <div id="app">
    <my-nav/>
    <section class="gallery-area">
      <gallery></gallery>
    </section>
    <section class="main">
      <personal/>
    </section>
    <footer class="containor">
      @Embarrassed Birds
    </footer>
  </div>
</template>

<script>
import myNav from '@/components/index-2/nav'
import gallery from '@/components/index-2/gallery'
import personal from '@/components/index-2/personal'

export default {
  name: 'App',
  components: {
    myNav,
    gallery,
    personal
  }
}
</script>

<style lang="less">
@import url(../../common/less/global);
</style>
