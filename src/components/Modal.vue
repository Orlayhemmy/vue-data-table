<template>
  <div id='modal-component'>
    <button @click='toggleModal()'>
      {{title}}
    </button>
    <div v-if='isVisible'  class='modal-content'>
      <span v-show='isVisible' @click='toggleModal()' class='close-modal'>&#x2715;</span>
      <slot></slot>
      <div>
      <button v-show='isVisible' @click='handleSubmit()'> {{actionButtonText}} </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-component',
  props: ['actionButtonText', 'title', 'handleSubmit'],
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    toggleModal() {
      return this.isVisible = !this.isVisible
    },
  },
}
</script>
<style lang='scss' scoped>
@import '../assets/styles/modal.scss';
</style>
