<template>
  <div class="container">
    <div>哈哈哈哈</div>
    <div>
      <nuxt-link to="/register">注册</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  async mounted() {
    const ret = await this.$http.get('/demoinfo')
    // sddf
    console.log(ret.data)
  }
}
</script>
<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
