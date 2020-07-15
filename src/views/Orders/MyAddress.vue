<template>
    <div class="myAddress">
        <Header :isLeft="true" :title="title"/>
        <!--  显示收货地址-->
        <div class="address-view">
            <div class="address-cart" v-for="(address, index) in allAddress" :key="index">
                <!-- 选中 -->
                <div class="address-cart-select">
                    <i class="fa fa-check-circle" v-if="selectIndex == index"></i>
                </div>
                <div class="address-cart-body" @click="setAddressInfo(address,index)">
                    <p class="address-cart-title">
                        <span class="username">{{address.name}}</span>
                        <span class="gender" v-if="address.sex">{{address.sex}}</span>
                        <span class="phone">{{address.phone}}</span>
                    </p>
                    <p class="address-cart-address">
                        <span class="tag" v-if="address.tag">{{address.tag}}</span>
                        <span class="address-text">{{address.address}}</span>
                    </p>
                </div>
                <!-- 编辑和删除 -->
                <div class="address-cart-edit">
                    <i @click="handleEdit(address)" class="fa fa-edit"></i>
                    <i @click="handleDelete(address,index)" class="fa fa-close"></i>
                </div>
            </div>
        </div>

        <!-- 新增收货地址 -->
        <div class="address-view-bottom" @click="addAddress">
            <i class="fa fa-plus-circle"></i>
            <span>新增收货地址</span>
        </div>
    </div>
</template>

<script>
import Header from "../../components/Header";
export default {
    name: "MyAddress",
    components:{
        Header
    },
    data() {
        return {
            title: "我的地址",
            allAddress: [],
            selectIndex: 0
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => vm.getData());
    },
    methods:{
        addAddress(){
            this.$router.push({
                name: "addAddress",
                params: {
                    title: "添加地址",
                    addressInfo: {
                        name: "",
                        sex: "",
                        phone: "",
                        address: "",
                        bottom: "",
                        tag: "",
                    }
                }
            });
        },
        getData(){
            this.$axios(`/api/user/user_info/5cd437fef7a6970017c415fe`)
            .then(res => {
                // console.log(res.data);   
                this.allAddress = res.data.myAddress;
            })
        },
        handleEdit(address){
            this.$router.push({
                name: "addAddress",
                params:{
                    title: "编辑地址",
                    addressInfo: address
                }
            });
        },
        handleDelete(address,index){
            this.$axios.delete(`/api/user/address/5cd437fef7a6970017c415fe/${address._id}`)
            .then(res => {
                console.log(res);
                this.allAddress.splice(index,1);

            })
        },
        setAddressInfo(address,index){
            this.selectIndex = index;
            // 把address对象存储到vuex
            this.$store.dispatch('setUserInfo', address);
            this.$router.push("/settlement");
        }
    }
}
</script>

<style lang="scss" scoped>
.myAddress{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 45px;
  .address-view{
    height: 100%;
    overflow-y: auto;
    padding-bottom: 13.866667vw;
    .address-cart{
        background-color: #fff;
        padding: 4vw;
        border-bottom: 1px solid #ddd;
        display: flex;
        min-height: 18.133333vw;
        // 选中图标
        .address-cart-select{
            flex-basis: 7.333333vw;
            min-width: 7.333333vw;
            display: flex;
            align-items: center;
            i{
                font-size: 1.5rem;
                color: #4cd964;
            }
        }
        .address-cart-body{
            flex: 1;
            overflow: hidden;
            .address-cart-title{
                font-size: 1rem;
                color: #666;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-bottom: 1.066667vw;
                .username{
                    color: #333;
                    font-weight: 700;
                }
                .gender{
                    padding: 0 1.6vw 0 0.8vw;
                }
            }
            .address-cart-address{
                color: #666;
                font-size: 0.84rem;
                display: flex;
                align-items: center;
                .tag{
                    display: inline-block;
                    position: relative;
                    margin-right: 0.8vw;
                    padding: 0.533333vw;
                    color: #ff5722;
                    white-space: nowrap;
                    border: 1px solid #ff5722;
                    border-radius: 0.133333vw;
                    font-size: 0.6rem !important;
                    line-height: 2.666667vw;
                }
                .address-text{
                    line-height: 4.533333vw;
                }
            }
        }
        .address-cart-edit{
            flex-basis: 13.066667vw;
            display: flex;
            justify-content: space-around;
            align-items: center;
            i{
                color: #aaa;
                font-size: 1.2rem;
            }
        }
    }
  }
  .address-view-bottom{
      position: fixed;
      bottom: 0;
      height: 13.866667vw;
      width: 100%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 0.266667vw solid #ddd;
      color: #3190e8;
      font-size: 1rem;
      i{
        font-size: 1.3rem;
        margin-right: 8px;
      }
  }
}
</style>