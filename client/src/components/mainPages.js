import navbar from './main/navbar'

export default (element) => {
    
    const render = () => {
        let mainContainer = document.createElement('div')
        mainContainer.classList.add('row')
        mainContainer.innerHTML = `
<div id="left">
</div>
<div id="right">
    <div id="fix-news">
        <div style="width: 80%; margin:auto; text-align: center;">
            <h2> 
                Votre actualité à portée de clic ! <br>
            </h2>
            <p>
                Copyright 2020 - AHL App
            </p>
        </div>
    </div>
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