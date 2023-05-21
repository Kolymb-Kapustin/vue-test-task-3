<template>
  <nav>
    <router-link to="/">
      <img src="@/assets/img/logo.svg" alt="logo">
    </router-link>
  </nav>

  <div class="router">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style lang='less'>
nav {
  width: 40px;
  padding: 9px 0;
  background: #627B7A;

  a {
    width: 100%;
    height: auto;
  }
}

.router {
  min-height: 100vh;
  width: calc(100vw - 40px);
}
</style>
