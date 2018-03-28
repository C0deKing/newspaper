const port = process.env.PORT || 3000;
const express = require('express')
const app = express()


app.use('/public', express.static('public'))


app.get('*', (req, res) =>  res.sendFile(__dirname + '/views/index.html'))


app.listen(port, () => console.log(`Example app listening at Port ${port}`))