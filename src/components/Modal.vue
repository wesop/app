<template>
<q-modal v-model="visible"
  :minimized="minimized"
  :maximized="maximized"
  :no-route-dismiss="noRouteDismiss"
  :no-esc-dismiss="noEscDismiss"
  :no-backdrop-dismiss="noBackdropDismiss"
  :content-css="contentCss"
  :content-classes="contentClasses"
  :position="position"
  :position-classes="positionClasses"
  :transition="transition"
  :enter-class="enterClass"
  :leave-class="leaveClass">
  <div class="modal-wrap">
    <div class="layout-padding">
      <slot></slot>
    </div>

    <q-toolbar slot="footer" color="blue">
      <q-btn-group>
        <slot name="footer"></slot>
      </q-btn-group>
    </q-toolbar>
  </div>
</q-modal>
</template>

<script>
export default {
  name: 'Modal',

  data()  {
    return {
      visible: false,
    }
  },

  model: {
    prop: 'value'
  },

  props: {
    'value': Boolean,

    'minimized': {
      type: Boolean,
      required: false,
      default: true
    },
    'maximized': {
      type: Boolean,
      required: false,
      default: false
    },
    'noRouteDismiss': {
      type: Boolean,
      required: false,
      default: false
    },
    'noEscDismiss': {
      type: Boolean,
      required: false,
      default: true
    },
    'noBackdropDismiss': {
      type: Boolean,
      required: false,
      default: true
    },
    'contentCss': {
      type: Object,
      required: false,
      default: () => ({ minWidth: '80%' })
    },
    'contentClasses': {
      type: Object,
      required: false,
      default: null
    },
    'position': {
      type: String,
      required: false,
      default: ''
    },
    'positionClasses': {
      type: String,
      required: false,
      default: 'items-center justify-center'
    },
    'transition': {
      type: String,
      required: false,
      default: ''
    },
    'enterClass': {
      type: String,
      required: false,
      default: ''
    },
    'leaveClass': {
      type: String,
      required: false,
      default: ''
    },
  },

  computed: {

  },

  watch: {
    value() {
      this.visible = this.value;
    },

    visible() {
      this.$emit('input', this.visible);
      this.$emit('change');
    }
  },

  methods: {
    onHide()  {

    }
  },

  created() {
    this.visible = this.value;
  },

  mounted() {

  }
}
</script>

<style lang="stylus" scoped>
.modal-wrap
  position: relative;

.modal .modal-content
  & > div
    padding-bottom 44px
    height 100%

    .layout-padding
      height 100%
      padding-top 1em
      padding-bottom 0

  .q-toolbar
    position absolute
    bottom 0
</style>
