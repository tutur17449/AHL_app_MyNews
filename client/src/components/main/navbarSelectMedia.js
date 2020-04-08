import { FETCHrequest } from '../../tools/fetchClass'
import displayArticles from './displayArticles'
import { openLoading, closeLoading } from '../../tools/displayLoading'
import { checkNavToggle } from '../../tools/checkNavToggle'
import { displayMsg } from '../../tools/displayMsg'

export default (element) => {

    openLoading()

    let apiUrlLang = "https://newsapi.org/v2/sources"

    let fetchApi = new FETCHrequest(apiUrlLang,'GET', null, process.env.API_KEY);
    fetchApi.fetch()
    .then(jsonData => {
        return render(jsonData)
    })
    .catch(error => {
        displayMsg('Les sources n\'ont pu être chargées.')
    })

    const onHandleChange = () => {
        element.addEventListener('change', () => {
            openLoading()
            checkNavToggle()
            let selectIndex = element.selectedIndex;
            let refId = element.options[selectIndex].getAttribute('ref-id');
            if(refId === 'null'){
                displayMsg('La sélection est incorrecte.')
                closeLoading()
            } else {
                getArticles(refId)         
            }
        })
    }

    const getArticles = (id) => {
        let searchMediaApiUrlLang = `https://newsapi.org/v2/top-headlines?sources=${id}`
        let fetchApi = new FETCHrequest(searchMediaApiUrlLang,'GET', null, process.env.API_KEY);
        fetchApi.fetch()
        .then(jsonData => {
            return displayArticles(jsonData)
        })
        .catch(error => {
            displayMsg('Les articles n\'ont pu être chargées.')
        })
    }

    const render = (data) => {
        let defaultSelect= document.createElement('option')   
        defaultSelect.textContent = '-- sources --'
        defaultSelect.setAttribute('ref-id','null')
        element.appendChild(defaultSelect)
        data.sources.map(i => {
            let option = document.createElement('option')
            option.setAttribute('ref-id',i.id)
            option.textContent = i.name
            element.appendChild(option)
        })
        closeLoading()
        onHandleChange()
    }
}