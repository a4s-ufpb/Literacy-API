import HttpStatus from 'http-status-codes'
import {Context} from '../models/context'
import {User} from '../models/user'
import { saveImage, saveAudio } from '../utils/save'

export const addContext = (req, res) => {
    const image = saveImage(req.body.image, req)
    const name = req.body.name
    const video = req.body.video
    var sound = "";

    if(req.body.sound_base64){
        sound = saveAudio(req.body.sound_base64, req)
    }else{
        sound = req.body.sound
    }

    var data = {
                name: name, 
                sound: sound, 
                video: video,
                image: image,
                authorId: req.user.id
                }
    Context.create(data).then((context) => {
        res.status(HttpStatus.CREATED).json(context).send()
    }).catch((error) => {
        console.log(error)
        res.status(HttpStatus.BAD_REQUEST)
            .json(responseErroCatch(HttpStatus.BAD_REQUEST))
            .send()
    })
}

export const updateContext = (req, res) => {
    const id = req.params.id
    Context.findById(id).then((context) => {
        if(context){
            const image = saveImage(req.body.image, req)
            const name = req.body.name
            const video = req.body.video
            var sound = "";

            if(req.body.sound_base64){
                sound = saveAudio(req.body.sound_base64, req)
            }else{
                sound = req.body.sound
            }

            const data = {
                name: name, 
                sound: sound, 
                video: video, 
                image:image
            }
            
            context.update(data).then(() => {
                res.status(HttpStatus.OK).json(context).send()
            }).catch((error) => {
                res.status(HttpStatus.BAD_REQUEST)
                    .json(responseErroCatch(HttpStatus.BAD_REQUEST))
                    .send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundContext()).send()
        }
    })
}

export const getContexts = (req, res) => {
    Context.findAll(
        {include: {model: User, attributes: {exclude: ATTRIBUTES_EXCLUDE_USER}},
        attributes: {exclude: ['authorId']}}
    ).then((contexts) => {
        res.status(HttpStatus.OK).json(contexts).send()
    })
}

export const getContext = (req, res) => {
    const id = req.params.id
    Context.findById(id, 
        {include: {model: User, attributes: {exclude: ATTRIBUTES_EXCLUDE_USER}},
        attributes: {exclude: ['authorId']}}
            ).then((context) => {
        if(context){
            res.status(HttpStatus.OK).json(context).send()
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundContext()).send()
        }
    })
}

export const deleteContext = (req, res) => {
    const id = req.params.id
    Context.findById(id).then((context) => {
        if(context){
            context.destroy().then(() => {
                res.status(HttpStatus.OK).json(context).send()
            })
        }else{
            res.status(HttpStatus.NOT_FOUND).json(responseNotFoundContext()).send()
        }
    })
}

export const getUserContext =(req, res) => {
    
}

function responseErroCatch(code){
    let erro = {error: HttpStatus.getStatusText(code)}
    return erro
}

function responseNotFoundContext(){
    return {error: CONTEXT_NOT_FOUND}
}

const CONTEXT_NOT_FOUND = "contexto not found"
const ATTRIBUTES_EXCLUDE_USER = ['password', 'createdAt', 'updatedAt']



