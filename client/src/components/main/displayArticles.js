import logo from '../../assets/img/live-news.svg'

export default (data) => {

    const render = () => {
        let articleList = document.querySelector('#fix-news');
        articleList.innerHTML = ''

        data.articles.map(i => {
            let imgUrl = ''
            let convertDt = new Date(i.publishedAt).toLocaleDateString()

            if(i.urlToImage === null || i.urlToImage === 'null'){
                imgUrl = logo
            } else {
                if(i.urlToImage.substr(0,5) === 'http:'){
                    imgUrl = logo
                } else {
                    imgUrl = i.urlToImage
                }
            }
            
            let article = document.createElement('div')
            article.setAttribute('ref-id', i.id)
            article.classList.add('article')
            article.innerHTML = `
<h6>${i.title}</h6> 
<img class="img img-fluid" src="${imgUrl}" alt="image ${i.title}">
<div class="d-flex flex-row justify-content-between ">
    <span><i class="far fa-clock"></i>${convertDt}</span>
    <button class="btnShow" href="${i.url}" target="_blank"><i class="fas fa-search-plus"></i> voir plus </button>
</div>
            `
            articleList.appendChild(article)
        })
    }
    return render()
}