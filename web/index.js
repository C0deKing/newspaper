const port = process.env.PORT || 3000;
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');


require('./middleware')(app)
app.use(bodyParser.json());
app.use(fileUpload());

app.use('/public', express.static('public'))
app.use('/login', require('./routes/login'))
app.use('/articles', require('./routes/articles'))
app.use('/published', require('./routes/published'))
app.use('/user', require('./routes/user'))
app.use('/admin', require('./routes/admin'))
app.use('/upload', require('./routes/upload'))
app.post('/ping', (req, res) => {
	res.send("pong")
})

app.get('*', (req, res) =>  res.sendFile(__dirname + '/views/index.html'))


app.listen(port, () => console.log(`Example app listening at Port ${port}`))

