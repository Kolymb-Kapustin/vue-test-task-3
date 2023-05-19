<template>
<div class="home">
  <header class="home__header">
    <h1 class="home__title">Всі дізайни</h1>

    <router-link
      to="/add-design"
      class="button home__add-new-design"
    >
      Додати дизайн
    </router-link>
  </header>

  <div class="home__design-list">
    <design-list/>
  </div>
</div>
</template>

<script setup>
import DesignList from '../components/DesignList.vue'
</script>

<style lang="less">
.home {
  width: 100%;
  min-height: 100vh;
  color: #fff;
  padding: 0 12px;
  background: #2C3D39;
  box-sizing: border-box;

  &__header {
    display: flex;
    margin-bottom: 20px;
    align-items: center;
    padding: 20px 12px 0;
    justify-content: space-between;
  }
}
</style>
