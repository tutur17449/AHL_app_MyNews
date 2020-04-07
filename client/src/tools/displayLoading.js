exports.initLoading = (loader) => {
    console.log(loader)
    const img = document.createElement('img')
    img.setAttribute('src', '/'+loader)
    loading.appendChild(img)
}

exports.openLoading = () => {
    loading.classList.add('open');  
}

exports.closeLoading = () => {
    loading.classList.remove('open');  
}
