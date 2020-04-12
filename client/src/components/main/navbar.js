import navbarSelectLang from './navbarSelectLang'
import navbarSelectMedia from './navbarSelectMedia'
import navbarSelectCateg from './navbarSelectCateg'
import searchForm from './navbarSearchForm'
import logo from '../../assets/img/live-news.svg'
import { checkToken } from '../../tools/checkToken'

export default (element) => {

    const render = () => {

        let navContainer = document.createElement('nav')
        navContainer.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light')

        navContainer.innerHTML = `
        <a href="/"><img src="${logo}" class="img img-fluid d-lg-none" style="width:70px;height:70px;"alt="Logo MyNews"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span> Menu
        </button>
        <div class="collapse navbar-collapse show" id="navbarNavAltMarkup">
            <div class="d-flex flex-column justify-content-center align-items-center">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <h1>MyNews</h1>
                    <a href="/"><img src="${logo}" class="img img-fluid d-none d-lg-block"
                            style="width:70px;height:70px;" alt="Logo MyNews"></a>
                </div>
                ${ (window.location.pathname === '/favoris') ? 
                    `
                    `
                :
                    `
                    <div id="brand-tools" class="pt-4 pb-4 d-flex m-auto w-90 flex-column justify-content-around">
                        <div class="form-group">
                            <label for="search-posts-value">Rechercher un sujet</label>
                            <div id="search-container" class="form-inline">
                            </div>
                        </div>
                        <div class="form-group mt-5">
                            <label for="selectMedia">Journaux Mondiaux</label>
                            <select class="form-control" id="selectMedia">
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="selectLang">Journaux Locaux</label>
                            <select class="form-control" id="selectLang">
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="selectCateg">Catégories</label>
                            <select class="form-control" id="selectCateg">
                            </select>
                        </div>
                    </div>
                    `
                }
                ${ 
                    checkToken(process.env.COOKIE_NAME) ? 
                        ` 
                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <button class="btn btn-success mr-1" data-container="body" data-toggle="popover" data-placement="top"
                                data-content="A venir"><a href="/favoris" style="color:#fff;"> Mes favoris </a></button>
                            <button class="btn btn-danger" data-container="body" data-toggle="popover" data-placement="top"
                                data-content="A venir"><a href="${window.location.origin}/api/auth/logout" style="color:#fff;">Se déconnecter</a></button>
                        </div>
                        ` 
                        :
                        ` 
                        <div class="d-flex flex-row justify-content-center align-items-center">
                            <button class="btn btn-auth mr-1" data-container="body" data-toggle="popover" data-placement="top"
                                data-content="A venir"><a href="/register">S'inscrire</a></button>
                            <button class="btn btn-auth" data-container="body" data-toggle="popover" data-placement="top"
                                data-content="A venir"><a href="/login">Se connecter</a></button>
                        </div>
                        ` 
                }
            </div>
        </div>
        `
        element.appendChild(navContainer)

        if(window.location.pathname === '/') {
            let selectMedia = document.querySelector('#selectMedia')
            let selectLang = document.querySelector('#selectLang')
            let selectCateg = document.querySelector('#selectCateg')
            let searchContainer = document.querySelector('#search-container')
    
            navbarSelectLang(selectLang)
            navbarSelectMedia(selectMedia)
            navbarSelectCateg(selectCateg)
            return searchForm(searchContainer)
        }    
    }

    return render()

}


