<template>
<q-page padding>
  <OwnerCards v-if="stores" :list="stores" />
</q-page>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Main',

  data()  {
    return {
      stores: null,
      today: new Date
    }
  },

  methods: {
    getStores() {
      return this.$service.store.list(this.user);
    },

    /**
     * 합류 요청 대기 직원 목록 조회
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<Emp[]>}
     */
    getWaitEmpList(storeSeq, type)  {
      
      return this.$service.store.getWaitEmpList(storeSeq);
    },

    /**
     * 직원 목록 조회
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<Emp[]>}
     */
    getEmpList(storeSeq)  {
      return this.$service.store.getEmpList(storeSeq);
    },
  getEmpSize(storeSeq)  {
      return this.$service.store.getEmpSize(storeSeq);
    },
    /**
     * 현재 근무중인 직원 조회
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<{ EMP_ID: string, EMP_NAME: string }[]>}
     */
    getWorkingEmpList(storeSeq)  {
      return this.$service.store.getWorkingEmpList(storeSeq);
    },

    getWorkingEmpTotalPay(storeSeq)  {
      return this.$service.store.getWorkingEmpTotalPay(storeSeq);
    },


  getWorkingEmpStackedPay(storeSeq)  {
      return this.$service.store.getWorkingEmpStackedPay(storeSeq);
    },

  },

  async created() {
   // storeSeq.TOEKN = appService.getDeviceToken();
    this.$isBack = false;
    //this.setFooter({ visible: true });
    this.setHeader({
      visible: true,
      buttons: [],
      useBackButton: false
    });

    this.setBackButtonHandler(() => {
      this.exit();
    });

    this.today.setHours(0, 0, 0, 0);

    this.$service.app.loader.show();

    try {
      let stores = await this.getStores();

      for(let index = 0; index < stores.length; index++)  {
        const store = stores[index];
        const empList = new Map;




        // let payDatas = await this.getPayDatas(store.STORE_SEQ, store.EMP_SEQ);
        // let totalPay = 0;
        // Object.keys(payDatas.LIST).forEach(date => {
        //   totalPay += payDatas.LIST[date].payment;
        // });

 store.empsize = await this.getEmpSize(store.STORE_SEQ) || [];


        store.closeNearEmpList = [];
         store.empList = await this.getEmpList(store.STORE_SEQ) || [];
       
//console.log('store.empList:',store.empList);
        store.empList.forEach(emp => {
          empList.set(emp.EMP_SEQ, emp);

          emp.isWorking = false;

          // emp.isEnd  = true;
console.log('END:',emp.END);
 if(emp.END) {
    let haveContractTime = moment(emp.END).toDate().getTime() - this.today.getTime();

              if(haveContractTime < 0) {
          
                emp.isEnd  = true;
              }

 }
           
          if(emp.isEnd!= true &&emp.END && (moment(emp.END).toDate().getTime() - this.today.getTime()) <= (60 * 60 * 24 * 30 * 1000)) {
            store.closeNearEmpList.push(emp);
          }
        });

        //합류요청 직원
        store.waitEmpList = await this.getWaitEmpList(store.STORE_SEQ) || [];
        //근무중인 직원 
        store.workingEmpList = await this.getWorkingEmpList(store.STORE_SEQ) || [];

         store.empTotalpay = await this.getWorkingEmpTotalPay(store.STORE_SEQ) || [];
    //     store.empStackedPay = await this.getWorkingEmpStackedPay(store.STORE_SEQ) || [];



        console.log('store.empTotalpay:',store.empTotalpay);
        console.log('store.waitEmpList:',store.waitEmpList);
        console.log('store.workingEmpList:',store.workingEmpList);


        store.workingEmpList = store.workingEmpList.map(_emp => {
           console.log('_emp:',_emp);
          /**
           * EMP_ID and EMP_SEQ is equal
           */
          const emp = empList.get(_emp.EMP_ID);

          emp.isWorking = true;

          return emp;
        });
      }

      this.stores = stores;

      this.user.stores = this.stores;

      this.setUser(this.user);
    } catch (err) {
      this.showAlert(err.message);
    }

    this.$service.app.loader.hide();
  },

  mounted() {

  }
}
</script>

<style lang="stylus" scoped>

</style>

