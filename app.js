const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});

// homepage route
app.get('/', (req, res) => res.render('home'));
