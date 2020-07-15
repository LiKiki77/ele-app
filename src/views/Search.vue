<template>
    <div class="search">
        <Header :isLeft="true" title="搜索"/>
        <div class="search-header">
            <form class="search-wrap">
              <i class="fa fa-search"></i>
              <input type="text" v-model="key_word" placeholder="输入商家">
              <button @click.prevent="searchHandle">搜索</button>
            </form>
        </div>
        <div class="shop" v-if="result && !showShop">
            <div class="empty-wrap" v-if="empty">
                <img src="https://fuss10.elemecdn.com/d/60/70008646170d1f654e926a2aaa3afpng.png" alt="">
                <div class="empty-text">
                    <h4>附件没有搜索结果</h4>
                    <span>换个关键词试试吧</span>
                </div>
            </div>
            <div v-else>
             <SearchIndex @click="$router.push('/shop')" :data="result.restaurants"/>
             <SearchIndex @click="shopItemClick" :data="result.words" />
            </div>
        </div>
        <div class="container" v-if="showShop">
            <!-- 导航 -->
            <FilterView :filterData="filterData" @update="update"/>
            <div class="shop-list" v-infinite-scroll="loadMore" :infinite-scroll-disabled="loading">
            <IndexShop v-for="(item, index) in restaurants" :key="index" :restaurant="item.restaurant"/>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/Header";
import SearchIndex from "../components/SearchIndex";
import FilterView from "../components/FilterView";
import IndexShop from "../components/IndexShop";
export default {
    name: "Search",
    components: {
        Header,
        SearchIndex,
        FilterView,
        IndexShop
    },
    data() {
        return {
            key_word: "",
            result: null,
            empty: false,
            showShop: false,
            FilterData: null,
            restaurants: [],
            page: 0,
            size: 7,
            loading: false,
            data: null
        }
    },
    watch: {
        key_word(){
            this.empty = false;
            this.showShop = false;
            this.KeyWordChange();
        }
    },
    created() {
        this.$axios("/api/profile/filter").then(res => {
            // console.log(res.data);
            this.filterData = res.data;
        });
    },
    methods: {
        KeyWordChange(){
            // console.log(this.key_word);
            this.$axios(`/api/profile/typeahead/${this.key_word}`)
            .then(res => {
                // console.log(res.data);  
                this.result = res.data;
            })
            .catch(err => {
                this.result = null;
                console.log(err);
            });
        },
        searchHandle(){
            if (!this.key_word) return;
            if (this.result && 
                (this.result.restaurants.length > 0 ||
                this.result.words.length)
            ){
                // console.log("有内容");
                this.shopItemClick();
            }
            else{
                this.empty = true
            }
        },
        shopItemClick(){
            // 优化，删除关键词之后消除之前的数据
            this.page = 0;
            this.restaurants = []
            this.showShop = true;
        },
        update(condition) {
            // console.log(condition); 
            this.data = condition;
            // this.loadData();
            this.showItemClick();
        },
        loadMore(){
            this.page++;
            this.$axios.post(`/api/profile/restaurants/${this.page}/${this.size}`,this.data).then(res => {
                // this.restaurants = res.data;
                if (res.data.length > 0) {
                    res.data.forEach(item => {
                        this.restaurants.push(item);
                    })
                }else {
                    this.loading = true;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.search-header {
  margin-top: 45px;
  background: #fff;
  padding: 0 4.266667vw;
}
.search-header .search-wrap {
  padding: 2.933333vw 2.933333vw 2.933333vw 0;
  display: flex;
  align-items: center;
  position: relative;
}
.search-wrap .fa-search {
  width: 2.933333vw;
  height: 2.933333vw;
  color: #888;
  position: absolute;
  top: 4.6666666vw;
  left: 2.933333vw;
}
.search-wrap input {
  flex-grow: 1;
  border-radius: 0.266667vw;
  background-color: #f8f8f8;
  padding: 1.733333vw 4vw 1.733333vw 8.8vw;
  color: #666;
  outline: none;
  border: none;
  border-radius: 10px;

}
.search-wrap button {
  outline: none;
  color: #333;
  font-size: 0.426667rem;
  background: #fff;
  font-weight: 700;
  margin-left: 4vw;
  font-size: 15px;
  padding: 5px;
  border: 1px solid rgb(139, 157, 192);
  border-radius: 8px;
}
.shop{
    width: 100%;
    height: calc(100% - 95px);
    overflow: auto;
}

.empty-wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    display: flex;
    justify-content: center;
    img{
        width: 35vw;
        height: 35vw;
    }
    .empty-text{
        h4{
            color: #666;
            font-size: 1rem;
            margin: 12vw 0 2vw 0;
        }
        span{
            color: #999;
            font-size: 0.8rem;
        }
    }
}
</style>