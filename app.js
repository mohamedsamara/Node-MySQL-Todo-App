const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const { getHomePage } = require('./routes/index');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});

// routes for the app
app.get('/', getHomePage);

// Route Files
let todos = require('./routes/todo');
app.use('/todos', todos);
