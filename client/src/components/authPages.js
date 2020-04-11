import { FETCHrequest } from '../tools/fetchClass';
import { displayMsg } from '../tools/displayMsg';

export default (element, uri) => {

    const onHandleClick = (btn) => {
        btn.addEventListener('click', (event)=>{
            event.preventDefault()
            console.log(btn)
            if(uri === 'login'){
                const email = document.querySelector('input[name="email"]')
                const pwd = document.querySelector('input[name="password"]')

                if(email.value.length === 0 || /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value) === false){
                    email.value = ''
                    return render(displayMsg('Le champ email est vide ou incorrect'))
                }

                if(pwd.value.length <= 5){
                    pwd.value = ''
                    return render(displayMsg('Le champ mot de passe est inférieur à 6 caractères.'))
                }

                let urlAuthApi = `/api/auth/${uri}`
                let fetchApi = new FETCHrequest(urlAuthApi,'POST', {email: email.value, pwd: pwd.value});
                return fetchApi.fetch()
                .then(jsonData => {
                    if(jsonData.error === null){
                        return window.location.replace("/");
                    }
                    return displayMsg(`Erreur lors de la connexion : ${jsonData.error}`)
                })
                .catch(error => {
                    return displayMsg('Erreur lors de la connexion')
                }) 

            } else {
                const email = document.querySelector('input[name="email"]')
                const pseudo = document.querySelector('input[name="pseudo"]')
                const pwd = document.querySelector('input[name="password"]')
                const pwdConfirm = document.querySelector('input[name="passwordConfirm"]')

                if(email.value.length === 0 || /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value) === false){
                    email.value = ''
                    return render(displayMsg('Le champ email est vide ou incorrect'))
                }

                if(pwd.value.length <= 5 || pwdConfirm.value.length <= 5 || pwd != pwdConfirm){
                    pwd.value = ''
                    pwdConfirm.value = ''
                    return render(displayMsg('Les champs mot de passe sont incorrects. Il doivent être supérieur à 5 caractères et correspondre.'))
                }

                if(pseudo.value.length <= 5){
                    pseudo.value = ''
                    return render(displayMsg('Le champ pseudo est inférieur à 6 caractères.'))
                }

                let urlAuthApi = `/api/auth/${uri}`
                let fetchApi = new FETCHrequest(urlAuthApi,'POST', {email: email.value, pseudo: pseudo.value, pwd: pwd.value, pwdConfirm: pwdConfirm.value});
                return fetchApi.fetch()
                .then(jsonData => {
                    if(jsonData.error === null){
                        return window.location.replace("/");
                    }
                    return displayMsg(`Erreur lors de l\'inscription : ${jsonData.error}`)
                })
                .catch(error => {
                    return displayMsg('Erreur lors de l\'inscription')
                }) 
            }
        })
    }

    const render = (message) => {
        element.innerHTML = ''
        const authForm = document.createElement('div')
        authForm.classList.add('row')

        if(uri === 'login'){
            if(message){
                message
            }
            authForm.innerHTML = `
            <div class="col-8 m-auto">
                <form>
                    <div class="form-group">
                        <label><small>Email</small></label>
                        <input type="text" class="form-control" name="email"/>
                    </div>
                    <div class="form-group">
                        <label><small>Mot de passe</small></label>
                        <input type="password" class="form-control" name="password"/>
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
                        <input type="email" class="form-control" name="email" required/>
                    </div>
                    <div class="form-group">
                        <label><small>Pseudo</small></label>
                        <input type="text" class="form-control" name="pseudo" required/>
                    </div>
                    <div class="form-group">
                        <label><small>Mot de passe</small></label>
                        <input type="password" class="form-control" name="password" required/>
                    </div>
                    <div class="form-group">
                        <label><small>Confirmation du mot de passe</small></label>
                        <input type="password" class="form-control" name="passwordConfirm" required/>
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