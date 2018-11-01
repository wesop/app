<template>
<Modal v-model="value">
  <div class="row items-center justify-center">
    <div class="col-5">
      <q-input
        v-model.trim="hour"
        hide-underline
        text-right
        :min="0"
        :max="23"
        placeholder="시간"
        type="number"
        :style="{ fontSize: '2rem' }"
      />
    </div>
    <div class="col-1">
      :
    </div>
    <div class="col-5">
      <q-input
        v-model.trim="min"
        hide-underline
        :min="0"
        :max="59"
        placeholder="분"
        type="number"
        :style="{ fontSize: '2rem' }"
      />
    </div>
  </div>

  <div slot="footer">
    <q-btn
      @click="close()"
      label="닫기"
    />
    <q-btn
      @click="set()"
      label="설정"
    />
  </div>
</Modal>
</template>

<script>
export default {
  name: 'TimeInputModal',

  data () {
    return {
      hour: null,
      min: null
    }
  },

  model: {
    prop: 'value'
  },

  props: {
    value: Boolean,
    time: {
      type: String,
      default: '00:00',
      required: true
    }
  },

  watch: {
    time()  {
      this.setTime();
    },

    hour()  {
      if(this.hour > 23) this.hour = 23;
      if(this.hour < 0)  this.hour = 0;

      this.hour = (this.hour + '').padStart(2, 0);
    },

    min()  {
      if(this.min > 59) this.min = 59;
      if(this.min < 0)  this.min = 0;

      this.min = (this.min + '').padStart(2, 0);
    }
  },

  methods: {
    setTime() {
      let hour = this.time.split(':')[0];
      let min = this.time.split(':')[1];

      this.hour = hour;
      this.min = min;
    },

    set() {
      this.$emit('set', `${this.hour}:${this.min}`);
      this.close();
    },

    close() {
      this.$emit('input', false);
      this.$emit('change');
    },
  },

  mounted() {
    this.setTime();
  }
}
</script>

<style lang="stylus" scoped>
.row
  *[class*="col-"]
    padding-top: 24px;
    padding-bottom: 24px;

    font-size: 2rem;
</style>
