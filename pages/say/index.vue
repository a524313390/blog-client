<template>
    <div>
        <el-row type="flex" class="host_article" justify="center">
            <el-col :sm="15">
                <h4 class="host_title">({{ this.say_count }})条日志</h4>
                <div class="block">
                    <el-timeline>
                        <el-timeline-item
                            :timestamp="format(item.createdAt)"
                            placement="top"
                            :color="index % 2 == 0 ? '#0bbd87' : '#F56C6C'"
                            v-for="(item, index) in say_list"
                            :key="index"
                        >
                            <el-card>
                                <h4>{{ get_system.adminname }}:</h4>
                                <p v-html="item.say_content"></p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { get_system } from "@/utils";
import { mapGetters, mapActions } from "vuex";
import { api_url } from "@/api";
import moment from "moment"; //导入文件
export default {
    head() {
        return {
            title:
                this.get_system.adminname +
                "_" +
                this.get_system.sitename +
                "_日志",
            meta: [
                {
                    hid: "description",
                    name: "description",
                    content: `${this.get_system.adminname},${this.get_system.sitename},${this.tag_list}`
                }
            ]
        };
    },
    async asyncData({ app, store }) {
        let system = await get_system(app, store);
        let say_list = await app.$axios.get(
            `${api_url.say}?page=1&pageSize=1000`
        );
        return {
            say_list: say_list.data.message.rows,
            say_count: say_list.data.message.count
        };
    },
    computed: {
        ...mapGetters(["get_system"])
    },
    mounted() {
        console.log(this.say_list);
    },
    methods: {
        format(time) {
            return moment(time).format("YYYY-DD-MM");
        }
    }
};
</script>

<style scoped>
.el-col {
    background: #fff;
    padding: 20px;
}
</style>
