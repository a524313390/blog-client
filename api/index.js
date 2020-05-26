const api_url = {
    banner: "/banner",
    article: "/article",
    host_article: "/article/host",
    tag: "/tag",
    system: "/system",
    say: "/say",
    article_info: "/article/search",
    article_count: "/article/count",
    qq_login: "/login/qq/login",
    article_message: "/gustbook/message",
    category_message: "/gustbook/category_message"
};
const client_api = {
    article: "/api/article",
    tag: "/api/tag",
    qq_login: "/api/login/qq/login",
    qq_redirect: "/api/login/qq_login",
    message_add: "/api/gustbook/add"
};
const serve_url = "http://localhost:5000";
// const serve_url = "http://www.pangbo51.com:8035"
export { api_url, serve_url, client_api };
