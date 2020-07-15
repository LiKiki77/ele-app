<template>
<div class="shopcart">
    <!--隐藏购物车  -->
    <transition name="fade">
    <div class="catview-cartmask" @click.self="showCartView = false" v-if="showCartView && !isEmpty">
        <div class="cartview-cartbody">
            <div class="cartview-cartheader">
                <span>已选商品</span>
                <button @click="clearFoods">
                    <i class="fa fa-trash-o"></i>
                    <span>清空</span>
                </button>
            </div>
            <div class="entityList-cartbodyScroller">
                <ul class="entityList-cartlist">
                    <li class="entityList-entityrow" v-for="(food, index) in selectFoods" :key="index"> 
                        <h4>
                            <span>{{food.name}}</span>
                        </h4>
                        <span class="entityList-entitytotal">{{food.activity.fixed_price}}</span>
                        <CartControll :food="food"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </transition>
    
    <div class="bottomNav-footerCart" 
        :class="{'bottomNav-carticon-empty':isEmpty}">
        <span class="bottomNav-carticon" @click="showCartView = !showCartView">
               <i class="fa fa-cart-plus"></i>
               <span v-if="totalCount">{{totalCount}}</span>
        </span>
        <div class="bottomNav-cartInfo" >
            <div class="Info" @click="showCartView = !showCartView">
                <p class="bottomNav-cartTotal">
                    <span v-if="isEmpty">未选购商品</span>
                    <span v-else>￥{{totalPrice.toFixed(2)}}</span>
                </p>
                <p class="bottomNav-cartdelivery">
                    另需配送费{{shopInfo.rst.float_delivery_fee}}元
                </p>
            </div>
            <button class="submit-btn">
                    <span v-if="isEmpty">
                        ￥{{shopInfo.rst.float_minimum_order_amount}}元起送</span>
                    <span @click="settlement" v-else>去结算</span>
                </button>
        </div>
    </div>
</div>
</template>

<script>
import CartControll from "../../components/shops/CartControll";
export default {
    name: "ShopCart",
    props: {
        shopInfo: Object
    },
    components:{
        CartControll
    },
    data() {
        return {
            totalCount: 0,
            totalPrice: 0,
            selectFoods: [],
            showCartView: false
        }
    },
    computed: {
        isEmpty() {
            let empty = true;
            // this.totalCount = 0;
            // this.totalPrice = 0;
            // this.selectFoods = [];
            this.shopInfo.recommend.forEach(recommend => {
                // this.totalCount = 0;
                // this.totalPrice = 0;
                // this.selectFoods = [];
                recommend.items.forEach(item => {
                    if (item.count) {
                        empty = false;
                        this.totalCount += item.count;
                        // console.log(this.totalCount);
                        this.totalPrice += item.activity.fixed_price * item.count;
                        // console.log(this.totalPrice);
                        this.selectFoods.push(item);
                    }
                });
            });

            this.shopInfo.menu.forEach(menu => {
                // this.totalCount = 0;
                // this.totalPrice = 0;
                this.selectFoods = [];
                menu.foods.forEach(food => {
                    if (food.count) {
                        empty = false;
                        this.totalCount += food.count;
                        // console.log(this.totalCount);
                        this.totalPrice += food.activity.fixed_price * food.count;
                        this.selectFoods.push(food);
                    }
                });
            });
            return empty;
        }  
    },
    methods: {
        clearFoods() {
            this.shopInfo.recommend.forEach(recommend => {
                recommend.items.forEach(item =>{
                    item.count = 0;
                });
            });

            this.shopInfo.menu.forEach(menu => {
                menu.foods.forEach(food =>{
                    food.count = 0;
                });
            });
        },
        settlement(){
            this.$store.dispatch("setOrderInfo", {
                shopInfo: this.shopInfo.rst,
                selectFoods: this.selectFoods,
            });
            this.$router.push("/settlement");
        }
    },
}
</script>

<style lang="scss" scoped>
.shopcart{
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.25s ease-out;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .catview-cartmask{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 200;
    .cartview-cartbody{
        position: fixed;
        left: 0;
        bottom: 12.8vw;
        width: 100%;
        background-color: #fff;
        font-size: 1rem;
        z-index: 201;
        opacity: 1;
        .cartview-cartheader{
            display: flex;
            align-items: center;
            padding: 0 4vw;
            border-bottom: 0.133333vw solid #ddd;
            background-color: #eceff1;
            color: #666;
            height: 10.666667vw;
            span{
                flex: 1;
                display: flex;
                align-items: center;
            }
            button{
                border: none;
                outline: none;
                flex: none;
                display: flex;
                align-items: center;
                padding-left: 4vw;
                color: #666;
                text-decoration: none;
                font-size: 0.8rem;
                line-height: 4vw;
                background: none;
                
            }
        }
        .entityList-cartbodyScroller{
            overflow: auto;
            max-height: 80vw;
            .entityList-entityrow{
                border-bottom: 0.133333vw solid #eee;
                display: flex;
                align-items: center;
                padding: 2vw 3.333333vw 2vw 0;
                min-height: 12.666667vw;
                margin-left: 3.333333vw;
                h4{
                    flex: 5.5;
                    line-height: normal;
                    span{
                        display: inline-block;
                        font-style: normal;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        vertical-align: middle;
                        max-width: 46.666667vw;
                    }
                }
                .entityList-entitytotal{
                    color: rgb(255, 83, 57);
                    flex: 2.5;
                    text-align: left;
                    white-space: nowrap;
                    font-weight: 700;
                    ::before{
                        content: "\A5";
                        font-size: 0.6rem;
                        color: currentColor;
                    }
                }
            }
        }
    }
  }
  .bottomNav-footerCart {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    height: 12.8vw;
    padding-left: 21.066667vw;
    background-color: rgba(61, 61, 63, 0.9);
    z-index: 1000;
    .bottomNav-carticon {
        position: absolute;
        left: 3.2vw;
        bottom: 2vw;
        width: 13.333333vw;
        height: 13.333333vw;
        box-sizing: border-box;
        border-radius: 100%;
        background-color: #3190e8;
        border: 1.333333vw solid #444;
        box-shadow: 0 -0.8vw 0.533333vw 0 rgba(0, 0, 0, 0.1);
        i {
            position: absolute;
            top: 7px;
            right: 0;
            bottom: 0;
            left: 7px;
            color: #fff;
            font-size: 1.6rem;
        }
        span {
            position: absolute;
            right: -1.2vw;
            top: -1.333333vw;
            line-height: 1;
            background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
            color: #fff;
            border-radius: 3.2vw;
            padding: 0.833333vw 1.333333vw;
            font-size: 0.6rem;
        }
    }
    .bottomNav-cartInfo {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .Info {
            margin-top: 5px;
            .bottomNav-cartTotal {
                font-size: 0.8rem;
                line-height: normal;
                color: #fff;
            }
            .bottomNav-cartdelivery {
                color: #999;
                font-size: 0.6rem;
            }
        }
        .submit-btn {
            height: 100%;
            width: 28vw; // background-color: #38ca73;
            background-color: #3190e8;
            color: #fff;
            text-align: center;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 600;
            border: none;
            outline: none;
            span {
                line-height: 12vw;
            }
        }
    }
  }

  .bottomNav-carticon-empty {
    span {
        background-image: radial-gradient(circle, #363636 6.266667vw, #444 0);
        i {
            color: #606065 !important;
        }
    }
    .bottomNav-carttotal {
        span {
            color: #999;
        }
    }
    .submit-btn {
        background-color: #535356 !important;
    }
  }
}
</style>