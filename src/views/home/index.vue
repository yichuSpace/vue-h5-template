<!-- home -->
<template>
  <div class="index-container">
    <div class="warpper">
      <h2 class="demo-home__desc">
        A vue h5 template with Vant UI
        <router-link to="/mailList">mailList</router-link>
        <router-link to="/about">about</router-link>
        <router-link to="/about">about</router-link>
        <router-link to="/workSpace">workSpace</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },

  computed: {},

  mounted() { },

  methods: {}
}
</script>
<style lang="scss" scoped>
.index-container {
  .warpper {
    padding: 12px;
    background: #fff;
    .demo-home__title {
      margin: 0 0 6px;
      font-size: 32px;
      .demo-home__title img,
      .demo-home__title span {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 32px;
      }
      span {
        margin-left: 16px;
        font-weight: 500;
      }
    }
    .demo-home__desc {
      margin: 0 0 20px;
      color: rgba(69, 90, 100, 0.6);
      font-size: 14px;
    }
  }
}
</style>
