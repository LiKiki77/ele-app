<template>
<div class="home">
    <div class="head">
        <div class="address-map" @click="$router.push({name: 'addresses',params: {city: city}})">
            <i class="fa fa-map-marker"></i>
            <span>{{address}}太原</span>
            <i class="fa fa-sort-desc"></i>
        </div>

    </div>
    <div class="search-wrap" :class="{'fixedview': showFilter}" @click="$router.push('/search')">
        <div class="shop-search">
            <i class="fa fa-search"></i> 搜索商家&nbsp;&nbsp;商家名称
        </div>
    </div>
    <div id="container">
        <!-- 轮播 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(img,index) in swiperImgs" :key="index">
                <img :src="img" alt="">
            </van-swipe-item>
        </van-swipe>

        <!-- 分类 -->
        <van-swipe class="my-entries" :autoplay="0">
            <van-swipe-item class="entry-wrap" v-for="(entry,i) in entries" :key="i">
                <div class="foodentry" v-for="(item,index) in entry" :key="index">
                    <div class="img-wrap">
                        <img :src="item.image" alt="">
                    </div>
                    <span>{{ item.name }}</span>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
    <!-- 推荐商家 -->
    <div class="shoplist-title">推荐商家</div>
    <!-- 导航 -->
    <FilterView :filterData="filterData" @searchFixed="showFilterView" @upDate="upDate"/>

    <!-- 商家信息 -->
    <mt-loadmore 
        :top-method="loadData" 
        :bottom-method="loadMore" 
        :bottom-all-loaded="allLoaded" 
        :auto-fill="false"
        :bottomPullText="bottomPullText"
        ref="loadmore">
        <div class="shop-list">
            <IndexShop v-for="(item, index) in restaurants" :key="index" :restaurant="item.restaurant"/>
        </div>
    </mt-loadmore>
</div>
</template>

<script>
import FilterView from "../components/FilterView";
import IndexShop from "../components/IndexShop";
export default {
    name: "home",
    components: {
        FilterView,
        IndexShop
    },
    data() {
        return {
            swiperImgs: [],
            entries: [],
            filterData: [],
            showFilter: false,
            page: 1,
            size: 5,
            restaurants: [],
            allLoaded: false,
            bottomPullText: "上拉加载更多",
            data: null  
        }
    },
    computed: {
        address() {
            return this.$store.getters.address;
        },
        city() {
            return (
                this.$store.getters.location.addressComponent.city ||
                this.$store.getters.location.addressComponent.province
            )
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.$axios("/api/profile/shopping").then(res => {
                // console.log(res.data.entries);
                this.swiperImgs = res.data.swipeImgs;
                this.entries = res.data.entries;
            });
            this.$axios("/api/profile/filter").then(res => {
                // console.log(res.data);
                this.filterData = res.data;
            });
            this.loadData();
        },
        loadData() {
            this.page = 1;
            this.allLoaded = false;
            this.bottomPullText = "上拉加载更多";
            // 拉取商家信息
            this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data).then(res => {
                // console.log(res.data);
                this.$refs.loadmore.onTopLoaded();
                this.restaurants = res.data;
            });
        },
        loadMore() {
            if(!this.allLoaded){
                this.page++;
                // 拉取商家信息
                this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`).then(res => {
                    // 加载完之后重新渲染
                    this.$refs.loadmore.onBottomLoaded();
                    if(res.data.length > 0){
                        res.data.forEach(item => {
                            this.restaurants.push(item);
                        });
                        if(res.data < this.size){
                            this.allLoaded = true;
                            this.bottomPullText = "没有更多了哦"
                        }
                    } else {
                        // 数据为空
                        this.allLoaded = true;
                        this.bottomPullText = "没有更多了哦"
                    }
                });

            }
        },
        showFilterView(isSort) {
            this.showFilter = isSort;
        },
        upDate(condition) {
            // console.log(condition); 
            this.data = condition;
            this.loadData();
        }
        
    }
}
</script>

<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    position: relative;
    .head {
        padding: 10px 16px;
        background-color: #009eef;
        .address-map {
            color: #fff;
            font-weight: bold;
        }
        i {
            // margin: 0 2px;
            font-size: 18px;
        }
        span {
            margin-top: 3px;
            display: inline-block;
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .search-wrap {
        background-color: #009eef;
        padding: 10px 16px;
        position: sticky;
        top: 0;
        z-index: 999;
        box-sizing: border-box;
        .shop-search {
            // margin-top: 10px;
            background-color: #fff;
            padding: 10px 0;
            border-radius: 4px;
            text-align: center;
            color: #aaa;
        }
        
    }
    .fixedview {
        // position: fixed;
        // position: sticky;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 999;
    }
    #container{

        .my-swipe {
            height: 100px;
            display: block;
            img {
                width: 100%;
                height: 100px;
            }
        }
        .my-entries {
            background-color: #fff;
            height: 47.2vw;
            width: 100%;
            text-align: center;
            overflow: hidden;
            .entry-wrap{
                .foodentry{
                    width: 20%;
                    float: left;
                    margin-top: 2.933333vw;
                    .img-wrap{
                        display: inline-block;
                        width: 12vw;
                        height: 12vw;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    span{
                        // text-align: center;
                        display: block;
                        color: #666;
                        font-size: 0.32rem;
                        
                    }
                }
            } 
        }
    }
    .shoplist-title{
        display: flex;
        align-items: flex;
        justify-content: center;
        height: 9.6vw;
        line-height: 9.6vw;
        font-size: 16px;
        color: #333;
        background: #fff;
        &::after,&::before{
            display: block;
            content: "一";
            width: 5.333333vw;
            height: 0.266667vw;
            color: #999;
        }
        &::before{
            margin-right: 3.466667vw;
        }
        &::after{
            margin-left: 3.466667vw;
        }
    }
    .mint-loadmore{
        height: calc(100% - 95px);
        overflow: auto;
    }
    
}

</style>