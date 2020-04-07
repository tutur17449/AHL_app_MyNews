exports.checkNavToggle = () => {
    let navToggle = document.querySelectorAll('.navbar-toggler')[0];
    let navCollapse = document.querySelectorAll('.navbar-collapse')[0];
    let navToggleStyle = getComputedStyle(navToggle);
    if(navToggleStyle.display === 'block'){
        navCollapse.classList.remove('show')
    }
}