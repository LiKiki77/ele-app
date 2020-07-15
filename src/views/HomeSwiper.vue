<template>
    <div class="Swiper">
       <Swiper class="home-swiper">
           <SwiperItem v-for="(item,index) in cbanners" :key="index">
               <a :href="item.link">
                   <img :src="item.image" alt="">
               </a>
           </SwiperItem>
       </Swiper>
    </div>
</template>

<script>
import {Swiper,SwiperItem} from "../components/swiper";
export default {
    name:"HomeSwiper",
    components: {
        Swiper,
        SwiperItem
    },
    props:{
        cbanners:{
            type:Array,
            default(){
                return []
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.home-swiper{
    width: 100%;
    height: 165px;
}
</style>