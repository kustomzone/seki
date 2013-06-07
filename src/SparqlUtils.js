var fs = require('fs');
var util = require('util')
var Log = require('log'),
    log = new Log('debug');
var config = require('./config/ConfigDefault').config;

var sparqlTemplates = require('./templates/SparqlTemplates');
var freemarker = require('./templates/freemarker');
var rdf = require('../lib/node-rdf/index');

// replaceSimpleTree(null, first);
// graph1.forEach(function(triple) {
//     console.log(triple);
// });

// var client = new StoreClient();

function SparqlUtils() {
  //  log.debug("StoreClient = "+StoreClient);
    }
    
    // properties and methods
    SparqlUtils.prototype = {

    "createGraph": function(graphURI) {
        var sparql = "CREATE SILENT GRAPH <" + graphURI + ">";
    },
    "turtleToSimpleInsert": function(graphURI, turtle) {
        log.debug("turtleToInsert "+turtle);
        var turtleSplit = this.extractPrefixes(turtle);

        var replaceMap = {
            "graph": graphURI,
            "prefixes": turtleSplit.prefixes,
            "body": turtleSplit.body
        }
        var sparql = freemarker.render(sparqlTemplates.generalInsertTemplate, replaceMap);
        return sparql;
    },
    "turtleToReplace": function(graphURI, resourceURI, turtle) {
        log.debug("turtleToReplace "+turtle);
        var turtleSplit = this.extractPrefixes(turtle);
        
        var replaceMap = {
            "graph": graphURI,
            "uri": resourceURI,
            "prefixes": turtleSplit.prefixes,
            "body": turtleSplit.body
        }
        var sparql = freemarker.render(sparqlTemplates.simpleReplaceTemplate, replaceMap);
        return sparql;
    },
    "resourceToDelete": function(graphURI, resourceURI, turtle) {
        log.debug("resourceToDelete "+turtle);
        var turtleSplit = this.extractPrefixes(turtle);
        
        var replaceMap = {
            "graph": graphURI,
            "uri": resourceURI,
            "prefixes": turtleSplit.prefixes,
            "body": turtleSplit.body
        }
        var sparql = freemarker.render(sparqlTemplates.resourceDeleteTemplate, replaceMap);
        return sparql;
    },

    "extractPrefixes": function(turtle) {
        log.debug("extractPrefixes TURTLE "+turtle);
        var prefixPattern = /(@)(prefix.+)(\.)/gmi;
        var matches;
        var prefixList = [];

        while (matches = prefixPattern.exec(turtle)) {
            prefixList.push(matches[2]);
        }
        var prefixes = prefixList.join("\n");
        var body = turtle.replace(/@prefix.+\./gmi, "");


                log.debug("");
                log.debug("PREFIXES = "+prefixes);
                log.debug("");
                log.debug("BODY = "+body);
                log.debug("");
        return {
            "prefixes": prefixes,
            "body": body
        };
    },

    /*
     * a simple tree is defined as a set of triples with common subject resource
     * 
     * needs error checks?
     */
    "replaceSimpleTree": function(targetGraph, simpleTreeTurtle) {
        var inputGraph = new rdf.IndexedGraph();
        var parser = new rdf.TurtleParser();

        parser.parse(simpleTreeTurtle, null, null, null, inputGraph);

        var tripleArray = inputGraph.toArray();

        var rootResource = tripleArray[0].subject;

        var replaceMap = {

        }
        console.log(rootResource);

    }
}
module.exports = SparqlUtils;
