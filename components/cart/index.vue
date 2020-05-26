<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <div class="image-container">
        <nuxt-link :to="{ path: '/article', query: { id: tag_list.id } }">
          <el-image
            style="width:100%;height:100%"
            :src="thumb_url(tag_list.thumb_url)"
            fit="cover"
          ></el-image
        ></nuxt-link>
      </div>
      <div style="padding: 14px;">
        <span class="title">{{ tag_list.title }}</span>
        <div class="bottom clearfix">
          <time class="time left">{{ format(tag_list.createdAt) }}</time>
          <nuxt-link :to="{ path: '/article', query: { id: tag_list.id } }">
            <el-button type="text right" class="button"
              >点击阅读</el-button
            ></nuxt-link
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { api_url, serve_url, client_api } from "@/api";
import default_image from "@/assets/images/nopic.jpg";
import moment from "moment";
export default {
  data() {
    return {
      currentDate: new Date()
    };
  },

  props: {
    tag_list: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    thumb_url: function(url) {
      if (url == "") {
        return `${default_image}`;
      } else {
        return `${serve_url}${url}`;
      }
    },
    format(value) {
      return moment(value).format("YYYY-DD-MM");
    }
  }
};
</script>

<style scoped>
.image {
  width: 300px;
  height: 300px;
}
.image-container {
  width: 100%;
  height: 220px;
  overflow: hidden;
}
.image-container .el-image {
  transition: all 0.5s;
}
.image-container:hover .el-image {
  transform: scale(1.2);
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
