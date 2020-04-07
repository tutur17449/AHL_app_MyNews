exports.displayMsg = (msg) => {
    let msgPopin = document.querySelector('#msgPopin');
    msgPopin.innerHTML = `
        <p>${msg}</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    msgPopin.classList.add('open');
    setTimeout(() => {
        msgPopin.classList.remove('open');
    }, 3000)
}