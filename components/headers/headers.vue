<template>
    <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="grid-content bg-purple">
                <el-row type="flex" class="row-bg" justify="end">
                    <el-col :sm="12" class="menu">
                        <div>
                            <i class="el-icon-s-home"></i>
                            <nuxt-link to="/">首页</nuxt-link>
                        </div>
                        <div>
                            <i class="el-icon-collection-tag"></i>
                            <nuxt-link to="/category">分类</nuxt-link>
                        </div>
                        <div>
                            <i class="el-icon-s-flag"></i>
                            <nuxt-link to="/say">日志</nuxt-link>
                        </div>
                        <div>
                            <i class="el-icon-s-comment"></i>
                            <nuxt-link to="/message">留言</nuxt-link>
                        </div>
                        <!-- <div>
              <i class="el-icon-search"></i>
              <span>搜索</span>
                        </div>-->
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {};
</script>

<style scoped>
.el-col {
    border-radius: 4px;
}

.bg-purple {
    background-image: linear-gradient(to right, #4cbf30 0%, #0f9d58 100%);
}

.grid-content {
    border-radius: 4px;
    min-height: 64px;
    line-height: 64px;
    color: #fff;
}
.menu {
    display: flex;
    justify-content: space-around;
}
a {
    text-decoration: none;
    color: #fff;
}
</style>
