<template>
  <div>
    <el-dialog
      title="请选择登陆方式"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-image
        style="width: 100px; height: 100px"
        :src="qq_img"
        fit="cover"
        @click="loginHandle"
      ></el-image>
    </el-dialog>
  </div>
</template>

<script>
import qq_img from "@/assets/images/qq.png";
import { client_api } from "@/api";
import axios from "axios";
export default {
  name: "SelectLogin",
  data() {
    return {
      qq_img
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      defaule: false
    }
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    },
    async loginHandle() {
      if (process.browser) {
        const open_qq = await axios.get(`${client_api.qq_redirect}`);
        if (open_qq.data.code == 0) {
          window.open(open_qq.data.message);
        }
      }
    }
  }
};
</script>

<style scoped>
.el-image {
  cursor: pointer;
}
</style>
