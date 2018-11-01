<template>
<q-page padding>

</q-page>
</template>

<script>
export default {
  name: 'ScheduleDetail',

  data()  {
    return {
      scheduleId: null,
    }
  },

  created() {
    this.scheduleId = this.$route.params.id;
  }
}
</script>

<style>
</style>
