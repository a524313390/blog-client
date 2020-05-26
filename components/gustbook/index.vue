<template>
  <div>
    <div class="block">
      <el-timeline>
        <el-timeline-item
          :timestamp="format(item.createdAt)"
          placement="top"
          v-for="(item, index) in message_list"
          :key="index"
        >
          <el-card>
            <h4>{{ item.avatar_name }}于{{ format(item.createdAt) }}</h4>
            <p v-text="item.message_content"></p>
            <el-card v-if="item.reply">
              <h4 class="admin">管理员回复:</h4>
              <p v-text="item.reply">{{}}</p>
            </el-card>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    message_list: {
      type: Array,
      required: true
    }
  },
  methods: {
    format(value) {
      return moment(value).format("YYYY-DD-MM");
    }
  }
};
</script>

<style scoped>
.admin {
  color: #f56c6c;
}
</style>
