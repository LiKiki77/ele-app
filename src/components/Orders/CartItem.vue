<template>
    <div class="cart-item" @click="$emit('click')">
        <div class="cart-item-title">
            {{title}}
        </div>
        <div class="cart-item-right">
            <span>{{subHead}}</span>
            <i class="fa fa-angle-right"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "CartItem",    
    props: {
        title: String,
        subHead: String
    }
}
</script>

<style lang="scss" scoped>
.cart-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4.266667vw 0;
    font-size: 1rem;
    color: #333;
    border-bottom: 1px dotted #eee;
    .cart-item-title{
        font-weight: 500;
        flex: none;
    }
    .cart-item-right{
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        color: #bbb;
        font-size: 0.9rem;
        max-width: 69.333333vw;
    }
}
</style>