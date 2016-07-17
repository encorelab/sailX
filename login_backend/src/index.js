import express from 'express'
import { sign } from 'jsonwebtoken'
import jwt from 'express-jwt'
import unless from 'express-unless'
import cors from 'cors'

const app = express()

app.use(cors())

app.get('/sign/:user', (req, res) => {
    res.json({req: req.params, token: sign(req.params.user, 'secret')})
})

// ----------- routes below require valid authentication token ---------------------
app.use(jwt({ secret: 'secret'}))

app.get('/', (req, res) => {
    res.json({params: req.params, user: req.user})
})


app.use(express.static('public'));
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})
