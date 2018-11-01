<template>
<div id="app-loader">
  <q-inner-loading dark :visible="visible">
    <q-spinner-mat size="4rem" color="white"></q-spinner-mat>
  </q-inner-loading>
</div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

