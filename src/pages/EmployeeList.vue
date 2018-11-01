<template>
<q-page>

  <q-list v-if="empList.length" separator>
    <q-item
      v-for="(emp, index) in empList"
      :key="index">

      <q-item-side>
        <div class="image-wrap">
          <img v-if="emp.images.length"
            :src="'http://api.shop-sol.com/uploads/' + emp.images[0].IMAGE"
            alt="emp_profile" />
          <img v-else src="../assets/imgs/pserson.png" alt="emp_profile" />
        </div>
      </q-item-side>

      <q-item-main>
        <div @click="type == 1 ? viewDetail(emp) : void 0" class="emp-wrap">
          <strong class="text-blue">{{decodeURIComponent(emp.EMP_NAME)}}</strong>
          <small v-if="emp.IS_MANAGER == 1" class="text-darkblue">(매니저)</small>
          <div v-if="type == 1" class="period-wrap">
            <q-icon name="event_note"/>
            <small>{{emp.START | dateFormat('YYYY.MM.DD')}}</small>
            <small>~</small>
            <small v-if="emp.END!=null">{{emp.END | dateFormat('YYYY.MM.DD')}}</small>
             <small v-else>{{"계속"}}</small>
          </div>
          <!-- <div v-else>
            <q-icon name="event_note"/>
            <small>{{emp.CREATE_TIME | dateFormat('YYYY.MM.DD')}}</small>
          </div> -->
        </div>
      </q-item-main>

      <q-item-side v-if="type == 0">
        <div class="btn-allow-request">
          <button @click="rejectJoin(emp)" type="button" class="btn-reject">거부</button>
          <button @click="allowJoin(emp)" type="button" class="btn-accept">승인</button>
        </div>
      </q-item-side>

    </q-item>
</q-list>
 <q-list v-else>
    <q-item >
      <q-item-main>
        <div text-center>
          {{title}}이 없습니다.
        </div>
      </q-item-main>
    </q-item>
  </q-list>




 <q-list v-if="empEndList.length" separator>
     <q-item   v-if="type == 1"
      v-for="(emp, index) in empEndList"
      :key="index">

      <q-item-side>
        <div class="image-wrap">
          <img v-if="emp.images.length"
            :src="'http://api.shop-sol.com/uploads/' + emp.images[0].IMAGE"
            alt="emp_profile" />
          <img v-else src="../assets/imgs/pserson.png" alt="emp_profile" />
        </div>
      </q-item-side>

      <q-item-main>
        <div  class="emp-wrap">
          <strong class="text-blue">{{decodeURIComponent(emp.EMP_NAME)}}</strong>
          <small v-if="emp.IS_MANAGER == 1" class="text-darkblue">(매니저)</small>
          <div  class="period-wrap">
            <q-icon name="event_note"/>
            <small>{{emp.START | dateFormat('YYYY.MM.DD')}}</small>
            <small>~</small>
            <small v-if="emp.END!=null">{{emp.END | dateFormat('YYYY.MM.DD')}}</small>
             <small v-else>{{"계속"}}</small>
          </div>
          
        </div>
      </q-item-main>
      
       <q-item-side >
        <div class="btn-allow-request">
          근무종료
        </div>
      </q-item-side>
    </q-item>


  </q-list>
   <q-list v-else >
    <q-item  v-if="type == 1">
      <q-item-main>
        <div text-center>
          근무종료된 직원이 없습니다.
        </div>
      </q-item-main>
    </q-item>
  </q-list>

 

</q-page>
</template>

<script>
import storeService from '../services/store'
import empService from '../services/emp'
import Emp from '../models/emp'

export default {
  name: 'EmployeeList',

  data()  {
    return {
      title: '',

      /**
       * 합류 여부 플래그(0: 요청대기목록, 1: 매장직원목록)
       * @type {number}
       */
      type: null,
      storeSeq: '',

      /**
       * 직원 목록
       *
       * @type {Emp[]}
       */
      empList: [],
       empEndList: [],
    }
  },

  methods: {
    getEmpData()  {
      this.empList = [];

      this.getEmpList()
        .then(empList => this.empList = empList)
        .catch(err => this.showAlert(err.message));

 if(this.type === 1) {
 this.getEmpEndList()
        .then(empEndList => this.empEndList = empEndList)
        .catch(err => this.showAlert(err.message));
 }
     
    },

   getEmpEndList()  {
    return storeService.getEmpEndList(this.storeSeq);
      
    },
    /**
     * 직원 목록 조회
     * [this.type = 0 -> 요청대기목록]
     * [this.type = 1 -> 매장직원목록]
     *
     * @returns {Promise<Emp[]>}
     */
    getEmpList()  {
      if(this.type === 0) {
        //합류요청목록
        return storeService.getWaitEmpList(this.storeSeq);
      } else {
        //직원목록
        return storeService.getEmpList(this.storeSeq);
      }
    },

    /**
     * 직원 상세정보로 이동
     *
     * @param {Emp} emp
     */
    viewDetail(emp)  {
      let pageName = 'EmployeeDetail';

      // type이 0 인 경우(합류요청목록) 수정화면으로 이동
      if(this.type === 0) pageName = 'EmployeeModify';

console.log( 'emp:',emp);

      this.pagePush({
        name: pageName,
        params: {
          id: emp.EMP_SEQ
        },
        query: {
          storeSeq: this.storeSeq,
          emp,
          type: this.type,
          storefivetype :this.$route.query.storefivetype,
          PayShow :this.$route.query.PayShow,
          OtherpayShow :this.$route.query.OtherpayShow,
           isManager :this.$route.query.isManager,
        }
      })
    },

    /**
     * 합류 요청 승인
     *
     * @param {Emp} emp
     */
    allowJoin(emp)  {
      this.showAlert('합류 요청을 승인하시겠습니까?', {
        cancel: '취소',
        confirm: '승인'
      })
      .then(allow => {
        if(allow) {
          empService.allowJoin(emp.STORE_SEQ, emp.EMP_SEQ)
            .then(() => {
              this.getEmpData();
              this.showAlert(`${decodeURIComponent(emp.EMP_NAME)}님의 합류를 승인하였습니다.
                ${decodeURIComponent(emp.EMP_NAME)}님의 정보를 작성합니다.`)
                .then(() => {
                  emp.TYPE = '1';
                  this.viewDetail(emp);
                });
            })
            .catch(err => this.showAlert(err.message));
        }
      })
    },

    /**
     * 합류 요청 거절
     *
     * @param {Emp} emp
     */
    rejectJoin(emp)  {
      this.showAlert('합류 요청을 거절하시겠습니까?', {
        cancel: '취소',
        confirm: '거절'
      })
      .then(reject => {
        if(reject)  {
          empService.rejectJoin(emp.STORE_SEQ, emp.EMP_SEQ)
            .then(() => {
              this.getEmpData();
              this.showAlert(`${decodeURIComponent(emp.EMP_NAME)}님의 합류를 거절하였습니다.`);
            })
            .catch(err => this.showAlert(err.message));
        }
      });
    }
  },

  created() {
    this.storeSeq = this.$route.params.id;
    this.type = Number(this.$route.query.type);
  console.log( 'query:',this.$route.query);
    this.getEmpData();

    this.title = this.type === 0 ? '합류요청' : '직원';

    this.setHeader({
      visible: true,
      title: `${this.title}목록`,
      useBackButton: true
    });
  },

  mounted() {

  }
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.q-list {
  padding: 20px 12px;
  border-bottom: 0;

  .q-item {
    padding: 17px 0 17px 2px;
    border-color: alpha($paleblue, 30%);

    .q-item-side {
      vertical-align: middle;
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }
}

.emp-wrap {
  line-height: 24px;
}

.period-wrap {
  color: $gray;
}

.btn-allow-request {
  button {
    width: 50px;
    height: 33px;
    border: 0;
    border-radius: 2px;
    font-size: .9rem;
    color: #fff;

    &.btn-reject {
      margin-right: 5px;
      background-color: #9DB6CA;
    }

    &.btn-accept {
      background-color: $paleblue;
    }
  }
}
</style>
