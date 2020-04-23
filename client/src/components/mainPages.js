import navbar from './main/navbar'
import displayArticles from './main/displayArticles'
import { openLoading, closeLoading } from '../tools/displayLoading'
import { FETCHrequest } from '../tools/fetchClass'
import { displayMsg } from '../tools/displayMsg'

export default (element) => {

    const getFavorite = () => {
        openLoading()
        let apiUrlBookmark = window.location.origin+'/api/bookmark'
        let fetchApi = new FETCHrequest(apiUrlBookmark,'GET');
        fetchApi.fetch()
        .then(jsonData => {
            return displayArticles(jsonData.data)
        })
        .catch(error => {
            displayMsg('Les favoris n\'ont pas pu être récupérés, vérifiez la connexion.')
            closeLoading()
        })        
    }
    
    const render = () => {
        let mainContainer = document.createElement('div')
        mainContainer.classList.add('row')
        mainContainer.style.width = '100vw'
        mainContainer.style.height = '100vh'
        mainContainer.innerHTML = `
        <div id="left">
        </div>
        <div id="right">
            <div id="fix-news">
                <div style="width: 80%; margin:auto; text-align: center;">
                    <h1> 
                        MyNews : votre actualité à portée de clic !
                    </h1>
                    <p>
                        Accéder aux articles de presse des principaux journaux mondiaux. <br>
                        Copyright 2020 - AHL App
                    </p>
                </div>
            </div>
        </div>
        <div id="right-mobile">
        </div>
        `
        element.appendChild(mainContainer)
        
        let leftContainer = document.querySelector('#left')

        if(window.location.pathname === '/favoris'){
            navbar(leftContainer)
            return getFavorite()
        } else {
            return navbar(leftContainer)
        }
    }

    return render ();

}