<template>
  <div>
    <el-carousel trigger="click" :height="_isMobile() ? '200px' : '500px'">
      <el-carousel-item
        v-for="(item, index) in banner_data"
        :key="index"
        style="`background:url(${item.banner_image})`"
        v-if="item.banner_state"
      >
        <!-- <h3 class="small">{{ item }}</h3> -->
        <a :href="item.banner_url" target="_blank">
          <el-image
            :src="item.banner_image"
            style="width: 100%; height: 100%"
            fit="cover"
          ></el-image>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    banner_data: {
      type: Array,
      required: true
    }
  },
  mounted() {},
  methods: {
    _isMobile() {
      if (process.browser) {
        let flag = navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag;
      }
    }
  }
};
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel {
  position: relative;
}

@media screen and (max-width: 768px) {
  .el-carousel {
    height: 200px !important;
  }
}
</style>
