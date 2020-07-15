<template>
<div class="city">
    <div class="search-wrap">
        <div class="search">
            <i class="fa fa-search"></i>
            <input v-model="city_val" type="text" placeholder="输入城市名">
        </div>
        <button @click="$router.push({name:'addresses',params:{city:city}})">取消</button>
    </div>
    <div v-if="searchList.length == 0">
    <div class="location">
        <Location @click="selectCity({name:city})" :address="city" />
    </div>
    <Alphabet @selectCity="selectCity" :cityInfo="cityInfo" :keys="keys"/>  
    </div>  
    <div class="search-list" v-else>
        <ul>
            <li @click="selectCity(item)" v-for="(item, index) in searchList" :key="index">{{ item.name }}</li>
        </ul>
    </div>
</div>
</template>

<script>
import Location from "../components/Location";
import Alphabet from "../components/Alphabet";

// import Scroll from "../components/scroll/Scroll";
export default {
    name: "city",
    components: {
        Location,
        Alphabet,
        // Scroll
    },
    data() {
        return {
            city_val: "",
            cityInfo: null,
            // hotCities: [],
            keys: [],
            allCities: [],
            searchList: []
        }
    },
    computed: {
        city() {
            return (
                this.$store.getters.location.addressComponent.city ||
                this.$store.getters.location.addressComponent.province
            );
        }
    },
    created() {
        this.getCityInfo();
    },
    watch: {
        city_val() {
            this.searchCity();
        }
    },
    methods: {
        getCityInfo() {
            this.$axios.get("https://ele-interface.herokuapp.com/api/posts/cities")
                .then(res => {
                    this.cityInfo = res.data;
                    // 热门城市
                    this.hotCities = res.data.hotCities;
                    // 处理key 
                    this.keys = Object.keys(res.data);
                    // 移除hotcities
                    this.keys.pop();
                    // 排序
                    this.keys.sort();
                    // this.$nextTick(() => {
                    //     this.$refs.allcity.initScroll();
                    // });

                    // 存储所有城市，用来搜索过滤
                    this.keys.forEach(key => {
                        // console.log(key);
                        this.cityInfo[key].forEach(city => {
                            // console.log(city);
                            this.allCities.push(city);
                        })
                    })
                })
                .catch(err => {
                    console.log("出错了" + err);
                });
        },
        selectCity(city) {
            this.$router.push({name:"addresses", params:{ city: city.name }})
        },
        searchCity() {
            if(!this.city_val) {
                // 如果搜索框为空，数组置空
                this.searchList = [];
            } else {
                // 根据输入框的关键字检索城市 并存入到searchList数组中
                this.searchList = this.allCities.filter(item  => {
                    return item.name.indexOf(this.city_val) != -1;
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.city {
    height: 100vh;
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding-top: 45px;
    .search-wrap {
        z-index: 9;
        position: fixed;
        top: 0;
        height: 45px;
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 3px 16px;
        display: flex;
        justify-content: space-between;
        button {
            border: 1px solid #009eef;
            outline: none;
            border-radius: 4px;
            color: #009eef;
            background-color: #ddd;
        }
        .search {
            background-color: #eee;
            border-radius: 10px;
            line-height: 40px;
            width: 85%;
            box-sizing: border-box;
            padding: 0 16px;
            input {
                height: 38px;
                border-radius: 10px;
                background-color: #eee;
                outline: none;
                border: none;
                margin-left: 5px;
            }
        }
    }
    .location {
        background-color: #fff;
        box-sizing: border-box;
        height: 65px;
        padding: 3px 16px; 
    }

    .search-list{
        background-color: #fff;
        padding: 5px 16px;
        li{
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
    }
}
</style>