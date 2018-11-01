<template>
<label :for="id">
  <input :id="id" :name="name" ref="checkbox" type="checkbox" />
  <span>
    <slot></slot>
  </span>
</label>
</template>

<script>
export default {
  name: 'Checkbox',

  data () {
    return {
      id: (Math.random() * Number.MAX_SAFE_INTEGER).toString(36).split('.')[0]
    }
  },

  props: {
    name: {
      type: String,
      default: 'checkbox',
      required: false,
    }
  },

  method: {
    // $refs.checkbox
  }
}
</script>

<style lang="less" scoped>
input[type="checkbox"] {  }
</style>
