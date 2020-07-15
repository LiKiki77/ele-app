<template>
    <div class="cartcontroll">
        <span @click.stop="decraeseCount" class="cartbutton button-minus" v-if="food.count>0">
            <i class="fa fa-minus"></i>
        </span>
        <span class="cartcount" v-if="food.count>0">
            {{food.count}}
        </span>
        <span @click.stop="incraeseCount"  class="cartbutton">
            <i class="fa fa-plus-circle"></i>
        </span>
    </div>
</template>

<script>
export default {
    name: "CartControll",
    props:{
       food: Object
    }, 
    methods: {
        decraeseCount(){
            this.food.count--;
        },
        incraeseCount(){
            this.food.count++;
        }
    },
}
</script>

<style lang="scss" scoped>
.cartcontroll{
    display: inline-flex;
    align-items: center;
    .cartbutton{
        display: inline-block;
        vertical-align: middle;
        i{
            color: rgb(35, 149, 255);
            vertical-align: middle;
            font-size: 1.3rem;
        }
    }
    .button-minus{
        width: 5.166667vw;
        height: 5.1566667vw;
        border: 1px solid rgb(35, 149, 255);
        border-radius: 50%;
        text-align: center;
        i{
            font-size: 1rem;
            padding-top: 0.5vw;
        }
    }
    .cartcount{
        display: inline-block;
        text-align: center;
        color: rgba(0, 0, 0, 0.87);
        vertical-align: middle;
        font-size: 0.8rem;
        width: 6.933333vw;
        overflow: hidden;
    }
}
</style>