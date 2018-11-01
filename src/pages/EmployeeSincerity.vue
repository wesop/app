<template>
<q-page padding>
  <!-- content -->
</q-page>
</template>

<script>
export default {
  name: 'EmployeeSincerity',

  data()  {
    return {
      employeeId: '',
    }
  },

  mounted() {
    this.employeeId = this.$route.params.id;

    this.setHeader({
      visible: true,
      title: '성실도 확인',
      buttons: [],
      useBackButton: true
    });
  }
}
</script>

<style>
</style>
