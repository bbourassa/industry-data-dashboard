process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

const express = require('express');
const app = express();

var Bls2 = require('bls2');

var pg = require('pg');
pg.defaults.ssl = true;

const API_KEY = '4556e10026ca4e55b304c7732fcc9e23';
const industryRoutes = express.Router();

let bls = new Bls2(API_KEY);

let options = {
    'seriesid': ['SMU25000000600000002'],
    'startyear': '2008',  
    'endyear': '2008',
};

industryRoutes.route('/industry/:seriesID/:startYear/:endYear').get(async (req, res) => {
    let options = {
        'seriesid': [req.params.seriesID],
        'startyear': req.params.startYear,  
        'endyear': req.params.endYear,
        //"latest": "true",
    };

    console.log(options);
    bls.fetch(options).then(function(response) {
        industryData = JSON.stringify(response);
        res.json(JSON.stringify(JSON.parse(industryData).Results.series[0].data));
        //industryData = JSON.stringify(JSON.parse(industryData).Results.series[0].data[13]);
        console.log(JSON.stringify(JSON.parse(industryData).Results.series[0].data[0]));
        //console.log(JSON.stringify(JSON.parse(industryData).Results.series[0].data[13]));
        //console.log(JSON.stringify(JSON.parse(industryData).Results.series[0].data[26]));
    });
    //res.json('{done}');
});

module.exports = industryRoutes;