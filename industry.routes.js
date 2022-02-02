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

//Get Industry Data for a Single Year
//industryRoutes.route('/industry/:options').get(async(req, res) => {
//    let options = req.params.options;
//    bls.fetch(options).then(function(response) {
//        industryData = JSON.stringify(response);
//        industryData = JSON.stringify(JSON.parse(industryData).Results.series[0].data[0]);
//        console.log(industryData);
//    });
//    res.status(201);
//});

industryRoutes.route('/industry/:seriesId/:startyear/:endyear').get(async (req, res) => {
    let options = {
        'seriesid': [req.params.seriesId],
        'startyear': req.params.startyear,  
        'endyear': req.params.endyear,
    };
    console.log(options);
    bls.fetch(options).then(function(response) {
        industryData = JSON.stringify(response);
        industryData = JSON.stringify(JSON.parse(industryData).Results.series[0].data[0]);
        console.log(industryData);
    });
    res.json('{done}');
});

module.exports = industryRoutes;