<template>
    <div class="tag">
        <el-row type="flex" class="article" justify="center">
            <el-col :sm="15">
                <div class="tag-container">
                    <el-button :type="get_tag == -1 ? 'success' : 'primary'" @click="allHandle">全部</el-button>
                    <el-button
                        @click="setActive(index, item.id)"
                        :type="get_tag == index ? 'success' : 'primary'"
                        v-for="(item, index) in tag_list"
                        :key="item.tag_name"
                    >{{ item.tag_name }}</el-button>
                </div>
                <div class="list">
                    <el-row :gutter="10">
                        <el-col
                            :md="8"
                            v-for="(item, index) in article_list"
                            :key="index"
                            class="wow slideInUp"
                        >
                            <CartList :tag_list="item"></CartList>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { api_url, serve_url, client_api } from "@/api";
import { mapGetters, mapActions } from "vuex";
import CartList from "@/components/cart";
import { get_system } from "@/utils";
import axios from "axios";
import { get_user } from "@/utils";
if (process.browser) {
    // 在这里根据环境引入wow.js
    var { WOW } = require("wowjs");
}
export default {
    data() {
        return {
            currentDate: new Date(),
            user: ""
        };
    },
    computed: {
        ...mapGetters(["get_tag", "get_system"])
    },
    components: {
        CartList
    },
    head() {
        return {
            title:
                this.get_system.adminname +
                "_" +
                this.get_system.sitename +
                "_分类",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: `${this.get_system.adminname},${this.get_system.sitename},${this.tag_list}`
                }
            ]
        };
    },
    async asyncData({ app, store, query, redirect }) {
        let tag_list = await app.$axios.get(`${api_url.tag}`);
        let article_list = await app.$axios.get(
            `${api_url.article}?page=1&pageSize=1000`
        );
        let system_list = await get_system(app, store);

        return {
            tag_list: tag_list.data.message.rows,

            tag_count: tag_list.data.message.count,
            article_list: article_list.data.message.rows,

            article_count: article_list.data.message.count
        };
    },

    async mounted() {
        var that = this;

        let code = this.$route.query.code;
        var that = this;

        if (code) {
            var user_info = await axios.get(
                `${client_api.qq_login}?code=${code}`
            );

            if (user_info.data.code == 0) {
                if (process.browser) {
                    setTimeout(() => {
                        this.$router.push("/message");
                    });
                    localStorage.setItem(
                        "user_info",
                        JSON.stringify(user_info.data.message)
                    );
                    // this.user = user_info.data.message;
                    // var protocol = window.location.protocol;
                    // var url = window.location.host;
                    // var valiable = protocol + "//" + url + "/message";
                    // window.open(valiable);
                    // window.close();
                }
            }
        }
    },

    methods: {
        ...mapActions(["set_tag"]),
        setActive(index, id) {
            this.set_tag(index);
            this.$router.push(`/category/id=${id}`);
        },
        allHandle() {
            this.set_tag(-1);
        }
    }
};
</script>

<style scoped>
.tag {
    margin: 50px 0;
}
.tag-container {
    margin: 0 30px;
}
.el-button {
    margin-bottom: 30px;
}
.el-col {
    margin-bottom: 20px;
}
</style>
