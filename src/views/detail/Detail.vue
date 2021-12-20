<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-infor :goods="goods"/>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import {getDetailData,Goods} from "network/detail";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfor from "./childComps/DetailBaseInfor";

    export default {
      name: "Detail",
      components: {DetailBaseInfor, DetailSwiper, DetailNavBar},
      data(){
        return {
          iid:null,
          topImages :[],
          goods:null
        }
      },
      created() {
        //1.保存传入的id
        this.iid = this.$route.params.id

        //2.根据id请求数据，这里用的本地数据，不用传值
        const d = getDetailData().detail.result;
        console.log(d);
        //3.获取轮播图
        this.topImages = d.topImages;

        //4.获取商品信息
        this.goods = new Goods(d.itemInfo,d.itemServices.columns,d.shopInfo.services)
        console.log(this.goods);
      }
    }
</script>

<style scoped>

</style>