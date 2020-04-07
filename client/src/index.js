import mainPages from './components/mainPages'
import { initLoading, openLoading, closeLoading } from './tools/displayLoading';
import './assets/css/style.css'
import loader from './assets/img/loading.gif'


const root = document.querySelector('#root')
const loading = document.querySelector('#loading')

const router = () => {
    if(window.location.pathname === '/'){
        return mainPages(root)
    } else {
        return window.location.replace("/");
    }
}

router()
initLoading(loader)
