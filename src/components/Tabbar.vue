<template>
    <div class="tabbar">
        <router-link 
            class="tab-item" 
            v-for="(item,index) in data" 
            :key="index" 
            :to="item.path" 
            active-class="is-selected">
            <div class="tab-item-icon">
                <i :class="'fa fa-'+ item.icon"></i>
            </div>
            <div class="tab-item-label">{{item.title}}</div>
        </router-link>
    </div>
</template>

<script>
export default {
    name:"Tabbar",
    props:{
        data:Array
    }
}
</script>

<style lang="scss" scoped>
.tabbar{
    height: 45px;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    display: flex;
    text-align: center;
    background-color: #fafafa;
    background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 0
    );
    background-size: 100% 1px;
    background-repeat: no-repeat;
    background-position: 0 0;
    .tab-item{
        flex: 1;
        display: block;
        padding: 3px 0;
    }
    .tab-item-icon{
        width: 20px;
        height: 20px;
        margin: 0 auto 5px;
        i{
            font-size: 16px;
        }
    }
    .tab-item-label{
        color: inherit;
        font-size: 10px;
        line-height: 1;
    }
    .is-selected {
        color: #009eef;
    }
}
</style>