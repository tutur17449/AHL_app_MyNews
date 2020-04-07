import { FETCHrequest } from '../../tools/fetchClass'
import displayArticles from './displayArticles'

export default (element) => {

    let apiUrlLang = "https://newsapi.org/v2/sources"

    let fetchApi = new FETCHrequest(apiUrlLang,'GET', null, process.env.API_KEY);
    fetchApi.fetch()
    .then(jsonData => {
        return render(jsonData)
    })
    .catch(error => {
        console.log(error)
    })

    const onHandleChange = () => {
        element.addEventListener('change', () => {
            let selectIndex = element.selectedIndex;
            let refId = element.options[selectIndex].getAttribute('ref-id');
            if(refId === 'null'){
                console.log('default select')
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
            console.log(error)
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
        onHandleChange()
    }
}