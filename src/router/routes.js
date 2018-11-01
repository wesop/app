import { RouteConfig } from 'vue-router';

/**
 * @type {RouteConfig[]}
 */
const routes = [
  {
    path: '/',
    component: () => import('layouts'),
    children: [
      {
        path: '',
        redirect: 'Login'
      },
      {
        path: 'Login',
        name: 'Login',
        component: () => import('pages/Login'),
      },

      {
        path: 'Signup/Privacy',
        name: 'SignupPrivacy',
        component: () => import('pages/SignupPrivacy'),
      },
      {
        path: 'Signup/Certify',
        name: 'SignupCertify',
        component: () => import('pages/SignupCertify'),
      },
      {
        path: 'Signup/TypeSelect',
        name: 'SignupTypeSelect',
        component: () => import('pages/SignupTypeSelect'),
      },
      {
        path: 'Signup/Form',
        name: 'SignupForm',
        component: () => import('pages/SignupForm'),
      },

      {
        path: 'Find',
        name: 'Find',
        component: () => import('pages/Find'),
      },
      {
        path: 'UserUpdate2',
        name: 'UserUpdate2',
        component: () => import('pages/UserUpdate2'),
      },
    ],
  },

  {
    path: '/Main',
    component: () => import('layouts'),
    children: [
      {
        path: '',
        name: 'Main',
        component: () => import('pages/Main')
      },

      {
        path: 'Worker',
        name: 'WorkerMain',
        component: () => import('pages/WorkerMain')
      },

      {
        path: 'Schedule',
        name: 'Schedule',
        component: () => import('pages/Schedule'),
        children: [
          {
            path: '',
            name: 'ScheduleCalendar',
            component: () => import('pages/ScheduleCalendar')
          },
          {
            path: 'EmpCalendar',
            name: 'ScheduleEmpCalendar',
            component: () => import('pages/ScheduleEmpCalendar')
          }
        ]
      },
      {
        path: 'Schedule/Regist',
        name: 'ScheduleRegist',
        component: () => import('pages/ScheduleRegist')
      },

      {
        path: 'Store',
        name: 'Store',
        component: () => import('pages/Store'),
      },
      {
        path: 'Store/Search',
        name: 'StoreSearch',
        component: () => import('pages/StoreSearch'),
      },
      {
        path: 'Store/:id/Modify',
        name: 'StoreModify',
        component: () => import('pages/StoreRegister'),
      },
      {
        path: 'Store/Register',
        name: 'StoreRegister',
        component: () => import('pages/StoreRegister'),
      },
      {
        path: 'Store/:id',
        name: 'StoreDetail',
        component: () => import('pages/StoreDetail'),
      },

      {
        path: 'Store/Employee/:id/List',
        name: 'EmployeeList',
        component: () => import('pages/EmployeeList')
      },
      {
        path: 'Store/Employee/:id',
        name: 'EmployeeDetail',
        component: () => import('pages/EmployeeDetail')
      },
      {
        path: 'Store/:id/Detail',
        name: 'EmpStoreDetail',
        component: () => import('pages/EmpStoreDetail')
      },
      {
        path: 'Store/Employee/:id/Modify',
        name: 'EmployeeModify',
        component: () => import('pages/EmployeeModify')
      },
      {
        path: 'Store/Employee/:id/Sincerity',
        name: 'EmployeeSincerity',
        component: () => import('pages/EmployeeSincerity')
      },
      {
        path: 'Store/Employee/:id/Pay',
        name: 'EmployeePay',
        component: () => import('pages/EmployeePay')
      },
      {
        path: 'Store/Employee/:id/Pay/Detail',
        name: 'EmployeePayDetail',
        component: () => import('pages/EmployeePayDetail')
      },

      {
        path: 'Interview',
        name: 'Interview',
        component: () => import('pages/Interview')
      },
      {
        path: 'Interview/:id/Regist/RealTime',
        name: 'InterviewRegistRealTime',
        component: () => import('pages/InterviewRegistRealTime')
      },
      {
        path: 'Interview/:id/Modify/RealTime',
        name: 'InterviewModifyRealTime',
        component: () => import('pages/InterviewRegistRealTime')
      },
      {
        path: 'Interview/:id/Regist',
        name: 'InterviewRegist',
        component: () => import('pages/InterviewRegist')
      },
      {
        path: 'Interview/:id/Modify',
        name: 'InterviewModify',
        component: () => import('pages/InterviewRegist')
      },
      {
        path: 'Interview/Worker/RealTime/:id',
        name: 'RealTimeWorkerDetail',
        component: () => import('pages/RealTimeWorkerDetail')
      },
      {
        path: 'Interview/Worker/:id',
        name: 'WorkerDetail',
        component: () => import('pages/WorkerDetail')
      },
      {
        path: 'JobOffer',
        name: 'JobOffer',
        component: () => import('pages/JobOffer')
      },
      {
        path: 'JobOffer/Store/RealTime/:id',
        name: 'JobOfferRealTimeStoreDetail',
        component: () => import('pages/JobOfferRealTimeStoreDetail')
      },
      {
        path: 'JobOffer/Store/:id',
        name: 'JobOfferStoreDetail',
        component: () => import('pages/JobOfferStoreDetail')
      },
      {
        path: 'JobOffer/Resume/RealTime/:mode',
        name: 'ResumeRealTimeRegist',
        component: () => import('pages/ResumeRealTimeRegist')
      },
      {
        path: 'JobOffer/Resume/:mode',
        name: 'ResumeRegist',
        component: () => import('pages/ResumeRegist')
      },

      {
        path: 'QR',
        name: 'QR',
        component: () => import('pages/QR')
      },
      {
        path: 'QR/QRCheckList',
        name: 'QRCheckList',
        component: () => import('pages/QRCheckList')
      },
      {
        path: 'QRCheck',
        name: 'QRCheck',
        component: () => import('pages/Check')
      },
      {
        path: 'QRCheck/CheckDetail',
        name: 'CheckDetail',
        component: () => import('pages/CheckDetail')
      },
      {
        path: 'QRCheck/CheckRegister',
        name: 'CheckRegister',
        component: () => import('pages/CheckRegister')
      },
      
      {
        path: 'MyInfo',
        name: 'MyInfo',
        component: () => import('pages/MyInfo')
      },

      {
        path: 'MyInfo/UserUpdate',
        name: 'UserUpdate',
        component: () => import('pages/UserUpdate')
      },
    ],
  },


  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]

export default routes;
