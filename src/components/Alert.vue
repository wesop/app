<template>
<div id="app-loader">
  <Modal v-model="visible">
    <!-- message start -->
    <div v-html="message.replace(/\n/gi, '<br>')" style="padding: 2em 0; font-size: 1rem"></div>
    <!-- message end -->

    <div slot="footer">
      <!-- button start -->
      <q-btn
        v-show="!buttons.length"
        @click="onClick($event)"
        label="확인"
        class="needsclick" />

      <q-btn
        v-if="buttons.length"
        v-for="button in buttons"
        :key="button.label"
        @click="onClick($event, button.click)"
        :icon="button.icon"
        :class="button.class"
        :label="button.label"
        class="needsclick" />
      <!-- button end -->
    </div>
  </Modal>
</div>
</template>

<script>
export default {
  name: 'Alert',
}
</script>
