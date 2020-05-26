<template>
    <div class="layout">
        <Headers></Headers>
        <div class="main">
            <nuxt />
        </div>

        <Footer></Footer>
    </div>
</template>
<script>
import Headers from "@/components/headers/headers.vue";
import SilderLeft from "@/components/silderLeft/silderLeft.vue";
import Footer from "@/components/footer/footer.vue";
export default {
    components: {
        Headers,
        SilderLeft,
        Footer
    }
};
</script>
<style>
.el-header {
    padding: 0;
}
body {
    background-color: #eaeaea;
    color: #34495e;
    overflow: auto !important;
}
a {
    text-decoration: none;
    color: #34495e;
}
</style>
