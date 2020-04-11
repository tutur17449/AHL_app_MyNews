import { FETCHrequest } from '../tools/fetchClass';

export default (element, uri) => {

    const onHandleClick = (btn) => {
        btn.addEventListener('click', (event)=>{
            event.preventDefault()
            console.log(btn)
        })
    }

    const talkToAuthApi = (formData, uri) => {
        let urlAuthApi = `/api/auth/${uri}`
        let fetchApi = new FETCHrequest(urlAuthApi,'POST', formData);
        fetchApi.fetch()
        .then(jsonData => {
            console.log(jsonData)
        })
        .catch(error => {
            displayMsg('Les articles n\'ont pu être chargées.')
        })
    }

    const render = () => {
        const authForm = document.createElement('div')
        authForm.classList.add('row')

        if(uri === 'login'){
            authForm.innerHTML = `
            <div class="col-8 m-auto">
                <form>
                    <div class="form-group">
                        <label><small>Email</small></label>
                        <input type="email" class="form-control" name="email"/>
                    </div>
                    <div class="form-group">
                        <label><small>Pseudo</small></label>
                        <input type="text" class="form-control" name="pseudo"/>
                    </div>
                    <div class="form-group">
                        <label><small>Mot de passe</small></label>
                        <input type="password" class="form-control" name="password"/>
                    </div>
                    <div class="form-group">
                        <label><small>Confirmation du mot de passe</small></label>
                        <input type="password" class="form-control" name="passwordConfirm"/>
                    </div>  
                    <button type="submit" class="btn btn-primary mb-auto">
                        Se connecter
                    </button>          
                </form>
            </div>
            `;            
        } else {
            authForm.innerHTML = `
            <div class="col-8 m-auto">
                <form>
                    <div class="form-group">
                        <label><small>Email</small></label>
                        <input type="email" class="form-control" name="email"/>
                    </div>
                    <div class="form-group">
                        <label><small>Mot de passe</small></label>
                        <input type="password" class="form-control" name="password"/>
                    </div> 
                    <button type="submit" class="btn btn-primary mb-auto">
                        S'inscrire
                    </button>          
                </form>
            </div>
            `;              
        }
        element.appendChild(authForm)

        const btnSubmit = document.querySelector('button[type="submit"]')

        onHandleClick(btnSubmit)

    }

    return render()
}