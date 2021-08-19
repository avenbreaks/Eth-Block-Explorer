

export const onError = (err, req, res, next) => {

    if(err){
        return res.status(400).json({ status: "error", message: err.toString()})
    }

    next();
}


