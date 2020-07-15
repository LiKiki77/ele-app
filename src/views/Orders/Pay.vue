<template>
<div class="pay">
    <Header title="在线支付" />
    <div class="main" v-if="orderInfo">
        <div class="tip">
            <p class="countdown-title">支付剩余时间</p>
            <p class="countdown-text">{{countDown}}</p>
        </div>
        <section class="home">
            <ul class="list info-list">
                <li>
                    <span class="order-name">{{orderInfo.shopInfo.name}}</span>
                    <span class="text-highlight">￥{{totalPrice}}</span>
                </li>
            </ul>
            <div class="title">
                在线支付
            </div>
            <ul class="list payment-list">
                <li class="payment-list-item">
                    <div class="icon">
                        <img src="../../assets/wechart.jpg" alt="">
                        <span>微信</span>
                    </div>
                    <i class="fa fa-check-circle selected"></i>
                </li>
            </ul>
        </section>
        <button @click="addOrder" :disabled="timeOut" class="btn-submit">确认支付</button>
         <!-- @click="pay" -->
    </div>
</div>
</template>

<script>
import Header from "../../components/Header";
export default {
    name: "Pay",
    components: {
        Header
    },
    data() {
        return {
            countDown: "00:14:59",
            timer: null,
            timeOut: false,
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.countTimeDown();
        })
    },
    computed: {
        orderInfo() {
            return this.$store.getters.orderInfo;
        },
        totalPrice() {
            return this.$store.getters.totalPrice;
        },
        userInfo(){
            return this.$store.getters.userInfo;
        },
        remarkInfo(){
            return this.$store.getters.remarkInfo;
        },
    },
    methods: {
        countTimeDown() {
            let minute = 14;
            let second = 59;

            this.timer = setInterval(() => {
                second--;

                if (second == "00" && minute == "00") {
                    this.countDown = "订单已超时";
                    clearInterval(this.timer);
                    this.timeOut = true;
                    return;
                }

                if (second == "00") {
                    second = 59;
                    minute--;
                    if (minute < 10) {
                        minute = "0" + minute;
                    }
                }

                if (second < 10) {
                    second = "0" + second;
                }

                this.countDown = "00:" + minute + ":" + second;
            }, 1000)
        },
        addOrder(){
            let orderList = {
                orderInfo : this.orderInfo,
                userInfo : this.userInfo,
                totalInfo : this.totalInfo,
                remarkInfo : this.remarkInfo
            };
            // this.$store.dispatch('setOrderList', this.orderList);
            // this.$router.push("/order");
            // console.log(orderList);
            this.$axios.post(`/api/user/add_order/5cd437fef7a6970017c415fe`,this.orderList)
            .then(res => {
                console.log(res);
                console.log(orderList);
                this.$router.push("/order");
            });
            
        },
        // pay() {
        //     const data = {
        //         body: "",
        //         out_trade_no: new Date().getTime().toString(),
        //         total_fee: 1
        //     };
        //     alert("进入pay方法中");
        //     // 请求
        //     fetch("http://www.thenewstep.cn/wxzf/example/jsapi.php", {
        //             method: "POST",
        //             headers: {
        //                 "Content-type": "application/json"
        //             },
        //             body: JSON.stringify(data)
        //         })
        //         .then(res => res.json())
        //         .then(data => {
        //             this.onBridgeReady(data);
        //         })
        //         // .catch(err => {
        //         //     alert("请求失败");
        //         //     console.log(error);
        //         // })
        // },
        // onBridgeReady(data) {
        //     WeixinJSBridge.invoke(
        //         'getBrandWCPayRequest', data,res => {
        //             if (res.err_msg == "get_brand_wcpay_request:ok") {
        //                 // 使用以上方式判断前端返回,微信团队郑重提示：
        //                 //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        //                 alert("支付成功");
        //             }
        //         });
        // }

    }
}
</script>

<style lang="scss">
.pay {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 45px;
    .main {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow: auto;
        .tip {
            display: block;
            text-align: center;
            background-color: #fff;
            color: #333;
            padding: 2rem;
            line-height: 2rem;
            .countdown-title {
                font-size: 0.88rem;
                color: #999;
            }
            .countdown-text {
                height: 2rem;
                color: #333;
                font-size: 1.8rem;
            }
        }
        .list {
            border-bottom: 0.5px solid #eee;
            background: #fff;
            padding: 0 1.5rem;
            li {
                display: flex;
                justify-content: space-between;
                padding: 1.5rem 0;
                font-size: 1rem;
                line-height: 1rem;
                border-top: 0.5px solid #eee;
                .order-name {
                    color: #333;
                    display: inline-block;
                    vertical-align: bottom;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .text-highlight {
                    color: #ff6000;
                }
            }
        }
        .title {
            background-color: #f5f5f5;
            font-size: 0.88rem;
            padding: 1.2rem 1.2rem 1rem;
            color: #999;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .payment-list-item {
            border-bottom: 0.5px solid #eee;
            padding: 0.9rem 1rem;
            font-size: 1.1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon {
                display: flex;
                align-items: center;
                img {
                    width: 2.4rem;
                    height: 2.4rem;
                    margin-right: 20px;
                }
            }
            i {
                font-size: 1.5rem;
                color: #eee;
            }
            .selected {
                color: #4cd964 !important;
            }
        }
        .btn-submit {
            width: 100%;
            outline: none;
            border: none;
            color: #fff;
            border-radius: 5px;
            padding: 0.5rem;
            box-sizing: border-box;
            font-size: 1.1rem;
            line-height: 1.5rem;
            background-color: #009eef; // background-color: #4cd964;
            [disabled] {
                background-color: #bbb !important;
            }
        }
    }
}
</style>