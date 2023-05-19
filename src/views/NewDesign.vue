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

    <div
      v-if='!form.img'
      class="form__drop-image"
      :data-active="active"
      @click="uploadFileTrigger"
      @dragenter.prevent="setActive"
      @dragover.prevent="setActive"
      @dragleave.prevent="setInactive"
      @drop.prevent="onDrop"
    >
    </div>

    <div
      v-if='form.img'
      class="form__show-image"
    >
      <img
        alt="image"
        :src="form.img"
        @click="uploadFileTrigger"
      >
    </div>

    <input 
      type="file"
      ref="uploadInput"
      class="form__image-uploader"
      @change='uploadFile'
    >
    
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
import { reactive, ref, watch } from 'vue'

export default {
  components: {ToggleButton},

  setup() {
    const route = useRoute()
    const router = useRouter()
    const designs = JSON.parse(localStorage.getItem('designs')) || []

    let editId = ref(null)
    let active = ref(false)
    let uploadInput = ref()
    let form = reactive({
      id: '',
      name: '',
      url: '',
      img: '',
      enabled: false
    })

    if (route.query?.id) {
      editId.value = route.query.id;
    }

    const indexDesign = designs.findIndex(el => el.id === editId.value)

    if (indexDesign !== -1) {
      for (const key of Object.keys(designs[indexDesign])) {
        form[key] = designs[indexDesign][key]
      }
    }

    const fr = new FileReader()
    fr.onload = () => {
      form.img = fr.result;
    }

    function setActive() {
      active.value = true
    }
    function setInactive() {
      active.value = false
    }

    function onDrop(e) {
      setInactive()
      fr.readAsDataURL(e.dataTransfer.files[0]);
    }
    
    function uploadFile(e) {
      if (e.target?.files[0]) {
        fr.readAsDataURL(e.target.files[0]);
      }
    }

    function uploadFileTrigger() {
      uploadInput.value.click()
    }

    function saveForm() {
      if (indexDesign !== -1) {
        designs.splice(indexDesign, 1, form)
        localStorage.setItem('designs', JSON.stringify(designs))
      }
      else if (!designs) {
        const newDesigns = [];
        newDesigns.push(form)
        localStorage.setItem('designs', JSON.stringify(newDesigns))
      }
      else {
        designs.push(form)
        localStorage.setItem('designs', JSON.stringify(designs))
      }

      router.push('/')
    }
    
    function deleteDesign() {
      designs.splice(indexDesign, 1)
      localStorage.setItem('designs', JSON.stringify(designs))

      router.push('/')
    }

    return {
      form,
      route,
      active,
      editId,
      uploadInput,
      onDrop,
      saveForm,
      setActive,
      uploadFile,
      deleteDesign,
      uploadFileTrigger
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

  &__drop-image {
    width: 600px;
    height: 120px;
    cursor: pointer;
    margin-bottom: 40px;
    border: 2px dashed rgba(0, 0, 0, 0.1);
    background: url('../assets/upload-background.png') center no-repeat;
  }

  &__image-uploader {
    display: none;
  }

  &__show-image {
    text-align: left;
    margin-bottom: 40px;
    
    img {
      width: auto;
      cursor: pointer;
      max-height: 240px;
    }

    input {
      display: none;
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
