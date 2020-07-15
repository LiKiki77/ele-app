<template>
<div :class="{'open': isSort || isScreen }" @click.self="hideView">
    <!-- 导航 -->
    <div class="filter-wrap">
        <aside class="filter">
            <div class="filter-nav" v-for="(item,index) in filterData.navTab" :key="index" :class="{'filter-bold': currentFilter == index}" @click="filterSort(index)">
                <span>{{item.name}}</span>
                <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
            </div>
        </aside>
    </div>
    <!-- 排序 -->
    <section class="filter-extend" v-if="isSort">
        <ul>
            <li v-for="(item,index) in filterData.sortBy" :key="index" @click="selectSort(item,index)">
                <span :class="{'selectName': currentSort == index }">{{ item.name }}</span>
                <i class="fa fa-check" v-show="currentSort == index"></i>
            </li>
        </ul>
    </section>
    <!-- 筛选 -->
    <section class="filter-extend" v-if="isScreen">
        <div class="filter-sort">
            <div class="morefilter" v-for="(screen, index) in filterData.screenBy" :key="index">
                <p class="title">{{ screen.title }}</p>
                <ul>
                    <li v-for="(item, i) in screen.data" :key="i" :class="{'selected': item.select}" @click="selectScreen(item,screen)">
                        <img v-if="item.icon" :src="item.icon" alt="">
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="morefilter-btn">
            <span class="morefilter-clear" @click="clearFilter" :class="{'edit':edit}">清空</span>
            <span class="morefilter-ok" @click="filterOk">确定</span>
        </div>
    </section>
</div>
</template>

<script>
export default {
    name: "filterview",
    props: {
        filterData: {} || []
    },
    data() {
        return {
            currentFilter: 0,
            isSort: false,
            currentSort: 0,
            isScreen: false
        }
    },
    computed: {
        edit() {
            let edit = false;
            this.filterData.screenBy.forEach(screen => {
                screen.data.forEach(item => {
                    if (item.select) {
                        edit = true;
                    }
                });
            });
            return edit;
        }
    },
    methods: {
        filterSort(index) {
            this.currentFilter = index;
            switch (index) {
                case 0:
                    this.isSort = true;
                    this.$emit("searchFixed", true);
                    break;
                case 1:
                    this.$emit("upDate", {
                        condition: this.filterData.navTab[1].condition
                    });
                    this.hideView();
                    break;
                case 2:
                    this.$emit("upDate", {
                        condition: this.filterData.navTab[2].condition
                    });
                    this.hideView();
                    break;
                case 3:
                    this.isScreen = true;
                    this.isSort = false;
                    this.$emit("searchFixed", true);
                    break;
                default:
                    this.hideView();
                    break;
            }
        },
        hideView() {
            this.isSort = false;
            this.isScreen = false;
            this.$emit("searchFixed", false);
        },
        selectSort(item, index) {
            this.currentSort = index;
            this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
            this.hideView();

            // 更新数据
            this.$emit("upDate", {
                condition: item.code
            })
        },
        selectScreen(item, screen) {
            if (screen.id !== "MPI") {
                // 单选
                screen.data.forEach(ele => {
                    ele.select = false;
                });
            }
            item.select = !item.select;
        },
        clearFilter() {
            this.filterData.screenBy.forEach(screen => {
                screen.data.forEach(item => {
                    item.select = false;
                });
            });
        },
        filterOk() {
            let screenData = {
                MPI: "",
                offer: "",
                per: ""
            };
            let mpiStr = "";
            this.filterData.screenBy.forEach(screen => {
                screen.data.forEach(item => {
                    if(item.select) {
                        // 两种情况   1单选 2多选
                        if(screen.id !== "MPI") {
                            // 单选
                            screenData[screen.id] = item.code;
                        } else {
                            // 多选
                            mpiStr += item.code +",";
                            screenData[screen.id] = mpiStr;
                        }   
                    }
                });
            });
            console.log(mpiStr);
            this.$emit("upDate", { condition: screenData });
            this.hideView();
        }
    }
}
</script>

<style lang="scss" scoped>
.filter-wrap {
    background-color: #fff;
    position: sticky;
    top: 54px;
    right: 0;
    left: 0;
    z-index: 10;
    .filter {
        border-bottom: 1px solid #ddd;
        line-height: 10.4vw;
        z-index: 101;
        height: 10.666667vw;
        display: flex;
        justify-content: space-around;
        .filter-nav {
            flex: 1;
            text-align: center;
            color: #666;
            font-size: 0.8333rem;
            i {
                width: 1.6vw;
                height: 0.8vw;
                margin-left: 1.333333vw;
                margin-bottom: 0.533333vw;
                fill: #333;
                will-change: transform;
            }
        }
        .filter-bold {
            font-weight: 600;
            color: #333;
        }
    }
}

.open {
    position: fixed;
    // position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;
    z-index: 3;
}

.filter-extend {
    background-color: #fff;
    color: #333;
    padding-top: 10px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 24.533333vw;
    z-index: 4;
    li {
        position: relative;
        padding-left: 5.333333vw;
        line-height: 10.666667vw;
        overflow: hidden;
        .fa-check {
            float: right;
            color: #009eef;
            margin-right: 3.733333vw;
            line-height: 10.666667vw;
        }
    }
    .selectName {
        color: #009eef;
    }
}

// 筛选
.filter-sort {
    background: #fff;
    padding: 0 2.666667vw;
    line-height: normal;
    .morefilter {
        margin: 2.666667vw 0;
        overflow: hidden;
        .title {
            margin-bottom: 2vw;
            color: #666;
            font-size: 0.5rem;
        }
        ul {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            font-size: 0.8rem;
            li {
                box-sizing: border-box;
                width: 30%;
                height: 9.333333vw;
                line-height: 9.333333vw;
                margin: 0.8vw 1%;
                background: #fafafa;
                img {
                    width: 3.466667vw;
                    height: 3.466667vw;
                    vertical-align: middle;
                    margin-right: 0.8vw;
                }
                span {
                    margin-left: 2%;
                    vertical-align: middle;
                }
            }
        }
        .selected {
            color: #3190e8 !important;
            background-color: #edf5ff !important;
        }
    }
}

.morefilter-btn {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fafafa;
    box-sizing: border-box;
    box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
    line-height: 11.466667vw;
    span {
        font-size: 0.826667rem;
        text-align: center;
        text-decoration: none;
        flex: 1;
    }
    .morefilter-clear {
        color: rgb(204, 200, 200);
        background: #fff;
    }
    .morefilter-ok {
        color: #fff;
        background: #00d762;
        border: 0.133333vw solid #00d762;
    }
    .edit {
        color: #333 !important;
    }
}
</style>