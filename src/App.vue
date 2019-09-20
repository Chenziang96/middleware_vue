<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    pushRoute(){
      this.$router.push('/login');
    }
  },
  mounted() {
    // this.pushRoute();
  },
}
</script>

<style scoped>
</style>
