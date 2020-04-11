exports.successRequest = (res, data, message) =>{
    return res.json({
        message : message,
        error : null,
        data : data  
    })
}

exports.badRequest = (res, err, message)=>{
    return res.json({
        message : message,
        error : err,
        data : null        
    })
}