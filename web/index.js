const port = 3000;
const express = require('express')
const app = express()
const bodyParser = require('body-parser');


app.use(bodyParser.json());
require('./middleware')(app)

app.use('/public', express.static('public'))
app.use('/login', require('./routes/login'))
app.use('/articles', require('./routes/articles'))
app.use('/published', require('./routes/published'))
app.use('/user', require('./routes/user'))

app.post('/ping', (req, res) => {
	res.send("pong")
})

app.get('*', (req, res) =>  res.sendFile(__dirname + '/views/index.html'))


app.listen(port, () => console.log(`Example app listening at Port ${port}`))

