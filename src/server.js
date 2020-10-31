import express from 'express'
import bodyParser from 'body-parser'
import routeContext from './routes/context'
import routeUser from './routes/user'
import routeChallenge from './routes/challenge'
import routeIndex from './routes/index'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(bodyParser.json({limit: "50mb"}))

app.use('/static',express.static('public'))

app.use('/', routeIndex)
app.use('/api/contexts', routeContext)
app.use('/api/users', routeUser)
app.use('/api/challenges', routeChallenge)

app.listen(process.env.LITERACY_PORT || 9000, () => {
    console.log('server listening in port', process.env.LITERACY_PORT || '9000')
})

const DOMAIN_PRODUCTION = "https://app.sisalfa.dcx.ufpb.br/v1"
export let getAbsoluteUri = (req) => {
    // req.protocol + "://" + req.get("host") + "/v1/..."
    if(process.env.PRODUCTION == "true"){
        console.log("entrou no if")
        return DOMAIN_PRODUCTION
    }
    console.log("não entrou no if")
    return req.protocol + "://" + req.get("host")
}