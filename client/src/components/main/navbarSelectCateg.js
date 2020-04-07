import { FETCHrequest } from '../../tools/fetchClass'
import displayArticles from './displayArticles'
import { openLoading, closeLoading } from '../../tools/displayLoading'
import { checkNavToggle } from '../../tools/checkNavToggle'
import { displayMsg } from '../../tools/displayMsg'

export default (element) => {

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
        let searchCategApiUrlLang = `https://newsapi.org/v2/top-headlines?country=fr&category=${id}`
        let fetchApi = new FETCHrequest(searchCategApiUrlLang,'GET', null, process.env.API_KEY);
        fetchApi.fetch()
        .then(jsonData => {
            return displayArticles(jsonData)
        })
        .catch(error => {
            displayMsg('Les articles n\'ont pu être chargées.')
        })
    }

    const render = (data) => {
        element.innerHTML = `
<option ref-id="null">--catégories--</option>
<option ref-id="science">Science</option>
<option ref-id="technology">Téchnologie</option>
<option ref-id="business">Business</option>
<option ref-id="general">Général</option>
<option ref-id="health">Santé</option>
<option ref-id="sports">Sport</option>
<option ref-id="entertainment">Divers</option>        
        `
        onHandleChange()
        }
    return render()
}