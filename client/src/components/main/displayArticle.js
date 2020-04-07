export default (data) => {

    const render = () => {
        let leftContainer = document.querySelector('#left')
        let rightContainer = document.querySelector('#right')
        let rightMobileContainer = document.querySelector('#right-mobile')

        leftContainer.style.filter = 'blur(.5rem)';
        rightContainer.style.filter = 'blur(.5rem)';
        rightMobileContainer.classList.add('open');
        rightMobileContainer.innerHTML = `
        <div class="container">
            <div class="row mt-5 mb-5">
                <span><i class="fas fa-briefcase"></i> ${data.source.name}</span>
                <span class="ml-2"><i class="fas fa-user-edit"></i> ${data.author}</span>
                <h5 class="mt-3">${data.title}</h5>
            </div>
            <div class="row mt-5 mb-5">
                <div class="col-12">
                    <img class="img img-fluid img-article" src="${data.urlToImage}" alt="${data.title}">
                </div>
                <div class="col-12">
                    <p>
                        <bold>${data.description}</bold> <br> <br>
                        <span class="mt-3"> ${data.content} </span>
                    </p>
                    <button type="button" class="btn btn-light">
                        <a href="${data.url}" target="_blank"> <i class="fas fa-external-link-alt"></i> Lire l'article sur le
                            site de l'annonceur </a>
                    </button>
                </div>
            </div>
            <div class="row mt-5 mb-5">
                <span><i class="far fa-clock"></i>${new Date(data.publishedAt).toLocaleDateString()}</span>
            </div>
        </div>
        `;

        rightMobileContainer.addEventListener('click', ()=> {
            rightMobileContainer.classList.remove('open')
            leftContainer.style.filter = 'blur(.0rem)';
            rightContainer.style.filter = 'blur(.0rem)';
        })
    }

    return render()

}