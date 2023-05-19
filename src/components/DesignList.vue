<template>
  <ul class="design-list">
    <template v-for="design in designs">
      <li 
        v-if="design?.enabled"
        class="design-list__item"
        :key="design.id"
      >
        <div class="design-list__img">
          <img
            alt="img"
            :src="design.img"
            @click="designEdit(design.id)"
          >
        </div>
  
        <div class="design-list__item-footer">
          <div class="design-list__item-id">{{ design.id }}</div>
          <div class="design-list__item-name">{{ design.name }}</div>
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const designs = JSON.parse(localStorage.getItem('designs')) || []

    function designEdit(payload) {
      router.push({
        name: 'add-design',
        query: {
          id: payload
        }
      })
    }

    return {
      designs,
      designEdit
    }
  }
}
</script>

<style lang="less">
.design-list {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;

  
  &__item {
    width: 25%;
    padding: 10px;
    cursor: pointer;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    img {
      width: 100%;
      height: auto;
      max-width: 100%;
      max-height: 400px;
    }
  }

  &__item-footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__item-id {
    color: #000;
    border-radius: 8px;
    background: #FFFFFF;
    padding: 0 8px;
    font-size: 11px;
  }

  &__item-name {
    font-size: 16px;
    margin-left: 8px;
  }
}
</style>
