<template>
  <div class="footer">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :md="15">
        <div class="bg-purple">网站备案号:{{ get_system.record }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["get_system"])
  }
};
</script>

<style scoped>
.footer {
  background-image: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
  padding-top: 20px;
  color: #fff;
  line-height: 60px;
  text-align: center;
}
</style>
