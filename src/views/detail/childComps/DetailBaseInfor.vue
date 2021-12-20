<template>
  <div v-if="Object.keys(goods).length!==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-ohter">
      <span>{{goods.columns[0].desc}}</span>
      <span>{{goods.columns[1].desc}}</span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "DetailBaseInfor",
      props:{
        goods:{
          type:Object,
          default(){
            return {}
          }
        }
      }
    }
</script>

<style scoped>

</style>