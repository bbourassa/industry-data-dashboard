let express = require('express'),
  path = require('path'),
  cors = require('cors'),
  bodyParser = require('body-parser')

// TODO: UPDATE tripRoute
 const industryRoutes = require('./industry.routes');

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://industry-data-dashboard-70fab67995be.herokuapp.com');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    next();
}


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

app.use(allowCrossDomain);

// Static directory path
app.use(express.static(path.join(__dirname, 'dist/industry-data-dashboard')));


// API root
app.use('/api', industryRoutes);

app.listen(process.env.PORT || 8000, () => {
//  console.log('Listening on port ' + port)
})

// Base Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/industry-data-dashboard'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/industry-data-dashboard'));
});

app.get('/homepage', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/industry-data-dashboard/index.html'))
});

app.get('/timeline', (req, res) => {
    res.sendFile(path.resolve(__dirname,'dist/industry-data-dashboard/index.html'));
});

app.get('/overview', (req, res) => {
    res.sendFile(path.resolve(__dirname,'dist/industry-data-dashboard/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});