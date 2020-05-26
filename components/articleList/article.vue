<template>
    <div>
        <el-row :gutter="20">
            <el-col
                :sm="8"
                v-for="(item, index) in article_list"
                :key="index"
                class="wow slideInUp"
            >
                <div class="content">
                    <div class="image">
                        <nuxt-link :to="{ path: '/article', query: { id: item.id } }">
                            <el-image
                                style="width:380px;height:220px"
                                :src="thumb_url(item.thumb_url)"
                                fit="cover"
                            ></el-image>
                        </nuxt-link>
                    </div>
                    <nuxt-link :to="{ path: '/article', query: { id: item.id } }">
                        <div class="title">{{ item.title }}</div>
                    </nuxt-link>
                    <div class="desc">{{ item.desc }}</div>
                    <div class="time">
                        <span>{{ format(item.createdAt)}}</span>
                        <i class="el-icon-user">譬如朝露</i>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { api_url, serve_url } from "@/api";
import default_image from "@/assets/images/nopic.jpg";
import moment from "moment";

import axios from "axios";
export default {
    props: {
        article_list: {
            type: Array,
            required: true
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
    },
    mounted() {}
};
</script>

<style scoped>
.title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 8px 0;
    text-align: center;
    padding: 0 50px;
}
.desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 1.5;
    min-height: 45px;
    text-indent: 20px;
    margin: 15px;
}
.el-col {
    padding-bottom: 10px;

    margin: 20px 0;
    overflow: hidden;
}
.content {
    background: #fff;
}

.time_content {
    margin: 20px 0;
    font-size: 12px;
}
.time {
    margin: 0 20px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
}
</style>
