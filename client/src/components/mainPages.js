import navbar from './main/navbar'

export default (element) => {
    
    const render = () => {
        let mainContainer = document.createElement('div')
        mainContainer.classList.add('row')
        mainContainer.innerHTML = `
<div id="left">
</div>
<div id="right">
</div>
<div id="right-mobile">
</div>
        `
        console.log(mainContainer)
        element.appendChild(mainContainer)
        
        let leftContainer = document.querySelector('#left')
        let rightContainer = document.querySelector('#right')
        let rightMobileContainer = document.querySelector('#right-mobile')

        navbar(leftContainer)

    }

    return render ();

}