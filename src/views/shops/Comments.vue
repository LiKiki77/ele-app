<template>
    <div class="comment" v-if="evaluation">
        <!-- 商家评分 -->
        <section class="rating-wrap">
            <div class="rating-info">
                <h4>{{evaluation.rating.shop_score.toFixed(1)}}</h4>
                <div class="shop-score">
                    <span>商家评分</span>
                    <Rating :rating="evaluation.rating.shop_score"/>
                </div>
                <div class="other-score">
                    <div class="tp-score">
                        <div>
                            <span>味道</span>
                            <p>{{evaluation.rating.taste_score.toFixed(1)}}</p>
                        </div>
                        <div>
                            <span>包装</span>
                            <p>{{evaluation.rating.package_score.toFixed(1)}}</p>
                        </div>
                    </div>
                    <div class="rider-score">
                        <span>配送</span>
                        <p>{{evaluation.rating.rider_score.toFixed(1)}}</p>
                    </div>
                </div>
            </div>
        </section> 
        <!-- 评论区 -->
        <div class="shop-info">
            <!-- 标签 -->
            <ul class="tags">
                <li :class="{'unsatisfied':item.unsatisfied}" v-for="(item, index) in evaluation.tags" :key="index">
                    {{item.name}}
                    <span v-if="item.count">{{item.count}}</span>
                </li>
            </ul>
            <!-- 内容 -->
            <ul class="comment-wrap">
                <li v-for="(item, index) in evaluation.comments" :key="index">
                    <div class="comment-user">
                        <img 
                            :src="item.avater || 'https://shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png'" 
                            alt="">
                    </div>
                    <div class="comment-info">
                        <div class="comment-name">
                            <h4>{{item.username}}</h4>
                            <small>{{item.rated_at}}</small>
                        </div>
                        <div class="comment-rating">
                            <Rating :rating="item.rating"/>
                            <span :style="{'color': ratingContent(item.rating).color}">{{ratingContent(item.rating).txt}}</span>
                        </div>
                        <div class="comment-text">
                            {{item.comment_text}}
                        </div>
                        <div class="comment-reply">
                            {{item.reply.content}}
                        </div>
                        <ul class="comment-imgs">
                            <li v-for="(img, i) in item.order_images" :key="i">
                                <img :src="img.image_hash" alt="">
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Rating from '../../components/Rating';
export default {
    name: "Comments",
    components: {
        Rating
    },
    data() {
        return {
            evaluation: null
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData(){
            this.$axios("/api/profile/comments")
            .then(res => {
                // console.log(res.data);
                this.evaluation = res.data;
            })
        },
        ratingContent(rating){
            const content = [
                { txt: "吐槽", color: "rgba(137, 159, 188)" },
                { txt: "较差", color: "rgb(137, 159, 188)" },
                { txt: "一般", color: "rgb(251, 154, 11)" },
                { txt: "满意", color: "rgb(251, 154, 11)" },
                { txt: "超赞", color: "rgb(255, 96, 0)" }
            ];
            return content[rating - 1];
        }
    },
}
</script>

<style lang="scss" scoped>
.comment {
  height: calc(100% - 10.666667vw);
  line-height: 1.2;
  .rating-wrap{
      display: flex;
      margin-bottom: 2.133333vw;
      padding: 5.333333vw 0 8vw 6.4vw;
      background-color: #fff;
      .rating-info{
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #666;
          margin-top: 5px;
          h4{
              align-items: center;
              font-size: 2.2rem;
              color: #ff6000;
          }
          .shop-score{
              align-items: flex-start;
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 3px;
          }
          .other-score{
              flex: 1;
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: #666;
              .tp-score{
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  flex: 1;
                  padding: 0 7.2vw;
                  align-items: center;
                  div{
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      padding-left: 4px;
                    //   padding-right: 4px;
                      span{
                          font-size: 0.8rem;
                          margin-bottom: 1.333333vw;
                      }
                      p{
                          font-size: 1rem;
                      }
                  }
              }
              .rider-score{
                  width: 22.933333vw;
                  border-left: 1px solid #ddd;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  span{
                      font-size: 0.8rem;
                      margin-bottom: 1.333333vw;
                  }
                  p{
                      font-size: 1rem;
                  }
              }

          }
      }
  }
  .shop-info{
      background-color: #fff;
      padding: 2.666667vw 3.2vw 0;
      font-size: 0.8rem;
      .tags{
          padding-bottom: 2.666667vw;
          border-bottom: 1px solid #eee;
          li{
              color: #6d7885;
              background-color: #ebf5ff;
              display: inline-block;
              padding: 0 2.4vw;
              height: 7.466667vw;
              line-height: 7.466667vw;
              margin: 0.933333vw;
              font-size: 0.7rem;
              border-radius: 0.533333vw;
          }
          .unsatisfied{
              color: #aaa !important;
              background-color: #f5f5f5 !important;
          }
      }
      .comment-wrap{
          li{
            padding: 4vw 0 3.2vw;
            border-bottom: 0.133333vw solid #eee;
            display: flex;
            .comment-user{
                width: 10.666667vw;
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
            }
            .comment-info{
                flex: 1;
                font-size: 0.9rem;
                .comment-name{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    h4{
                        margin-top: 0;
                        color: #333;
                        margin-right: 1.6vw;
                    }
                    small{
                        font-size: 0.6rem;
                        color: #999;
                    }
                }
                .comment-rating{
                    display: flex;
                    align-items: center;
                    margin: 1.6vw 0 0.533333vw;
                    span{
                        font-size: 0.6rem;
                        margin-left: 1.066667vw;
                    }
                }
                .comment-text{
                    color: #333;
                    word-break: break-word;
                    margin: 2.133333vw 0;
                }
                .comment-reply{
                    margin: 2.666667vw 0;
                    padding: 2.666667vw;
                    border-radius: 1.066667vw;
                    background: #f3f3f3;
                    position: relative;
                    font-size: 0.8rem;
                }
                .comment-imgs{
                    margin-top: 1.066667vw;
                    margin-bottom: 3.2vw;
                    li{
                        display: inline-block;
                        margin: 0 0.533333vw;
                        img{
                            width: 40vw;
                            height: 40vw;
                        }
                    }
                }
            }
          }
      }
      
  }
}
</style>