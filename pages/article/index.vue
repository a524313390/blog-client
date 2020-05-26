<template>
  <div>
    <el-row type="flex" class="host_article" justify="center">
      <el-col :sm="15" class="container">
        <div class="article-container">
          <div class="top">
            <h3 class="title">{{ article_list.title }}</h3>
            <p class="desc">{{ article_list.desc }}</p>
            <p class="time">
              <i class="el-icon-time">{{ format(article_list.createdAt) }}</i>
              <i class="el-icon-collection-tag">{{
                article_list.tag_category.tag_name
              }}</i>
              <i class="el-icon-view">浏览次数:{{ article_list.count }}</i>
            </p>
          </div>

          <!-- <mavon-editor
            :subfield="false"
            :boxShadow="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :value="article_list.content_mark"
          /> -->
          <div class="markdown-body" v-html="article_list.content_mark"></div>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="message_container" justify="center">
      <el-col :sm="15">
        <div class="message">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
          >
            <el-form-item label="" prop="message_content" label-width="0">
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
              <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="gustbook">
          <Gustbook :message_list="message_list"></Gustbook>
        </div>
      </el-col>
    </el-row>
    <SelectLogin
      :dialogVisible="dialogVisible"
      @handleClose="handleClose"
    ></SelectLogin>
  </div>
</template>

<script>
import { api_url, client_api } from "@/api";
import { get_user } from "@/utils";
import SelectLogin from "@/components/select_login";
import moment from "moment";
import Gustbook from "@/components/gustbook";
import axios from "axios";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
export default {
  data() {
    return {
      article_list: [],
      ruleForm: {
        avatar_url:
          "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        message_content: "",
        avatar_name: "",
        article_id: ""
      },
      rules: {
        message_content: [
          { required: true, message: "请输入留言内容", trigger: "blur" },
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

  components: {
    SelectLogin,
    Gustbook
  },
  async asyncData({ app, query }) {
    const article_list = await app.$axios.get(
      `${api_url.article_info}?id=${query.id}`
    );
    const article_message = await app.$axios.get(
      `${api_url.article_message}?id=${query.id}&page=1&pageSize=1000`
    );

    return {
      article_list: article_list.data.message.rows[0],
      message_list: article_message.data.message.rows
    };
  },
  created() {
    let id = this.$route.query.id;
    this.ruleForm.article_id = id;
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
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        console.log(hljs.highlightAuto(code).value);
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
    this.article_list.content_mark = marked(this.article_list.content_mark);
  },
  methods: {
    format(value) {
      return moment(value).format("YYYY-DD-MM");
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const message = await axios.post(
            `${client_api.message_add}`,
            this.ruleForm
          );
          if (message.data.code == 0) {
            this.ruleForm.message_content = "";
            this.$message.warning("需要管理员审核后才能显示");
          }
        } else {
          return false;
        }
      });
    },
    foucsHandle() {
      if (process.browser) {
        if (!this.user) {
          this.dialogVisible = true;
        }
      }
    },
    handleClose(done) {
      this.dialogVisible = false;
    }
  }
};
</script>

<style>
.container {
  background: #fff;
  padding: 20px;
}
.top {
  text-align: center;
}
.desc {
  font-size: 13px;
  color: #42b983;
  word-break: break-all;
}
.time {
  font-size: 12px;
}
.time i {
  margin: 0 5px;
}
.content {
  padding: 30px;
}
.demo-ruleForm {
  display: flex;
}
.message_container {
  margin: 50px 0;
  padding: 0 20px;
}
.el-avatar {
  margin-right: 15px;
}

.markdown-body pre {
  background: #23241f !important;
}
.markdown-body pre code {
  color: #66d9ef;
}
</style>
