import logo from '../../assets/img/live-news.svg'
import svgSearchPlus from '../../assets/img/search-plus-solid.svg'
import svgCalendar from '../../assets/img/calendar-alt-solid.svg'
import { closeLoading } from '../../tools/displayLoading'
import displayArticle from './displayArticle';

export default (data) => {

    const render = () => {
        let articleList = document.querySelector('#fix-news');
        articleList.innerHTML = ''

        if(window.location.pathname === '/favoris'){
            data.map(i => {
                
                let article = document.createElement('div')
                article.setAttribute('ref-id', i._id)
                article.classList.add('article')
                article.innerHTML = `
                <h6>${i.title}</h6> 
                <img class="img img-fluid" src="${i.image}" alt="image ${i.title}">
                <div class="d-flex flex-row justify-content-between ">
                    <span><img class="svg" src="${svgCalendar}" alt="calendar icon"> ${i.date}</span>
                    <button class="btnShow" href="${i.source}" target="_blank"><img class="svg" src="${svgSearchPlus}" alt="show more icon"> voir plus </button>
                </div>
                `
                articleList.appendChild(article)
    
                article.addEventListener('click', () => {
                    displayArticle(i)
                })
    
            })
            closeLoading()            
        } else {
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
                    <span><img class="svg" src="${svgCalendar}" alt="calendar icon"> ${convertDt}</span>
                    <button class="btnShow" href="${i.url}" target="_blank"><img class="svg" src="${svgSearchPlus}" alt="show more icon"> voir plus </button>
                </div>
                `
                articleList.appendChild(article)
    
                article.addEventListener('click', () => {
                    displayArticle(i)
                })
    
            })
            closeLoading()
        }
    }
    return render()
}