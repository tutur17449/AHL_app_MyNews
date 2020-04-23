import mainPages from './components/mainPages'
import { initLoading } from './tools/displayLoading';
import './assets/css/style.css'
import loader from './assets/img/loading.gif'
import icon from './assets/img/live-news.svg'
import authPages from './components/authPages';
import { checkToken } from './tools/checkToken';

const root = document.querySelector('#root')
const loading = document.querySelector('#loading')
const linkIcon = document.querySelector('link[rel="icon"]')
linkIcon.setAttribute('href', icon)

const router = () => {
    if(window.location.pathname === '/'){
        return mainPages(root)
    } else if (window.location.pathname === '/login') {
        return authPages(root, 'login')
    } else if (window.location.pathname === '/register') {
        return authPages(root, 'register')
    } else if (window.location.pathname === '/favoris') {
        checkToken(process.env.COOKIE_NAME) ? 
            mainPages(root)
        :
            window.location.replace("/")
    } else {
        return window.location.replace("/");
    }
}

router()
initLoading(loader)
