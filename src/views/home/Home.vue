<template>
  <div id="home" >
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','精选','新款']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"
    />
    <scroll class="content" ref="scroll" :probe-type="3"
            @contentScroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends" />
      <feature-view/>
      <tab-control :titles="['流行','精选','新款']"
                   @tabClick="tabClick"
                   ref="tabControl2"
      />
      <goods-list :goods="goods[currentIndex].list"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";

  import {getHomeMulitidata,getHomeGoods,getMyHomeGoods} from "network/home";
  import {getTestData} from "network/data";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  import {debounce} from "common/utils";

  export default {
    name: "Home",
    components: {
      BackTop,
      Scroll,
      GoodsList,
      TabControl,
      FeatureView,
      RecommendView,
      NavBar,
      HomeSwiper,
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentIndex:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    destroyed() {
    },
    activated() {//记录滚动的高度
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {  //记录滚动的高度
      this.saveY = this.$refs.scroll.scroll.y
    },
    created() {
      //1.请求多个数据
      this.getHomeMulitidata()

      this.getMyHomeGoods("pop");
      this.getMyHomeGoods("new");
      this.getMyHomeGoods("sell");

      //2.请求商品数据 因为没有接口数据，所以用testData替代
      /*this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');*/

    },
    mounted() {
      //1.监听事件总线 item中图片加载完成事件  解决滚动长度问题
      //.防抖函数
      const refresh = debounce(this.$refs.scroll.refresh,500)
      this.$bus.$on("itemImageLoad",()=>{
        refresh()
      })
    },
    methods:{
      /**
       * 事件监听相关事件
       */

      tabClick(index){
        switch (index) {
          case 0:
            this.currentIndex ='pop';
            break;
          case 1:
            this.currentIndex ='new';
            break;
          case 2:
            this.currentIndex ='sell';
            break;
        }
        this.$refs.tabControl1.currentIndex= index;
        this.$refs.tabControl2.currentIndex= index;
      },
      backClick(){
        this.$refs.scroll.scrollTo(0,0);
      },
      contentScroll(position){
        //1.判断backTop是否显示
         this.isShowBackTop =(-position.y)>1000

        //2.决定tabControl 是否吸顶(position:fixed)
        this.isTabFixed = (-position.y)> this.tabOffsetTop
      },
      loadMore(){
        this.getMyHomeGoods(this.currentIndex)
      },
      swiperImageLoad(){
        //2.获取tab-controll的offSetTop
        //每一个组件都有一个$el:用于获取组件中的元素
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
      }
      ,
      /**
       * 网络请求相关方法
       */
      getHomeMulitidata(){
        getHomeMulitidata().then(res=>{
          console.log(res)
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1;
        getHomeGoods(type,page).then(res=>{
          console.log(res)
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
        })
      },
      getMyHomeGoods(type){
        const d = getTestData();
        this.goods[type].list.push(...d[type].data.list);
        /*this.goods['pop'].list.push(...d.pop.data.list);
        this.goods['new'].list.push(...d.news.data.list);
        this.goods['sell'].list.push(...d.sell.data.list);*/
        this.goods[type].page +=1;
        console.log(this.goods)
        //完成上拉加载更多
        this.$refs.scroll&&this.$refs.scroll.finishPullUp();
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentIndex].list
      }
    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    /*top: 44px;*/
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }*/
</style>
