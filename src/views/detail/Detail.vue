<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
    <detail-base-infor :goods="goods"/>
    <detail-shop-info :shop="shopInfo"/>
    <detail-goods-info :detail-info="detailInfo"/>
    <h2>{{iid}}</h2>
  </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import {getDetailData,Goods} from "network/detail";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfor from "./childComps/DetailBaseInfor";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

    export default {
      name: "Detail",
      components: {DetailGoodsInfo, DetailShopInfo, DetailBaseInfor, DetailSwiper, DetailNavBar},
      data(){
        return {
          iid:null,
          itemId:null,
          topImages :[],
          goods:{},
          shopInfo:{},
          detailInfo:{}
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

        //5.获取商店信息
        this.shopInfo = d.shopInfo;

        // 6.获取商品信息
        this.detailInfo = d.detailInfo
      }
    }
</script>

<style scoped>

</style>