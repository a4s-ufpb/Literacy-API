import HttpStatus from 'http-status-codes'


export const getWelcome = (req, res) => {
    return res.status(HttpStatus.OK).send('Welcome to Literacy-API! | VERSION: ' + process.env.LITERACY_VERSION)
}