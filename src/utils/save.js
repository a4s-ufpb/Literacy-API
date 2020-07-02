import {getAbsoluteUri} from '../server.js'
import fs from 'fs'
import fileType from  'file-type'
import crypto from 'crypto'

// const fs = require('fs')
// const fileType = require('file-type')
// const crypto = require('crypto');

const BASE_URL_CONTEXT_IMAGE = '/static/images/'
const BASE_URL_CONTEXT = 'public/images/'

const BASE_URL_AUDIO_CONTEXT = '/static/sounds/'
const BASE_DIR_AUDIO_CONTEXT = 'public/sounds/'

export function saveImage(codeBase64, req){
    if(!codeBase64) return null;
    let buffer = new Buffer(codeBase64, 'base64')
    let imageExtension = fileType(buffer).ext
    let imageName = generateUniqName()
    imageName = imageName + '.' + imageExtension
    fs.writeFileSync(BASE_URL_CONTEXT + imageName, buffer)
    return getAbsoluteUri(req) + BASE_URL_CONTEXT_IMAGE + imageName
}

export function saveAudio(codeBase64, req){
    if(!codeBase64) return null;
    let buffer = new Buffer(codeBase64, 'base64')
    let audioExtension = fileType(buffer).ext
    let audioName = generateUniqName()
    audioName = audioName + '.' + audioExtension
    fs.writeFileSync(BASE_DIR_AUDIO_CONTEXT + audioName, buffer)
    return getAbsoluteUri(req) + BASE_URL_AUDIO_CONTEXT + audioName
}

function generateUniqName(){
    while(true){
        let currentDate = (new Date()).valueOf().toString()
        let random = Math.random().toString()
        let contextName = crypto.createHash('md5')
                        .update(currentDate + random)
                        .digest('hex');
        if(!fs.existsSync(BASE_URL_CONTEXT + contextName)){
            return contextName
        }
    }
}