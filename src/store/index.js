import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// types
const types = {
  SET_LOCATION: "SET_LOCATION",
  SET_ADDRESS: "SET_ADDRESS",
  ORDER_INFO: "ORDER_INFO",
  USER_INFO: "USER_INFO",
  REMARK_INFO: "REMARK_INFO",
  // ORDER_LIST: "ORDER_LIST"
};

// state
const state = {
  location: {},
  address: '',
  orderInfo: null,
  userInfo: null,
  remarkInfo: {
    tableware: '',
    remark: ''
  },
  // orderList: null
};

// gettesrs
const getters = {
  location: state => state.location,
  address: state => state.address,
  orderInfo: state => state.orderInfo,
  userInfo: state => state.userInfo,
  totalPrice: state => {
    let price = 0;
    if(state.orderInfo){
      const selectFoods = state.orderInfo.selectFoods;
      selectFoods.forEach(food => {
        price += (food.activity.fixed_price * food.count);
      })
      price += state.orderInfo.shopInfo.float_delivery_fee;
    }
    return price;
  },
  remarkInfo: state => state.remarkInfo,
  // orderList: state => state.orderList
};

// mutations
const mutations = {
  [types.SET_LOCATION](state, location){
    if(Location){
      state.location = location;
    } else {
      state.location = null;
    }
  },
  [types.SET_ADDRESS](state,address){
    if(address){
      state.address = address;
    } else {
      state.address = "";
    }
  },
  [types.ORDER_INFO](state,orderInfo){
    if(orderInfo){
      state.orderInfo = orderInfo;
    } else {
      state.orderInfo = null;
    }
  },
  [types.USER_INFO](state, userInfo){
    if(userInfo){
      state.userInfo = userInfo;
    } else {
      state.userInfo = null;
    }
  },
  [types.REMARK_INFO](state, remarkInfo){
    if(remarkInfo){
      state.remarkInfo = remarkInfo;
    } else {
      state.remarkInfo = null;
    }
  },
  // [types.ORDER_LIST](state, orderList){
  //   if(orderList){
  //     state.orderList = orderList;
  //   } else {
  //     state.orderList = null;
  //   }
  // },
};

// actions
const actions = {
  setLocation: ({ commit }, location) =>{
    commit(types.SET_LOCATION,location);
  },
  setAddress: ({ commit }, address) =>{
    commit(types.SET_ADDRESS, address);
  },
  setOrderInfo: ({ commit }, orderInfo) =>{
    commit(types.ORDER_INFO, orderInfo);
  },
  setUserInfo: ({ commit }, userInfo) =>{
    commit(types.USER_INFO, userInfo);
  },
  setRemarkInfo: ({ commit }, remarkInfo) =>{
    commit(types.REMARK_INFO, remarkInfo);
  },
  // setOrderList: ({ commit }, orderList) =>{
  //   commit(types.ORDER_LIST, orderList);
  // },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
