import Vue from 'vue';
import VueRouter from "vue-router";
import Main from "../components/Main";
import Login from "../components/Login";
import Gender from "../components/Gender";
import CategoryTop from "../components/CategoryTop";
import MonthTotal from "../components/MonthTotal";
import MonthProfit from "../components/MonthProfit";
import ProductTop from "../components/ProductTop";
import ThreeMonth from "../components/ThreeMonth";
import Index from "../components/Index";

Vue.use(VueRouter);

export default new VueRouter({

  routes:[
    {
      path:'/login',
      component:Login
    },
    {
      path:'/main',
      component:Main
    },
    {
      path:'/gender',
      component:Gender
    },
    {
      path:'/category',
      component:CategoryTop
    },
    {
      path:'/total',
      component:MonthTotal
    },
    {
      path:'/profit',
      component:MonthProfit
    },
    {
      path:'/product',
      component:ProductTop
    },
    {
      path:'/three',
      component:ThreeMonth
    },
    {
      path:'/',
      redirect:'/product',
      component:Index
    },
    
  ]


});
