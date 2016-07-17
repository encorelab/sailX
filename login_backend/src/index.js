import express from 'express'
import { sign } from 'jsonwebtoken'
import jwt from 'express-jwt'
import unless from 'express-unless'
import cors from 'cors'
import fixtures from './fixtures'
import rethinkdb from 'rethinkdbdash'

const r = rethinkdb()
const rr = r.db('encore_login')

const app = express()
app.use(cors())
app.use(express.static('public'));

app.get('/classes', (req, res) => {
    rr.table('classes').then((e) => res.json(e))
})

app.get('/class/:id', (req, res) => {
    rr.table('classes').get(Number(req.params.id)).then((e) => res.json(e))
})

app.get('/class/:id/students', (req, res) => {
    rr.table('students').filter({class: Number(req.params.id)}).then((e) => res.json(e))
})

app.get('/student/:id', (req, res) => {
    rr.table('students').get(Number(req.params.id)).then((e) => res.json(e))
})

app.get('/student/:id/COs', (req, res) => {
   getCOs(Number(req.params.id), undefined, (e) => res.json(e))
})

app.get('/student/:id/COs/:type', (req, res) => {
   getCOs(Number(req.params.id), req.params.type, (e) => res.json(e))
})

// related to jwt experiments
app.get('/sign/:user', (req, res) => {
    res.json({req: req.params, token: sign(req.params.user, 'secret')})
})

// ----------- routes below require valid authentication token ---------------------
app.use(jwt({ secret: 'secret'}))

app.get('/', (req, res) => {
    res.json({params: req.params, user: req.user})
})

// ---------------------------------------------------------------------------------

fixtures(r)
app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
})


const getCOs = (studentid, type, returnfn) => {
    const filter = type ? { type } : {}
    rr.table('students').get(studentid)('groups').
        eqJoin((i) => i, rr.table('groups'))("right")("COs").
        concatMap((i) => i).
        eqJoin((i) => i, rr.table('COs'))('right').
        filter(filter).
        then((e) => { returnfn(e) })
}

