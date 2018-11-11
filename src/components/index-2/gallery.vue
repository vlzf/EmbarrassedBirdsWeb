<template>
  <div class="gallery">
    <section class="bg">
      <img :src="e" v-for="(e, i) in images" 
        :key="i"
        :class="{'active': curIndex === i}"
      >
    </section>
    <section class="ctx">
      <slot></slot>
    </section>
  </div>
</template>

<script>
export default {
  data(){
    return {
      curIndex: 0
    }
  },
  computed: {
    max(){
      return this.images.length
    }
  },
  props: {
    images: {
      type: Array,
      default: ()=>[
        '/static/img/slider1.jpg',
        '/static/img/slider2.jpg',
        '/static/img/slider3.jpg',
        '/static/img/slider4.jpg',
        '/static/img/slider5.jpg',
        '/static/img/slider6.jpg',
        '/static/img/slider7.jpg',
        '/static/img/slider8.jpg',
      ]
    }
  },
  mounted(){
    setTimeout(()=>{
      this.init()
    },20)
  },
  methods: {
    init(){
      var len = this.max, t = this
      setInterval(()=>{
        t.curIndex = (t.curIndex + 1) % len
      }, 20000)
    }
  }
}
</script>

<style lang="less" scoped>
.gallery {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.bg {
  height: 100%;
  width: 100%;
  position: relative;
  >img {
    transition: 1.5s;
    opacity: 0;
    min-height: 100%;
    min-width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &.active {
      display: block;
      opacity: 1;
    }
  }
}

.ctx {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

