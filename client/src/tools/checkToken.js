exports.checkToken = (token) => {
    console.log(token)
    if (document.cookie.split(';').some((item) => item.trim().startsWith(token))) {
        return true
    } else {
        return false
    }
}
