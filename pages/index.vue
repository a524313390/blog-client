<template>
    <div class="container">
        <el-row>
            <el-col :xl="24">
                <Banner :banner_data="banner_list"></Banner>
            </el-col>
        </el-row>
        <el-row type="flex" class="host_article" justify="center">
            <el-col :sm="15">
                <h4 class="host_title">置顶文章</h4>
                <HostArticle :host_article="host_list"></HostArticle>
            </el-col>
        </el-row>
        <el-row type="flex" class="article" justify="center">
            <el-col :sm="15">
                <ArticleList :article_list="article_list"></ArticleList>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from "axios";
import HostArticle from "@/components/hostArticle/host_article";
import Banner from "@/components/banner/banner";
import ArticleList from "../components/articleList/article.vue";
import { api_url, serve_url, client_api } from "@/api";
import { mapGetters } from "vuex";
import { get_system } from "@/utils";
if (process.browser) {
    // 在这里根据环境引入wow.js
    var { WOW } = require("wowjs");
}
export default {
    data() {
        return {
            page: 1,
            flag: true
        };
    },
    head() {
        return {
            title: this.get_system.adminname + "_" + this.get_system.sitename,
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: `${this.get_system.adminname},${this.get_system.sitename}`
                }
            ]
        };
    },
    components: {
        HostArticle,
        Banner,
        ArticleList
    },
    computed: {
        ...mapGetters(["get_system"])
    },
    async asyncData({ app, store }) {
        let banner_list = await app.$axios.get(`${api_url.banner}`);
        let article_list = await app.$axios.get(
            `${api_url.article}?page=1&pageSize=1000`
        );
        let system_list = await get_system(app, store);
        let host_list = await app.$axios.get(`${api_url.host_article}`);

        return {
            banner_list: banner_list.data.message.rows,
            article_list: article_list.data.message.rows,
            host_list: host_list.data.message.rows,
            article_count: article_list.data.message.count
        };
    },
    methods: {},
    mounted() {
        if (process.browser) {
            // 在页面mounted生命周期里面 根据环境实例化WOW
            new WOW({
                live: false,
                offset: 0
            }).init();
        }
    },
    destroyed() {}
};
</script>

<style scoped>
.host_article > .el-col {
    margin: 50px 0;
    background: #fff;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1),
        0 5px 15px rgba(0, 0, 0, 0.07) !important;
}
.host_title {
    margin-top: 25px;
    margin-bottom: 25px;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.5;
}
</style>
