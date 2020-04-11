import mainPages from './components/mainPages'
import { initLoading } from './tools/displayLoading';
import './assets/css/style.css'
import loader from './assets/img/loading.gif'
import icon from './assets/img/live-news.svg'
import loginPages from './components/loginPages';


const root = document.querySelector('#root')
const loading = document.querySelector('#loading')
const linkIcon = document.querySelector('link[rel="icon"]')
linkIcon.setAttribute('href', icon)

const router = () => {
    if(window.location.pathname === '/'){
        return mainPages(root)
    } else if (window.location.pathname === '/login') {
        return loginPages(root)
    } else {
        return window.location.replace("/");
    }
}

router()
initLoading(loader)
