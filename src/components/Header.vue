<template>
<div class="header">
    <div class="header-button is-left" v-show="isLeft">
        <i class="fa fa-chevron-left"></i>
        <button @click="$router.go(-1)">返回</button>
    </div>
    <!-- 中间标题 -->
    <h1 class="header-title">{{title}}</h1>
</div>
</template>

<script>
export default {
    name: "Header",
    props: {
        title: String,
        isLeft: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    align-items: center;
    width: 100%;
    height: 45px;
    background-color: #009eef;
    display: flex;
    font-size: 16px;
    text-align: center;
    color: #fff;
    white-space: nowrap;
    padding: 0 10px;
    line-height: 1;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 99;
    .header-button button {
        background-color: transparent;
        border: none;
        outline: none;
        box-shadow: none;
        padding: 0;
        color: inherit;
        display: inline-block;
        font-size: inherit;
    }
    .header-title {
        flex: 1;
        margin-right: 20px;
    }
    .is-left {
        text-align: left;
    }
}
</style>