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
                <div class="list" v-if="article_list.length > 0">
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
                <div v-else>暂无数据</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { api_url, serve_url, client_api } from "@/api";
import CartList from "@/components/cart";
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {};
    },
    async asyncData({ app, params }) {
        let tag_list = await app.$axios.get(
            `${api_url.tag}?page=1&pageSize=1000`
        );
        let paramsArr = params.tag.split("=");
        const article_list = await app.$axios.get(
            `${api_url.article_info}?category_id=${paramsArr[1]}`
        );

        return {
            tag_list: tag_list.data.message.rows,
            article_list: article_list.data.message.rows,
            article_count: article_list.data.message.count
        };
    },
    components: {
        CartList
    },
    computed: {
        ...mapGetters(["get_tag"])
    },
    mounted() {
        console.log(this.tags_list);
    },
    methods: {
        ...mapActions(["set_tag"]),
        setActive(index, id) {
            this.set_tag(index);
            this.$router.push(`/category/id=${id}`);
        },
        allHandle() {
            this.set_tag(-1);
            this.$router.push("/category");
        }
    },
    beforeDestroy() {}
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
