import axios from 'axios';
export default async function (ctx) {

    const article = await ctx.$axios.get('/article')

    if (article.data.code == 0) {
        ctx.store.dispatch('add', article.data.message.rows)
    }

}
