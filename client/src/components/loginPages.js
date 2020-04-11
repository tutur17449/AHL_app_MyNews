export default (element) => {

    const render = () => {
        const loginForm = document.createElement('div')
        loginForm.classList.add('row')
        loginForm.innerHTML = `
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
            </form>
        </div>
        `;
        element.appendChild(loginForm)
    }
    
    return render()
}