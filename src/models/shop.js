import Backbone from 'backbone'
import Location from './location'
import { SHOP_STATUS } from './public'

const Shop = Backbone.Model.extend({
  defaults: {
    status: SHOP_STATUS.REJECTED,
    name: '',
    categories: new Backbone.Collection([]),
    zipCode: '',
    addr1: '',
    addr2: '',
    addr: '',
    tel: '',
    owners: new Backbone.Collection([]),
    workers: new Backbone.Collection([]),
    BN: '',
    pictures: new Backbone.Collection([]),
    location: new Location,
  }
});

export default Shop;
