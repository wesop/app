import Vue from 'vue'
import VueCurrencyFilter from 'vue-currency-filter'

export default ({ Vue }) => {
  Vue.use(VueCurrencyFilter, {
    symbol: '원',
    symbolPosition: 'back',
    thousandsSeparator: ','
  });
}
