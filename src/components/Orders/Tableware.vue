<template>
<transition name="fade">
  <div class="tableware" v-if="isShow">
    <div class="actions-sheet">
        <i class="fa fa-remove" @click="$emit('close')"></i>
        <h2 class="actions-sheet-header">
            <span class="tag"></span>
            <span class="title">餐具份数</span>
            <span class="tag"></span>
        </h2>
        <ul>
            <li 
            :class="{'selected':selectItem == item}"
            @click="clickItem(item)" 
            v-for="(item, index) in tablewareList" 
            :key="index">
                {{item}}
            </li>
        </ul>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: "Tableware",
  data () {
      return {
          tablewareList:["1", "2", "3", "4", "5", "6"] ,
          selectItem: ""
      }
  },
  props:{
      isShow: Boolean
  },
  methods: {
      clickItem(item){
          this.selectItem = item;
          this.$store.dispatch("setRemarkInfo",{
              tableware: item +"份餐具",
              remark: this.$store.getters.remarkInfo.remark
          });
          this.$emit("close");
        //   console.log(item);
      }
  }
}
</script>

<style lang="scss" scoped>
.tableware{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
    .actions-sheet{
        position: absolute;
        background-color: #f5f5f5;
        box-shadow: 0 -1px 5px 0 rgba(0, 0, 0, 0.4);
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 100;
        padding: 5.333333vw 6.933333vw;
        box-sizing: border-box;
        transition: transform 0.2s;
        will-change: transform;
        .fa-remove{
            position: absolute;
            height: 6.4vw;
            width: 6.4vw;
            right: 2.666667vw;
            top: 2.666667vw;
            color: #aaa;
            font-style: 1.2rem;
        }
        .actions-sheet-header{
            margin-bottom: 3.2vw;
            padding: 0 7.466667vw;
            text-align: center;
            font-size: 1rem;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
            .tag{
                display: inline-block;
                width: 4.266667vw;
                height: 0.266667vw;
                border-top: 0.266667vw solid #333;
            }
            .title{
                margin: 0 3.2vw;
            }
        }
        ul{
            margin-top: 5.466667vw;
            max-height: 80vw;
            overflow-y: scroll;
            li{
                margin-bottom: 7.466667vw;
                text-align: center;
            }
            .selected{
                color: #2396ff;
                font-weight: 500;
            }
        }
    }
}
/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>