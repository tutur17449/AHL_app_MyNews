import { FETCHrequest } from '../../tools/fetchClass'
import { openLoading } from '../../tools/displayLoading'
import { checkNavToggle } from '../../tools/checkNavToggle'
import { displayMsg } from '../../tools/displayMsg'
import displayArticles from './displayArticles'
import svgHashtag from '../../assets/img/hashtag-solid.svg'

export default (element) => {

    const onHandleClick = () => {
        let searchBtn = document.querySelector('#search-posts-btn')
        searchBtn.addEventListener('click', () => {
            let searchValue = document.querySelector('#search-posts-value').value;
            if(searchValue === null || searchValue.length === 0){
                displayMsg('Le champ recherche est vide');
            } else {
                let spec = searchValue.indexOf('<') + searchValue.indexOf('>');
                if(spec === -2){
                    openLoading();
                    checkNavToggle()
                    getArticles(searchValue)
                } else {
                    displayMsg('Une erreur s\'est produite')
                }
            }            
        })
    }

    const getArticles = (term) => {
        let searchTermApiUrl = `https://newsapi.org/v2/everything?q=${term}&sortBy=publishedAt`
        let fetchApi = new FETCHrequest(searchTermApiUrl,'GET', null, process.env.API_KEY);
        fetchApi.fetch()
        .then(jsonData => {
            return displayArticles(jsonData)
        })
        .catch(error => {
            displayMsg('Les articles n\'ont pu être chargées.')
        })
    }

    const render = () => {
        element.innerHTML = `
        <input id="search-posts-value" class="form-control mr-sm-2 w-auto" type="search" placeholder="Rechercher un sujet" aria-label="Search">
        <button id="search-posts-btn" class="btn btn-outline-success"><img class="svg" alt="search icon" src="${svgHashtag}">Rechercher</button>        
        `
        onHandleClick()
    }

    return render()

}