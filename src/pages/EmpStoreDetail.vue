<template>
<q-page>
  <section class="page-wrap">
    <div class="field">
      <div class="image-wrap huge">
        <img v-if="emp.images.length" :src="'http://api.shop-sol.com/uploads/' + emp.images[0].IMAGE" alt="emp_profile" />
        <img v-else src="../assets/imgs/pserson.png" alt="emp_profile" />
      </div>
      <div class="profile-wrap">
        <div class="text name-wrap">
          {{decodeURIComponent(emp.EMP_NAME)}}
          <small class="text-darkblue">
            ({{emp.IS_MANAGER != 0 ? '매니저' : '직원'}})
          </small>
        </div>
        <div class="text">
          <!-- <div>
            <small>* 매니저 권한을 부여 받은 직원은 매장관리 일부 기능을 사용할 수 있습니다.</small>
          </div> -->
        </div>
        <div class="text period-wrap">
          <span class="text-darkblue">근무기간 : </span>
          <span v-if="emp.END!=null" class="text-paleblue">{{emp.START | dateFormat('YYYY.MM.DD')}} ~ {{emp.END  | dateFormat('YYYY.MM.DD')}}</span>
           <span v-else class="text-paleblue">{{emp.START | dateFormat('YYYY.MM.DD')}} ~{{"계속"}}</span>
        </div>
      </div>
    </div>

    <div class="field">
      <div class="label">
        근무 일정
        <!-- <button @click="showHelpTimeTable" type="button">
          <q-icon name="help" color="darkblue" size="1rem" />
        </button> -->
      </div>

      <div v-if="timeTable" class="time-table-wrapper">
        <button v-if="timeTable.list.length && !timeTable.isFirst()"
          @click="timeTable.prev()"
          type="button"
          class="btn btn-prev">
          <q-icon name="keyboard_arrow_left" color="paleblue" size="2rem" />
        </button>
        <button v-if="timeTable.list.length && !timeTable.isLast()"
          @click="timeTable.next()"
          type="button"
          class="btn btn-next">
          <q-icon name="keyboard_arrow_right" color="paleblue" size="2rem" />
        </button>
        <div v-if="isOwner" class="editor-wrap">
          <button v-if="timeTable.list.length && timeTable.isFuture()" @click="removeTimetable" type="button">
            <q-icon name="delete_forever" color="em" size="1.5rem" />
          </button>
          <button v-if="timeTable.list.length && (timeTable.isFuture() || timeTable.isLast() || timeTable.isCurrent())" @click="editTimetable" type="button">
            <q-icon name="edit" color="blue" size="1.5rem" />
          </button>
          <button @click="addTimetable" type="button">
            <q-icon name="add" color="paleblue" size="1.5rem" />
          </button>
        </div>
        <h4 v-if="timeTable.list.length">
          {{timeTable.selected.start| dateFormat('YYYY.MM.DD')}} ~ {{timeTable.selected.end| dateFormat('YYYY.MM.DD')}}
          {{timeTable.isCurrent() ? '(현재)' : ''}}
        </h4>
        <Timetable v-if="timeTable.list.length" :timeTable="timeTable.selected" />
      </div>

    </div>

    <div v-if="show=='1'" class="field">
      <div class="label">근무형태 및 급여</div>
      <div class="text text-paleblue" text-right>
        <span>{{paytype}} / </span>
        <span>{{emp.PAY | currency}}</span>
        <!-- <div>
          <small>* 2018년 최저시급은 <strong class="text-em">7,530원</strong> 입니다.</small>
        </div> -->
      </div>
    </div>

    <div class="field">
      <div class="label">급여지급일</div>
      <div class="text text-paleblue" text-right>
        매월 {{emp.PAY_DAY}}일
      </div>
    </div>
  </section>

</q-page>
</template>

<script>
import empService from '../services/emp'
import scheduleService from '../services/schedule'
import TimeTableService from '../services/timetable'
import Emp from '../models/emp'
import EmpSchedule from '../models/emp-schedule'

export default {
  name: 'EmpStoreDetail',

  data()  {
    return {
      show:'',
      storeSeq: '',
      empSeq: '',
      paytype :'',
      /** @type {Emp} */
      emp: null,

      visibleTimetableAddModal: false,
      timeTable: null,
      selectedTimetable: null,

      moreButtons: [],

      sliderIndex: 0,
      images: []
    }
  },

  watch: {
    visibleTimetableAddModal(value)  {
      if(!value)  this.selectedTimetable = null;
    },
  },

  methods: {
    /**
     * 직원 정보 조회
     *
     * @returns {Promise<Emp>}
     */
    getEmp(empSeq)  {
      return empService.get2(empSeq);
    },

    /**
     * 직원 일정 정보 조회
     *
     * @returns {Promise<EmpSchedule[]>}
     */
    getEmpSchedules()  {
      return empService.getSchedules(this.empSeq);
    },

    showHelpTimeTable() {
      // this.showAlert(`과거 시간표는 수정과 삭제를 할 수 없습니다.
      //   현재 시간표는 수정하면 새로운 시간표로 생성됩니다.
      //   미래 시간표는 삭제와 수정이 가능합니다.
      // `)
    },

    removeTimetable() {
      this.showAlert('한 번 삭제하면 다시 등록해야 합니다.\n정말로 삭제하시겠습니까?', {
        cancel: '취소',
        confirm: '삭제'
      })
      .then(remove => {
        if(remove)  {
          let schedules = this.timeTable.selected.schedules;

          schedules.forEach(sch => sch && (sch.USE_FLAG = '0'));

          empService.updateSchedules(schedules)
            .then(() => {
              setTimeout(() => {
                this.showAlert('시간표를 삭제했습니다.');
                this.timeTable.delete(this.timeTable.index);
              }, 0);
            })
            .catch(() => {
              this.showAlert('시간표 삭제에 문제가 생겼습니다.');
            });
        }
      });
    },

    editTimetable()  {
      this.selectedTimetable = this.timeTable.selected;
      this.visibleTimetableAddModal = true;
    },

    addTimetable()  {
      this.selectedTimetable = null;
      this.visibleTimetableAddModal = true;
    },

    /**
     * @param {TimeTable} timetable
     */
    insertCompleteTimetable(timetable) {
      this.timeTable.add(timetable);
    },

    /**
     * @param {TimeTable} timetable
     */
    updateCompleteTimetable(timetable) {
      this.timeTable.update(timetable);
    },
  },

  created() {
    console.log( 'route:',this.$route);
     this.show =  this.$route.query.payShow;
   // this.emp = this.$route.query.emp;//emp
    this.empSeq = this.$route.params.id; //empid
    this.storeSeq = this.$route.query.storeSeq; //storeid
    //  this.END=this.$route.query.end;
    //  this.START=this.$route.query.start;
    //  this.IS_MANAGER=this.$route.query.isManager;
   
    // this.PAY_DAY=this.$route.query.payDay;
    // this.PAY=this.$route.query.pay;
    //  this.PAY_TYPE=this.$route.query.payType;

//this.EMP_NAME=this.$route.query
 //this.images=this.$route.query.images;

    //console.log('this.user:',this.user);
   //  console.log('this.$route:',this.$route);



    this.getEmp(this.empSeq)
      .then(emp => {
            console.log('get.emp:',emp);
          this.emp =  emp[0]; 
          console.log('this.emp',this.emp);
            if(this.emp.PAY_TYPE == '2'){
  this.paytype = '월급';
}else if(this.emp.PAY_TYPE == '1'){
  this.paytype = '일급';
}else{
  this.paytype = '시급';
}
          })
           .catch(err => this.showAlert(err.message)); 

    this.getEmpSchedules()
      .then(empSchedules => {
        this.timeTable = new TimeTableService(empSchedules);
        // this.timeTables = empService.createTimeTables(empSchedules);
        // this.selectedTimeTable = this.timeTables[this.timeTables.length - 1];
      })
      .catch(err => this.showAlert(err.message));

// console.log('this.user',this.user);
// console.log('this.emp',this.emp);
// console.log('this.$route.query',this.$route.query);
//   console.log('this.timeTable-----',this.timeTable);
   

    this.setHeader({
      visible: true,
      title: '직원정보',
      useBackButton: true,
    });
     //console.log('this.emp',this.emp);
  

  },
}
</script>

<style lang="stylus" scoped>
@import "../css/themes/common.variables.styl"

.page-wrap {
  padding: 20px 23px 0;
  color: $darkblue;
}

.q-item
  padding 1.4em 1em 0
  font-size 1em

.image-wrap {
  display: inline-block;
}

&.profile-wrap {
  display: inline-block;
  vertical-align: top;
  font-size: 1rem;

  .name-wrap {
    margin-top: 8px;
    margin-bottom: 10px;
    font-size: 1.5rem;
    font-weight: 600;
    color: $darkblue;
  }

  .period-wrap {
    margin-top: 10px;
    font-size: .7rem;
  }
}

.field {
  margin: .7em 0;
  padding-bottom: .5em;
  border-bottom: 1px solid #AACEDD;

  .label {
    margin-left: 8px;
    margin-bottom: 4px;
    font-size: .9rem;
    font-weight: 800;
  }

  .text {
    margin-left: 8px;
  }

  &:last-of-type {
    border: 0;
  }
}

.time-table-wrapper {
  padding-top: 1rem;
  position: relative;

  .btn {
    position: absolute;
    top: 1rem;
    line-height: 36px;

    &.btn-prev {
      left: 0;
    }

    &.btn-next {
      right: 0;
    }
  }

  .editor-wrap {
    position: absolute;
    top: -1rem;
    right: 0;

    button {
      width: 30px;
      height: 30px;
    }
  }

  h4 {
    margin: 0;
    text-align: center;
    line-height: 36px;
    font-size: 1rem;
    color: $paleblue;
  }
}

</style>
