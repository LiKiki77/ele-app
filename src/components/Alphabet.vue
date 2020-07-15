<template>
<div class="area" ref="scroll" v-if="cityInfo">
    <Scroll class="content" ref="scroll">
    <div class="scroll-wrap">
        <!-- 热门城市 -->
        <div class="hot-wrap citylist">
            <div class="title">热门城市</div>
            <ul class="hot-city">
                <li @click="$emit('selectCity', item)" v-for="(item, index) in cityInfo.hotCities" :key="index">{{ item.name }}</li>
            </ul>
        </div>
        <!-- 所有城市 -->
        <div class="city-wrap">
            <!-- 循环按字母排序的key -->
            <div class="city-content citylist" v-for="(item, index) in keys" :key="index">
                <div class="title">{{ item }}</div>
                <!-- 根据字母key展示城市名字 -->
                <ul>
                    <li @click="$emit('selectCity', city)" v-for="(city, index) in cityInfo[item]" :key="index">{{ city.name }}</li>
                </ul>
            </div>
        </div>
    </div>
    </Scroll>
    <div class="area-keys">
        <ul>
            <li @click="selectKey(0)">#</li>
            <li @click="selectKey(index+1)" v-for="(item,index) in keys" :key="index">{{ item }}</li>
        </ul>
    </div>
</div>
</template>

<script>
import Scroll from "../components/scroll/Scroll";
export default {
    name: "Alphabet",
    components: {
        Scroll
    },
    props: {
        cityInfo: Object,
        keys: Array
    },
    methods: {
        selectKey(index) {
            // console.log(index);
            // console.log(this.$refs.scroll.getElementsByClassName("citylist"));
            const citylist = this.$refs.scroll.getElementsByClassName("citylist");
            // 根据下标,滚动到相对应的元素上
            let el = citylist[index];
            console.log(el);
            // 滚动到对应的位置上
            this.$refs.scroll.scrollToElement(el, 250);
            // this.$refs.scroll = this.$refs.scroll.scrollToElement(el, 300);
        }
    } 
}
</script>

<style lang="scss" scoped>
.area{
    height: 100vh;
    background-color: #fff;
    margin-top: 10px;
    padding: 0 16px;
    box-sizing: border-box;
    // height: calc(100% - 65px);
    overflow: hidden;
    .content{
        height: calc(100% - 75px);
        overflow: hidden;
        .scroll-wrap{
        background: #fff;
        overflow: auto;
        .hot-wrap {
            .title{
                color: #aaa;
                padding: 15px 0;
            }
            .hot-city{
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                padding: 0 16px;
                li{
                    width: 30%;
                    padding: 10px;
                    margin: 0 10px 10px 0;
                    box-sizing: border-box;
                    background-color: #f1f1f1;
                    text-align: center;
                }
            }
        }
        .city-wrap{ 
            .city-content li{
                padding: 10px;
                border-bottom: 1px solid #eee;
            }
        }
        }
    }
    .area-keys{
        position: fixed;
        right: 0;
        top: 25%;
        color: #aaa;
        font-size: 12px;
        line-height: 1.3;
        text-align: center;
        padding: 0 5px;
    }

}
</style>