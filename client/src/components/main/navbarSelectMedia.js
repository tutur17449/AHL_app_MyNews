import { FETCHrequest } from '../../tools/fetchClass'

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

    const render = (data) => {
        let defaultSelect= document.createElement('option')   
        defaultSelect.textContent = '-- sources --'
        element.appendChild(defaultSelect)
        data.sources.map(i => {
            let option = document.createElement('option')
            option.textContent = i.name
            element.appendChild(option)
        })
    }
}