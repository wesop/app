<template>
<q-page padding>
  <WorkerCards v-if="stores" :list="stores" />
</q-page>
</template>

<script>
import moment from 'moment'
import AppLoader from '../components/Loader'
import storeService from '../services/store'
import empService from '../services/emp'
import TimeTableService from '../services/timetable'
import scheduleService from '../services/schedule'
import Store from '../models/store'
import EmpSchedule from '../models/emp-schedule'

export default {
  name: 'WorkerMain',

  data()  {
    return {
      stores: null,
      today: new Date,
    }
  },

  methods: {
    /**
     * @returns {Promise<Store[]>}
     */
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
     * 직원 정보 조회
     *
     * @param {string} empSeq
     *
     * @returns {Promise<Emp>}
     */
    getEmp(empSeq)  {
      return empService.get(empSeq);
    },

    /**
     * 직원 일정 정보 조회
     *
     * @param {string} empSeq
     * @returns {Promise<EmpSchedule[]>}
     */
    getEmpSchedules(empSeq)  {
      return empService.getSchedules(empSeq);
    },

    /**
     * 합류 요청 대기 직원 목록 조회
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<Emp[]>}
     */
    getWaitEmpList(storeSeq, type)  {
      return storeService.getWaitEmpList(storeSeq);
    },

    /**
     * 직원 목록 조회
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<Emp[]>}
     */
    getEmpList(storeSeq)  {
      return storeService.getEmpList(storeSeq);
    },

    getEmpSize(storeSeq)  {
      return storeService.getEmpSize(storeSeq);
    },

    /**
     * 현재 근무중인 직원 조회
     *
     * @param {string} storeSeq
     *
     * @returns {Promise<{ EMP_ID: string, EMP_NAME: string }[]>}
     */
    getWorkingEmpList(storeSeq)  {
      return storeService.getWorkingEmpList(storeSeq);
    },
getWorkingEmpTotalPay(storeSeq)  {
      return this.$service.store.getWorkingEmpTotalPay(storeSeq);
    },
    /**
     * 급여 조회
     *
     * @param {string} storeSeq
     * @param {string} empSeq
     */
    getPayDatas(storeSeq, empSeq) {
      return empService.getPayDatas(storeSeq, empSeq, this.today);
    },
    getOneWeekSum(empSeq) {
      return empService.getOneWeekSum(empSeq);
    },
      /**
     * ㅇㅖ상급여
     *
     * @param {string} storeSeq
     * @param {string} empSeq
     */
    getEmpStackpay( empSeq,day,store) {
      return empService.getEmpStackpay( empSeq , day ,store);
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

    this.today.setHours(0, 0, 0, 0);

    AppLoader.visible = true;
    try {
      let stores = await this.getStores();

      for(let index = 0; index < stores.length; index++)  {
        let store = stores[index];
        let payDatas = await this.getPayDatas(store.STORE_SEQ, store.EMP_SEQ);
        let totalPay = 0;

        store.emp = await this.getEmp(store.EMP_SEQ) || null;

// this.user.PAY_SHOW  = store.PAY_SHOW;
//  this.user.OTHERPAY_SHOW = store.OTHERPAY_SHOW;
//console.log('worker:',store);
        Object.keys(payDatas.LIST).forEach(date => {
          totalPay += payDatas.LIST[date].payment;
        });

        if(store.emp) {
          let empSchedules = await this.getEmpSchedules(store.emp.EMP_SEQ);

          store.emp.timeTableService = new TimeTableService(empSchedules);
        }
console.log(payDatas);




if(payDatas.TYPE == '2'){
 store.totalPay = payDatas.realtotal;
}else if(payDatas.TYPE == '1'){
 store.totalPay =payDatas.realtotal;
}else{
  store.totalPay = totalPay;
}

               
                  store.empTotalpay = await this.getWorkingEmpTotalPay(store.STORE_SEQ) || [];
    //     store.empStackedPay = await this.getWorkingEmpStackedPay(store.STORE_SEQ) || [];
console.log('store.empTotalpay:',store.empTotalpay);
      store.stackpay = await this.getEmpStackpay(store.EMP_SEQ,store.CALCULATE_DAY,store.STORE_SEQ) || [];
 store.weekpay = await this.getOneWeekSum(store.EMP_SEQ) ;

console.log('=================worker:',store);
        if(store.IS_MANAGER == 1) {
          store.closeNearEmpList = [];
          const empList = new Map;


 store.empsize = await this.getEmpSize(store.STORE_SEQ) || [];


          store.empList = await this.getEmpList(store.STORE_SEQ) || [];
         
          store.empList.forEach(emp => {
            empList.set(emp.EMP_SEQ, emp);

            emp.isWorking = false;

           
console.log('END:',emp.END);
            if(emp.END) {
              let haveContractTime = moment(emp.END).toDate().getTime() - this.today.getTime();

              if(haveContractTime < 0) {
                store.emp.CONTRACT_END = true;
                emp.isEnd  = true;
              } else if(haveContractTime <= (60 * 60 * 24 * 30 * 1000)) {
                store.emp.haveContractDate = haveContractTime / 1000 / (3600 * 24);
                store.closeNearEmpList.push(emp);
              }
              
            }


          });

            //합류요청 직원
          store.waitEmpList = await this.getWaitEmpList(store.STORE_SEQ) || [];
          //근무중인 직원 
          store.workingEmpList = await this.getWorkingEmpList(store.STORE_SEQ) || [];

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
      }

      this.stores = stores;

      this.user.stores = this.stores;

      this.setUser(this.user);
    } catch (err) {
      console.warn(err);
      this.showAlert(err.message);
    }
    AppLoader.visible = false;
  },

  mounted() {

  }
}
</script>

<style>
</style>
