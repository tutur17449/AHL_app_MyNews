exports.initLoading = (loader) => {
    const img = document.createElement('img')
    img.setAttribute('src', '/'+loader)
    img.setAttribute('alt','animation chargement de la page')
    loading.appendChild(img)
}

exports.openLoading = () => {
    loading.classList.add('open');  
}

exports.closeLoading = () => {
    loading.classList.remove('open');  
}
