import { initLoading, openLoading, closeLoading } from './tools/displayLoading';
import './assets/css/style.css'
import loader from './assets/img/loading.gif'


const root = document.querySelector('#root')
const loading = document.querySelector('#loading')

const router = () => {
    if(window.location.pathname === '/'){
        console.log('/')
    } else {
        return window.location.replace("/");

    }
}

router()
initLoading(loader)
