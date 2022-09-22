const asyncWrap = (Controller) => {
    return (req, res, next) => {
        Controller(req, res, next).catch(next)
    }
}

const globalErrorHandler = (err, req, res, next) => {
    if (err.statusCode === 400) {
        res.status(400).json({ message:err.message })
        return
    }
    
    if (err.statusCode === 404) {
        res.status(404).json({ message:'No data'})
        return
    }

    res.status(err.statusCode || 500).json({ message:err.message })
}

module.exports = {
    asyncWrap,
    globalErrorHandler
}