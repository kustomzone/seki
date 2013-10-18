var http = require('http');
var qs = require('querystring'); // POST parameters parser
var sparqlTemplates = require('../templates/SparqlTemplates');
var StoreClient = require("../StoreClient");
// var templater = require('./templates/Templater');
var freemarker = require('../templates/freemarker');
var Constants = require('../config/Constants');
var config = require('../config/ConfigDefault').config;
var Log = require('log'), log = new Log(config.logLevel);

// Constructor
function PutHandler() {
}

// properties and methods
PutHandler.prototype = {
    
    "handle" : function(sekiRequest, sekiResponse) {
        
        log.debug("PutHandler.handle");
        
        // check media type of data..?
        
        var body = '';
        
        // request body may come in chunks, join them together
        sekiRequest.on('data', function(chunk) {
            body += chunk;
        });
        
        // now received body of request
        sekiRequest.on('end',
                       function() {
                           log.debug("raw body \n" + body);
                           body = body.replace(/%0D/g,""); // remove carriage returns 
                           body = body.replace(/%0A/g,""); // remove newlines - Fuseki complains otherwise
                           
                          /*
                           var replaceMap = qs.parse(post_body);
                           
                           log.debug("parsed post_body \n" + JSON.stringify(post_body));
                           log.debug("replaceMap \n" + JSON.stringify(replaceMap));
                           
                           replaceMap["content"] = replaceMap["content"].replace(/\"/g, "\\\"");
                           
                           replaceMap["date"] = new Date().toJSON();
                           var resourceType = replaceMap["type"];
                           
                           // URI wasn't specified so generate one (if a target
                           // URI has been specified
                           // use that as a seed)
                           if (!replaceMap["uri"] || replaceMap["uri"] == "") {
                               replaceMap["uri"] = Utils
                               .mintURI(replaceMap["target"]);
                           }
                           
                           // graph wasn't specified so create named graph
                           if (!replaceMap["graph"]
                               || replaceMap["graph"] == "") {
                               replaceMap["graph"] = replaceMap["uri"];
                               }
                               replaceMap["type"] = Constants.rdfsTypes[resourceType];
                           
                           log.debug("resource type \n" + resourceType);
                           log.debug("type \n"
                           + Constants.rdfsTypes[resourceType]);
                           
                           // verbosity("ReplaceMap =
                           // "+JSON.stringify(replaceMap));
                           
                           var sparql;
                           if (replaceMap.target) { // if a target URI is specified, it's an annotation
                               sparql = freemarker.render(sparqlTemplates.insertAnnotationTemplate, replaceMap);
                           } else {
                               sparql = freemarker.render(sparqlTemplates.insertTemplate, replaceMap);
                           }
                           
                           var options = {
                               "path" : config.client["updateEndpoint"],
                               "method" : "POST"
                           };
                           //     "send" : function(options, sparql, sekiResonse, redirectURI, callback) 
                           var redirectURI = replaceMap.uri.substring(config.uriBase.length);                           
                           
                           var callback = function(queryResponse) {
                               log.debug("callback called");
                               var headers = {
                                   "Location" : redirectURI,
                                   "Content-type" : "text/html; charset=utf-8"
                               };
                               // do the redirect
                               sekiResponse.writeHead(303, headers);
                               sekiResponse.end();
                           }
                           //  callback("boo");
                           //  log.debug("CALLBACK = "+callback);
                           
                           var client = new StoreClient();
                           log.debug("PostHandler calling StoreClient with options "+JSON.stringify(options));
                           client.send(options, sparql, callback);
        */
                       });
                               
    }
}


module.exports = PutHandler;