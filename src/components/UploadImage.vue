<template>
<div class="upload-image">
  <div class="upload-image__list">
    <div
      v-for="(img, i) in modelValue"
      :key="i"
      class="upload-image__list-item"
    >
      <img
        :src="img"
        alt="image"
      >

      <div
        class="upload-image__delete-button"
        @click="deleteImg(i)"
      ></div>
    </div>

    <div
      class="upload-image__drop-image"
      :class="{'upload-image__drop-image--add': modelValue.length}"
      :data-active="active"
      @click="uploadFileTrigger"
      @dragenter.prevent="setActive"
      @dragover.prevent="setActive"
      @dragleave.prevent="setInactive"
      @drop.prevent="onDrop"
    >
    </div>
  </div>

  <div v-if="validationText" class="upload-image__error-text">{{ validationText }}</div>

  <input 
    type="file"
    ref="uploadInput"
    class="upload-image__image-uploader"
    @change='uploadFile'
  >
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ['update:modelValue'],

  props: {
    modelValue: Array
  },

  setup(props, { emit }) {
    const active = ref('')
    const uploadInput = ref()
    const validationText = ref('')
    const fr = new FileReader()
    
    fr.onload = () => {
      const result = props.modelValue.concat([fr.result]);
      emit('update:modelValue', result)
    }

    function validation(file) {
      if (file.type.includes('image')) {
        fr.readAsDataURL(file);
        validationText.value = ''
      }
      else {
        validationText.value = 'Ви можете завантижити тілки картинки'
      }
    }

    function setActive() {
      active.value = true
    }

    function setInactive() {
      active.value = false
    }

    function onDrop(e) {
      setInactive()
      validation(e.dataTransfer.files[0])
    }

    function uploadFile(e) {
      if (e.target?.files[0]) {
        validation(e.target.files[0])
      }
    }

    function uploadFileTrigger() {
      uploadInput.value.click()
    }

    function deleteImg(i) {
      // only for not multi-dimensional arrays
      const itemsToChange = [...props.modelValue];
      itemsToChange.splice(i, 1)
      emit('update:modelValue', itemsToChange)
    }

    return {
      active,
      uploadInput,
      validationText,
      onDrop,
      setActive,
      deleteImg,
      uploadFile,
      setInactive,
      uploadFileTrigger
    }
  }
}
</script>

<style lang="less">
.upload-image {
  margin-bottom: 32px;

  &__error-text {
    color: lighten(#990000, 50%);
  }

  &__drop-image {
    width: 600px;
    height: 120px;
    cursor: pointer;
    border: 2px dashed rgba(0, 0, 0, 0.1);
    background: url('../assets/img/upload-background.png') center no-repeat;

    &--add {
      width: 120px;
      height: 120px;
      background: none;
      position: relative;

      &::before, &::after {
        top: 50%;
        left: 50%;
        content: '';
        width: 30px;
        height: 2px;
        position: absolute;
        border-radius: 1px;
        background: #C4C4C4;
        transform: translateY(-50%) translateX(-50%);
      }

      &::after {
        width: 2px;
        height: 30px;
      }
    }
  }

  &__image-uploader {
    display: none;
  }

  &__delete-button {
      right: 4px;
      bottom: 4px;
      width: 24px;
      height: 24px;
      display: none;
      cursor: pointer;
      border-radius: 3px;
      position: absolute;
      background: url('../assets/img/delete.svg') rgba(0, 0, 0, 0.5) center no-repeat;
      background-size: 12px 14px;
  }

  &__list-item {
    display: flex;
    margin-right: 8px;
    position: relative;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 8px;
    
    img {
      width: 100%;
      width: 120px;
      align-self: start;
    }

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);

      .upload-image__delete-button {
        display: flex;
      }
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;

    input {
      display: none;
    }
  }
}
</style>