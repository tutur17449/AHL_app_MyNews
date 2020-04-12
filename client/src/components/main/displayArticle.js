import logo from '../../assets/img/live-news.svg'
import svgBriefcase from '../../assets/img/briefcase-solid.svg'
import svgUserEdit from '../../assets/img/user-edit-solid.svg'
import svgLink from '../../assets/img/link-solid.svg'
import svgCalendar from '../../assets/img/calendar-alt-solid.svg'
import svgBookmark from '../../assets/img/bookmark-solid.svg'
import { checkToken } from '../../tools/checkToken'
import { FETCHrequest } from '../../tools/fetchClass'
import { displayMsg } from '../../tools/displayMsg'
import { openLoading, closeLoading } from '../../tools/displayLoading'


export default (data) => {

    const addBookmark = (imgUrl) => {
        const btnAddBookmark = document.querySelector('button[name="addBookmark"]')
        btnAddBookmark.addEventListener('click', () => {
            openLoading()
            const bookmarkData = {
                title: data.title,
                subContent: data.description,
                mainContent: data.content,
                image: imgUrl,
                source: data.url,
                date: new Date(data.publishedAt).toLocaleDateString()
            }
            bookmarkTalkApi(bookmarkData, 'POST')
        })
    }

    const removeBookmark = () => {
        const btnRemoveBookmark = document.querySelector('button[name="removeBookmark"]')
        btnRemoveBookmark.addEventListener('click', () => {
            openLoading()
            const id = btnRemoveBookmark.getAttribute('ref-id')
            document.querySelector(`.article[ref-id="${id}"]`).remove()
            bookmarkTalkApi(null, 'DELETE', id)
        })
    }

    const bookmarkTalkApi = (data, method, id) => {
        let bookmarkUrlApi = ''
        if(id){
            bookmarkUrlApi = window.location.origin+`/api/bookmark/${id}`
        } else {
            bookmarkUrlApi = window.location.origin+`/api/bookmark`
        }
        let fetchApi = new FETCHrequest(bookmarkUrlApi, method, data);
        fetchApi.fetch()
        .then(jsonData => {
            displayMsg(jsonData.message)
            closeLoading()
        })
        .catch(error => {
            displayMsg(error.message)
            closeLoading()
        })
    }

    const render = () => {
        let leftContainer = document.querySelector('#left')
        let rightContainer = document.querySelector('#right')
        let rightMobileContainer = document.querySelector('#right-mobile')

        leftContainer.style.filter = 'blur(.5rem)';
        rightContainer.style.filter = 'blur(.5rem)';
        rightMobileContainer.classList.add('open');


        if(window.location.pathname === '/favoris'){
            rightMobileContainer.innerHTML = `
            <div class="container">
                <div class="row mt-5 mb-5">
                    <h5 class="mt-3">${data.title}</h5>
                </div>
                <div class="row mt-5 mb-5">
                    <div class="col-12">
                        <img class="img img-fluid img-article" src="${data.image}" alt="${data.title}">
                    </div>
                    <div class="col-12">
                        <p>
                            <bold>${data.subContent}</bold> <br> <br>
                            <span class="mt-3"> ${data.mainContent} </span>
                        </p>
                        <button type="button" class="btn btn-light">
                            <a href="${data.source}" target="_blank"> <img class="svg" alt="link icon" src="${svgLink}"> Lire l'article sur le
                                site de l'annonceur </a>
                        </button>
                        <button type="button" class="btn btn-danger" name="removeBookmark" ref-id="${data._id}">
                            <img class="svg" alt="bookmark icon" src="${svgBookmark}"> Supprimer le favori
                        </button>
                    </div>
                </div>
                <div class="row mt-5 mb-5">
                    <span><img class="svg" alt="calendar icon" src="${svgCalendar}">${data.date}</span>
                </div>
            </div>
            `;
    
            rightMobileContainer.addEventListener('click', ()=> {
                rightMobileContainer.classList.remove('open')
                leftContainer.style.filter = 'blur(.0rem)';
                rightContainer.style.filter = 'blur(.0rem)';
            })      
            
            removeBookmark()

        } else {
            let imgUrl = ''

            if(data.urlToImage === null || data.urlToImage === 'null'){
                imgUrl = logo
            } else {
                if(data.urlToImage.substr(0,5) === 'http:'){
                    imgUrl = logo
                } else {
                    imgUrl = data.urlToImage
                }
            }
    
            rightMobileContainer.innerHTML = `
            <div class="container">
                <div class="row mt-5 mb-5">
                    <span><img class="svg" alt="business icon" src="${svgBriefcase}"> ${data.source.name}</span>
                    <span class="ml-2"><img class="svg" src="${svgUserEdit}" alt="author icon"> ${data.author}</span>
                    <h5 class="mt-3">${data.title}</h5>
                </div>
                <div class="row mt-5 mb-5">
                    <div class="col-12">
                        <img class="img img-fluid img-article" src="${imgUrl}" alt="${data.title}">
                    </div>
                    <div class="col-12">
                        <p>
                            <bold>${data.description}</bold> <br> <br>
                            <span class="mt-3"> ${data.content} </span>
                        </p>
                        ${checkToken(process.env.COOKIE_NAME) ?
                            `
                            <button type="button" class="btn btn-light">
                                <a href="${data.url}" target="_blank"> <img class="svg" alt="link icon" src="${svgLink}"> Lire l'article sur le
                                    site de l'annonceur </a>
                            </button>
                            <button type="button" class="btn btn-light" name="addBookmark">
                                <img class="svg" alt="bookmark icon" src="${svgBookmark}"> Ajouter au favori
                            </button>
                            `
                        :
                        `
                        <button type="button" class="btn btn-light">
                            <a href="${data.url}" target="_blank"> <img class="svg" alt="link icon" src="${svgLink}"> Lire l'article sur le
                                site de l'annonceur </a>
                        </button>
                        `
                        }
                    </div>
                </div>
                <div class="row mt-5 mb-5">
                    <span><img class="svg" alt="calendar icon" src="${svgCalendar}">${new Date(data.publishedAt).toLocaleDateString()}</span>
                </div>
            </div>
            `;
    
            rightMobileContainer.addEventListener('click', ()=> {
                rightMobileContainer.classList.remove('open')
                leftContainer.style.filter = 'blur(.0rem)';
                rightContainer.style.filter = 'blur(.0rem)';
            })
    
            addBookmark(imgUrl)
        }
    }

    return render()

}