/*
 * Utilities for client access to remote Seki
 *
 * under /graphs/
 * entries are each a named graph
 * 
 * 
 * Create is HTTP POST to /graphs
 * Update is HTTP PUT to /graphs/{name}
 *
 * Create, Read, Update for different media types
 *
 * (Delete handled by HTTP DELETE method)
 *
 */
var fs = require('fs');
var http = require('http');
var config = require('../config/ConfigDefault').config;

var SparqlUtils = require('../core/SparqlUtils');
var freemarker = require('../templates/freemarker');

var Nog = require('../lib/nog/nog'),
    log = new Nog(config.logLevel);
var qs = require("querystring");

// IS VERY VERY SIMILAR TO Page.js!!!

var GenericClient = require("./GenericClient");
var client = new GenericClient();

var queryPath = '/store' + config.client['queryEndpoint'];
var auth = new Buffer("danja:sasha").toString('base64');

function clone(map) {
    return JSON.parse(JSON.stringify(map));
}

function Graph() {}

Graph.prototype = {
    "options": {
        hostname: config.server['host'],
        port: config.server['port'],
        headers: {
            'Authorization': 'Basic ' + auth
        }
    },

    // All formats *****************************************************************************    
    "delete": function(path, callback) {
        // log.debug("Graph.delete");
        var options = clone(this.options);
        options.method = 'DELETE';
        options["path"] = path;
        client.call(options, '', callback);
    },

    // Turtle *****************************************************************************    
    "fileCreateTurtle": function(path, filename, callback) {
        this.createTurtle(path, fs.readFileSync(filename, 'utf8'), callback);
    },

    "createTurtle": function(path, turtle, callback) {
        /*
        var turtleSplit = SparqlUtils.extractPrefixes(turtle);

        var replaceMap = {
            "prefixes" : turtleSplit.prefixes,
            "body": turtleSplit.body
        };
        
        var template = "${prefixes} \
            INSERT DATA { GRAPH <${graph}>{ ${body} }}";
        
        var sparql = freemarker.render(template, replaceMap);
        */

        var options = clone(this.options);
        options.method = 'POST';
        options.headers["Content-Type"] = "text/turtle";
        options["path"] = path;
      //  log.debug("PATH in createTurtle = "+path);
        client.call(options, turtle, callback);
    },

    "fileUpdateTurtle": function(path, filename, callback) {
        this.updateTurtle(path, fs.readFileSync(filename, 'utf8'), callback);
    },

    "updateTurtle": function(path, turtle, callback) {
     //   log.debug("PUTTING "+turtle);
        var options = clone(this.options);
    
        options.method = 'PUT';
        options.headers["Content-Type"] = "text/turtle";
        options["path"] = path;
    //    log.debug("PATH "+path);
      //  log.debug("OPTIONS "+JSON.stringify(options, null, 4));
        client.call(options, turtle, callback);
    },

    "readTurtle": function(path, callback) {
       //    log.debug("Graph.readTurtle");
        var options = clone(this.options);
    
        options.method = 'GET';
        options.headers["Accept"] = "text/turtle";
        options["path"] = path;
     //    log.debug("TEST OPTIONS = "+JSON.stringify(options));
        client.call(options, '', callback);
    },

    // JSON *****************************************************************************      
    "fileCreateJSON": function(path, filename, callback) {
        this.createJSON(path, fs.readFileSync(filename, 'utf8'), callback);
    },

    "createJSON": function(path, json, callback) {
        var options = clone(this.options);
        options.method = 'POST';
        options.headers["Content-Type"] = "application/json";
        options["path"] = path;
        log.debug("JSON = "+JSON.stringify(json, null, 4));
        client.call(options, json, callback);
    },

    "fileReadJSON": function(path, filename, callback) { // why is file needed??
        this.readJSON(path, fs.readFileSync(filename, 'utf8'), callback);
    },

    "readJSON": function(path, callback) {
        var options = clone(this.options);
        options.method = 'GET';
        options.headers["Content-Type"] = "application/json";
        options["path"] = path;
        client.call(options, '', callback);
    },

    "fileUpdateJSON": function(path, filename, callback) {
        this.updateJSON(path, fs.readFileSync(filename, 'utf8'), callback);
    },

    "updateJSON": function(path, json, callback) {
        var options = clone(this.options);
        options.method = 'PUT';
        options.headers["Content-Type"] = "application/json";
        options["path"] = path;
        client.call(options, json, callback);
    },

    // HTML *****************************************************************************  
    "fileCreateHTML": function(path, filename, callback) {
        this.createHTML(path, fs.readFileSync(filename, 'utf8'), callback);
    },

    "createHTML": function(path, html, callback) {
        var options = clone(this.options);
        options.method = 'PUT';
        options.headers["Content-Type"] = "text/html";
        options["path"] = path;
        client.call(options, html, callback);
    },

    "readHTML": function(path, callback) {
        var options = clone(this.options);
        options.method = 'GET';
        options.headers["Content-Type"] = "text/html";
        options["path"] = path;
        client.call(options, '', callback);
    }
}

module.exports = Graph;
