<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  props: {
    //
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: false
    },
    // 是否监听滚动
    listenScroll: {
      type: Boolean,
      default: false
    },
    // 是否监听上拉加载
    listenPullingUp: {
      type: Boolean,
      default: false
    },
    // 是否监听上拉加载
    listenPullingDown: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pullup: {
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    // 滚动方向
    direction: {
      type: String,
      default: DIRECTION_V
    },
    // 上拉加载配置项
    pullUpLoad: {
      type: Object,
      default: null
    },
    // 下拉刷新配置项
    pullDownRefresh: {
      type: [Boolean, Object],
      default: false
    },
    scrollbar: {
      type: [Boolean, Object],
      default: false
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V,
        scrollbar: this.scrollbar,
        pullUpLoad: this.pullUpLoad,
        pullDownRefresh: this.pullDownRefresh
      })
      // 滚动过程中，具体时机取决于选项中的 probeType。
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
      // 滚动结束
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd')
          }
        })
      }
      // 滚动开始之前
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
      // 上拉加载
      if (this.listenPullingUp) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
      if (this.listenPullingDown) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullingDown')
          // setTimeout(() => {
          // // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
          //   this.scroll.finishPullDown()
          // }, 2000)
        })
      }
    },
    // 禁用 better-scroll
    disable() {
      this.scroll && this.scroll.disable()
    },
    // 启用 better-scrol
    enable() {
      this.scroll && this.scroll.enable()
    },
    // 重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 滚动到指定的位置
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 滚动到指定的目标元素
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    // 完成下拉刷新
    finishPullDown() {
      this.scroll && this.scroll.finishPullDown()
    },
    // 完成上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        if (this.listenPullingUp) {
          this.finishPullUp()
        }
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
