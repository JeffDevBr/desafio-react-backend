import express from 'express'
import cors from 'cors'
import crypto from 'crypto'

const app = express()
app.use(express.json())
app.use(cors())

const orderList = []

const checkUserId = (req, res, next) => {
    const { id } = req.params
    const index = orderList.findIndex(user => user.id === id)
    if (index < 0) {
        return res.status(404).json({ messclient: "user not found" })
    }
    req.userIndex = index
    req.userId = id
    next()
}

app.get('/order', (req, res) => {
    res.status(200).json(orderList)
})

app.post('/order', (req, res) => {
    const {order, client} = req.body
    const id = crypto.randomUUID()
    orderList.push({id, order, client})
    res.status(201).json(orderList)
})

app.delete('/order/:id', checkUserId, (req, res) => {
    const index = req.userIndex
    orderList.splice(index, 1)
    res.status(204).json(orderList)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})