const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const sendJustMeta = require('./middleware/sendJustMeta');

const port = process.env.PORT || 3333;

dotenv.config();

app.use(express.json());
app.set('json spaces', 2);

app.use(cors());

app.use(sendJustMeta);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get(/^(?!\/api)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/screenings', require('./routes/screenings'));
app.use('/api/serials', require('./routes/serials'));
app.use('/api/users', require('./routes/users'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/quotes', require('./routes/quotes'));

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to db')
);
mongoose.set('useFindAndModify', false);

app.listen(port, () => console.log('Server ready on port ' + port));
