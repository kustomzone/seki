var config = require('../config/ConfigDefault').config;
var Log = require('log'), log = new Log(config.logLevel);
var testCase  = require('nodeunit').testCase;
var fs = require("fs");

var config = require('../config/ConfigDefault').config;
var Log = require('log'), log = new Log(config.logLevel);

var Page = require("../client-api/Page");
var ProxySparql = require("../client-api/ProxySparql");
var TestHelpers = require("./TestHelpers");
var helpers = new TestHelpers();

var createPath = '/pages';
var path = '/pages/ApiTest';

exports.testDeletePage = function(test){ // just to make sure it's cleared
    var callback = function(status, headers, body) {
        test.equal(status, 204, "checking status");
        test.done();
    }
    var page = new Page();
    page.delete(path, callback);
};


exports.testCreate = function(test){ // changed from create - needs extending
    var callback = function(status, headers, body) {
        test.equal(status, 201, "checking status is 201 :Created");
        test.done();
    }
    var page = new Page();
    page.fileCreateTurtle(createPath, 'data/page.ttl', callback);
};

/*
exports.testUpdate = function(test){ 
    var callback = function(status, headers, body) {
        test.equal(status, 201, "checking status is 201 :Created");
        test.done();
    }
    var page = new Page();
    page.fileUpdateJSON(path, 'data/page.json', callback);
};

exports.testExists = function(test){
    log.debug("Note : is checking HTML GET page");
    var callback = function(status, headers, body) {
        test.equal(status, 200, "checking status is 201 :Created");
        var putTitle = helpers.readJsonTitleFile('data/page.json');
        var gotTitle = helpers.readHtmlTitle(body);
        //  log.debug("title ="+gotTitle);
        test.equal(putTitle, gotTitle, "title should match");
        test.done();
    }
    var page = new Page();
    page.readHTML(path, callback);
};
*/