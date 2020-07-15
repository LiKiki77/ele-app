<template>
  <div class="remark">
    <Header :isLeft="true" title="订单备注"/>
    <!-- 订单备注 -->
    <div class="view-body">
        <section>
            <textarea placeholder="填写额外对餐厅或骑手小哥备注的信息" v-model="text" maxlength="100"></textarea>
            <div class="switch">
                <span @click="handleRadioItem(item)" 
                :class="{'selected': item.select}"  
                class="switch-item item-line" 
                v-for="(item, index) in radioItem" 
                :key="index">{{item.name}}</span>
            </div>
            <div class="switch" v-for="(item, index) in switchItem" :key="index">
                <span @click="item.select = !item.select" 
                :class="{'selected': item.select}" 
                class="switch-item">{{item.name}}</span>
            </div>
        </section>
        <button @click="submitClick" class="btn-submit">确定</button>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
export default {
  name: "Remark",
  components: {
    Header
  },
  data () {
      return {
        radioItem: [
            { select: false, name: "不要辣" },
            { select: false, name: "少点辣" },
            { select: false, name: "多点辣" }
        ],
        switchItem: [
            { select: false, name: "不要香菜" },
            { select: false, name: "不要洋葱" },
            { select: false, name: "多点醋" },
            { select: false, name: "多点葱" }
        ],
        text: ""
      }
  },
  methods: {
      handleRadioItem(item){
        this.radioItem.forEach(ele => {
            ele.select = false;
        })
        item.select = true;
      },
      submitClick(){
          let selectItems = "";
          this.radioItem.forEach(ele => {
              if(ele.select){
                  selectItems += ele.name + ",";
              }
          });
          
          this.switchItem.forEach(ele => {
              if(ele.select){
                  selectItems += ele.name + ",";
              }
          });

          selectItems += this.text;
          // console.log(selectItems);
          // 存储
          this.$store.dispatch("setRemarkInfo",{
              tableware: this.$store.getters.remarkInfo.remark,
              remark: selectItems
          });

          this.$router.go(-1);
      }
  }
}
</script>

<style lang="scss">
.remark{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 45px;
    .view-body{
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        font-size: 0.8rem;
        color: #333;
        section{
            margin-top: 2.133333vw;
            padding: 4.266667vw;
            background-color: #fff;
            margin-bottom: 2.133333vw;
            textarea{
                width: 100%;
                height: 29.866667vw;
                margin-bottom: 4.266667vw;
                padding: 4.266667vw;
                border: 1px solid #ccc;
                border-radius: 0.666667vw;
                background-color: #f9f9f9;
                color: #666;
                resize: none;
                box-sizing: border-box;
                outline: none;
            }
            .switch{
                display: inline-block;
                margin: 0 2.666667vw 2.666667vw 0;
                border: 1px solid #ddd;
                overflow: hidden;
                border-radius: 1.066667vw;
                .switch-item{
                    display: inline-block;
                    padding: 0 2.133333vw;
                    height: 8vw;
                    line-height: 8vw;
                    text-align: center;
                    color: #666;
                }
                .item-line::after{
                    content: "";
                    display: inline-block;
                    height: 4vw;
                    width: 1px;
                    background: #ddd;
                    line-height: 8vw;
                    vertical-align: middle;
                    left: 2.266667vw;
                    position: relative;
                }
                .selected{
                    background: #0186ff;
                    color: #fff;
                    border-radius: 1.066667vw;
                    position: relative;
                    // border: 0.5px solid #0186ff;
                }
            }
        }
        .btn-submit{
            display: block;
            padding: 3.466667vw 0;
            color: #fff;
            background-color: #0186ff;
            border-radius: 0.533333vw;
            width: 92vw;
            margin: 3.133333vw auto 0;
            font-size: 1rem;
            outline: none;
            border: none;
        }
    }
}
</style>