<template>
<div class="new-design">
  <div class="new-design__buttons">
    <button
      v-if="editId"
      class="new-design__delete-button button button--delete"
      @click="deleteDesign"
    >
      Видалити
    </button>

    <button
      class="new-design__save-button button"
      @click="saveForm"
    >
      Зберігти та вийти
    </button>
  </div>

  <form
    class="new-design__form form"
    @submit.prevent
  >
    <div class="form__status">
      <ToggleButton v-model="form.enabled"/>
      
      <div class="form__status-text">
        {{ form.enabled ? 'Опублікований' : 'Неопублікований' }}
      </div>
    </div>

    <upload-image v-model="form.imgs"/>

    <div class="form__fields">
      <input 
        v-model="form.id"
        placeholder="###"
        class="form__id"
        type="text"
      >
      <input
        v-model="form.name"
        type="text"
        class="form__name"
        placeholder="Назва дизайну"
      >
      <input
        v-model="form.url"
        placeholder="https://design###.horoshop.ua/"
        class="form__url"
        type="text"
      >
    </div>
  </form>
</div>
</template>

<script>
import ToggleButton from '@vueform/toggle'
import { useRouter, useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import UploadImage from '@/components/UploadImage.vue'

import {getDesigns, getDesign, setDesigns, deleteDesign as deleteDesignApi} from '@/assets/js/api.js'

export default {
  components: {ToggleButton, UploadImage},

  setup() {
    const route = useRoute()
    const router = useRouter()
    const designs = getDesigns()

    let editId = ref(null)
    let active = ref(false)
    let form = reactive({
      id: '',
      name: '',
      url: '',
      imgs: [],
      enabled: false
    })

    if (route.query?.id) {
      editId.value = route.query.id;
      const currentDesign = getDesign(editId.value);

      for (const key of Object.keys(currentDesign)) {
        form[key] = currentDesign[key]
      }
    }

    function saveForm() {
      setDesigns(form)
      router.push('/')
    }
    
    function deleteDesign() {
      deleteDesignApi(editId.value);
      router.push('/')
    }

    return {
      form,
      route,
      active,
      editId,
      saveForm,
      deleteDesign,
    }
  }
}
</script>

<style lang="less">
.new-design {
  &__buttons {
    top: 24px;
    right: 32px;
    position: absolute;
    display: flex;
  }

  &__delete-button {
    margin-right: 8px;
  }
}

.form {
  display: flex;
  max-width: 600px;
  margin-top: 24px;
  margin-left: 120px;
  flex-direction: column;

  &__status-text {
    margin-left: 10px;
  }

  &__status {
    display: flex;
    margin-bottom: 40px;

    .toggle {
      width: 64px;
    }

    .toggle-container:focus {
      box-shadow: none;
    }
  }

  &__fields {
    display: flex;
    flex-wrap: wrap;

    input {
      padding: 0 12px;
      height: 32px;
      border-radius: 3px;
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.2);
      margin-bottom: 24px;

      &::placeholder {
        color: rgba(0, 0, 0, 0.2);
      }
    }
  }

  &__id {
    width: 80px;
    margin-right: 8px;
  }

  &__name {
    flex-grow: 1;
  }

  &__url {
    width: 100%;
  }
}
</style>
