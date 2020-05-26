import { api_url, serve_url, client_api } from "@/api";
async function get_system(app, store) {
    let system_list = await app.$axios.get(`${api_url.system}`);
    store.dispatch("set_system", system_list.data.message[0]);
    return system_list
}

function get_user() {

    let user_info = localStorage.getItem('user_info')
    return user_info

}
export {
    get_system,
    get_user
}