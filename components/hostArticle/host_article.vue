<template>
  <div class="host">
    <el-row>
      <el-col
        :sm="10"
        :offset="1"
        v-for="(item, index) in host_article"
        class=" wow slideInUp"
        :key="index"
      >
        <div class="container" :style="thumb_url(item.thumb_url)">
          <div class="content">
            <h3 class="title">{{ item.title }}</h3>
            <div class="desc">{{ item.desc }}</div>
            <nuxt-link :to="{ path: '/article', query: { id: item.id } }">
              <el-button type="primary">点击阅读</el-button></nuxt-link
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { serve_url } from "@/api";
import default_image from "@/assets/images/18.jpg";

export default {
  props: {
    host_article: {
      type: Array,
      required: true
    }
  },

  methods: {
    thumb_url: function(url) {
      if (url == "") {
        return `background-image:url( ${default_image})`;
      } else {
        return `background: url('${serve_url}${url}')`;
      }
    }
  }
};
</script>

<style scoped>
.el-col,
.container {
  height: 300px;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  background: #000;
}
.el-col {
  margin-bottom: 30px;
}
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  padding: 30px;
  box-sizing: border-box;
}
@media screen and (max-width: 768px) {
  .el-col {
    margin-left: 0 !important;
    height: 200px !important;
  }
  .container {
    height: 200px !important;
  }
  .desc {
    color: #fff;
    min-height: 50px !important;
    max-height: 50px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1 !important;
    -webkit-box-orient: vertical;
    line-height: 1 !important;
  }
}
.title {
  height: 48px;
  margin-top: 10px;
  margin-bottom: 5px;
  color: #fff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
}
.desc {
  color: #fff;
  min-height: 100px;
  max-height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 2;
}
.el-button {
  background-image: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
}
</style>
