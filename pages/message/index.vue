<template>
    <div>
        <el-row type="flex" class="message_container" justify="center">
            <el-col :sm="15" class="top">
                <el-form
                    :model="ruleForm"
                    status-icon
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                >
                    <el-form-item label prop="message_content" label-width="0">
                        <div class="demo-ruleForm">
                            <el-avatar :size="50" :src="ruleForm.avatar_url"></el-avatar>
                            <el-input
                                ref="textarea"
                                type="textarea"
                                v-model="ruleForm.message_content"
                                @focus="foucsHandle"
                            ></el-input>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button type="primary" @click="loginOut">退出</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <SelectLogin :dialogVisible="dialogVisible" @handleClose="handleClose"></SelectLogin>
        <el-row type="flex" class="message_list" justify="center">
            <el-col :sm="15">
                <Gustbook :message_list="message_list"></Gustbook>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import SelectLogin from "@/components/select_login";
import { get_user } from "@/utils";
import axios from "axios";
import { api_url, client_api } from "@/api";
import Gustbook from "@/components/gustbook";
export default {
    data() {
        return {
            ruleForm: {
                avatar_url:
                    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                message_content: "",
                avatar_name: "",
                message: true
            },
            rules: {
                message_content: [
                    {
                        required: true,
                        message: "请输入留言内容",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 200,
                        message: "长度在 3 到 200个字符",
                        trigger: "blur"
                    }
                ]
            },
            dialogVisible: false
        };
    },
    async asyncData({ app }) {
        const category_message = await app.$axios.get(
            `${api_url.category_message}`
        );

        return {
            message_count: category_message.data.message.count,
            message_list: category_message.data.message.rows
        };
    },
    components: {
        SelectLogin,
        Gustbook
    },
    mounted() {
        if (process.browser) {
            let user = get_user();
            if (user) {
                this.user = JSON.parse(user);

                this.ruleForm.avatar_url = this.user.figureurl_qq_2;
                this.ruleForm.avatar_name = this.user.nickname;
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let message = await axios.post(
                        `${client_api.message_add}`,
                        this.ruleForm
                    );
                    if (message.data.code == 0) {
                        this.$message.warning("需要管理员审核");
                    }
                } else {
                    return false;
                }
            });
        },
        foucsHandle() {
            if (process.browser) {
                console.log(this.user);
                if (!this.user) {
                    this.dialogVisible = true;
                }
            }
        },
        handleClose(done) {
            this.dialogVisible = false;
        },
        loginOut() {
            localStorage.removeItem("user_info");
            this.ruleForm = {
                avatar_url:
                    "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
                message_content: "",
                avatar_name: "",
                message: true
            };
            this.user = null;
        }
    }
};
</script>

<style scoped>
.top {
    background: #fff;
    padding: 20px;
}
.message_container {
    margin: 50px 0;
    padding: 0 20px;
}
.el-avatar {
    margin-right: 15px;
}
.demo-ruleForm {
    display: flex;
}
</style>
