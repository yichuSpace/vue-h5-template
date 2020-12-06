<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <FooterBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import FooterBar from '@/components/Layout/FooterBar'
export default {
  name: 'AppLayout',
  data() {
    return {
      tabbars: [{
        title: '首页',
        to: {
          name: 'Home'
        },
        icon: 'home-o'
      }, {
        title: '办公',
        to: {
          name: 'WorkSpace'
        },
        icon: 'home-o'
      },
      {
        title: '通讯录',
        to: {
          name: 'MailList'
        },
        icon: 'home-o'
      },
      {
        title: '我的',
        to: {
          name: 'Mine'
        },
        icon: 'user-o'
      }
      ]
    }
  },
  components: {
    FooterBar
  },
  methods: {
    handleChange(v) {
      console.log('tab value:', v)
    }
  }
}
</script>
