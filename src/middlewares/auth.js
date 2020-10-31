import jwt from 'jsonwebtoken'
import HttpStatus from 'http-status-codes'

export const SECRET_ENCODING_MESSAGE = process.env.JWT_TOKEN || 'literacy'
const METHOD_AUTHORIZED = "GET"
const PATH_AUTHORIZED = ""

export let auth = (req, res, next) => {
    if(req.method === METHOD_AUTHORIZED){
        next()
    }else{
        const token = req.headers['x-access-token']
        if(token){
            jwt.verify(token, SECRET_ENCODING_MESSAGE, (error, decoded) => {
                if(error != null){
                    res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()                
                }
                else{
                    req.user = decoded
                    next()
                }
            })
        }else{
            res.status(HttpStatus.UNAUTHORIZED).json({error:HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)}).send()
        }
    }
}