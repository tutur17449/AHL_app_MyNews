import navbarSelectLang from './navbarSelectLang'
import navbarSelectMedia from './navbarSelectMedia'
import logo from '../../assets/img/live-news.svg'

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
        <!-- Button trigger modal -->
        <div id="brand-tools" class="pt-4 pb-4 d-flex m-auto w-90 flex-column justify-content-around">
            <div class="form-group">
                <label for="search-posts-value">Rechercher un sujet</label>
                <div class="form-inline">
                    <input id="search-posts-value" class="form-control mr-sm-2 w-auto" type="search"
                        placeholder="Rechercher un sujet" aria-label="Search">
                    <button id="search-posts-btn" class="btn btn-outline-success"><i class="fas fa-tag"></i>
                        Rechercher</button>
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
                    <option ref-id="null">--catégories--</option>
                    <option ref-id="science">Science</option>
                    <option ref-id="technology">Téchnologie</option>
                    <option ref-id="business">Business</option>
                    <option ref-id="general">Général</option>
                    <option ref-id="health">Santé</option>
                    <option ref-id="sports">Sport</option>
                    <option ref-id="entertainment">Divers</option>
                </select>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center align-items-center">
            <button class="btn btn-auth mr-1" data-container="body" data-toggle="popover" data-placement="top"
                data-content="A venir" disabled>S'inscrire</button>
            <button class="btn btn-auth" data-container="body" data-toggle="popover" data-placement="top"
                data-content="A venir" disabled>Se connecter</button>
        </div>
    </div>
</div>
        `
        element.appendChild(navContainer)
        let selectMedia = document.querySelector('#selectMedia')
        let selectLang = document.querySelector('#selectLang')
        navbarSelectLang(selectLang)
        navbarSelectMedia(selectMedia)
    }

    return render()

}


