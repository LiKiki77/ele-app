<template>
  <section class="index-container">
    <div class="index-shopInfo" @click="$router.push('/shop')">
      <!-- 左侧图片 -->
      <div class="logo-container">
        <img :src="restaurant.image_path" alt="">
      </div>
      <!-- 右侧内容 -->
      <div class="index-main">
        <!-- 第一行 -->
        <div class="index-shopName">
            <i v-if="restaurant.is_premium">品牌</i>
            <span>{{restaurant.name}}</span>
        </div>
        <!-- 第二行 星级 -->
        <div class="index-rateWrap">
            <div class="left-wrap">
                <Rating :rating="restaurant.rating"/>
                <span class="rate">{{restaurant.rating}}</span>
                <span>月售{{restaurant.recent_order_num}}</span>
            </div>
            <div v-if="restaurant.delivery_mode" class="delivery">
                <span class="icon-hollow">{{ restaurant.delivery_mode.text }}</span>
            </div>
        </div>
        <!-- 第三行 配送-->
        <div class="index-moneylimit">
            <div>
                <span>￥{{restaurant.float_minimum_order_amount}}</span>
                |
                <span>配送费￥{{restaurant.float_delivery_fee}}</span>
            </div>
            <div class="index-distanceWrap">
                <span>{{(restaurant.distance / 1000).toFixed(2)}}km</span>
                |
                <span>{{restaurant.order_lead_time}}分钟</span>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Rating from "./Rating";
export default {
    name: "IndexShop",
    props: {
        restaurant: Object 
    },
    components: {
        Rating
    }
}
</script>

<style lang="scss" scoped>
.index-container{
    background-color: #fff;
    color: #666;
    padding: 4vw 0;
    border-bottom: 0.133333vw solid #eee;
    .index-shopInfo{
        display: flex;
        justify-content: flex-start;
        padding: 0 2.666667vw;
        align-items: stretch;
        .logo-container{
            width: 17.333333vw;
            height: 17.333333vw;
            img{
                display: block;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                border: 0.133333vw solid rgba(0, 0, 0, 0.08);
                border-radius: 0.533333vw;
            }
        }
        .index-main{
            display: flex;
            justify-content: space-between;
            overflow: hidden;
            flex-direction: column;
            padding-left: 2.666667vw;
            font-size: 0.66rem;
            flex-grow: 1;
            .index-shopName{
                align-items: center;
                color: #333;
                font-weight: 700;
                font-size: 0.9rem;
                i{
                    background: #ffe800;
                    margin-right: 1.333333vw;
                    padding: 0.266667vw 0.666667vw;
                    text-align: center;
                    white-space: nowrap;
                    font-size: 0.6rem;
                }
                span{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
            .index-rateWrap{
                display: flex;
                justify-content: space-between;
                align-items: center;
                overflow: hidden;
                .left-wrap{
                    display: flex;
                    .rate{
                        margin-right: 1.066667vw;
                    }
                }
                .delivery{
                    display: flex;
                    align-items: center;
                    font-size: 0.6rem;
                    margin-left: 1.066667vw;
                    .icon-hollow{
                        color: #fff;
                        background-color: #2395ff;
                        padding: 2px;
                        box-sizing: border-box;  
                    }
                }   
            }
            .index-moneylimit{
                width: 100%;
                display: flex;
                justify-content: space-between;
                color: #999;
                .index-distanceWrap {
                    color: #999;
                }
            }
        }
    }

}
</style>