#!/usr/bin/env node

// Requires installing 'async'
var path=require('path'),fs=require('fs'),
child_process=require('child_process'),
util = require('util'), async=require('async'),
yuidocjs = require('yuidocjs'), exists=fs.exists || path.exists;

   

// Configuration for building docs: options and project metadata
// Update version of Mojito
var options = {
  "paths": [ "mojito_src/source/lib" ],
  "exclude": "tests, node_modules,archetypes,artifacts, libs,management, middleware,view-engines",
  "outdir": "../api"
};
options.project = {
  "name": "Mojito API",
  "description": "This is the API documentation for the Yahoo! Mojito Presentation Framework.",
  "url": "http://developer.yahoo.com/cocktails/mojito/",
  "logo": "assets/img/mojito-logo-white-bkg.png",   
  "linkNatives": "true",
  "attributesEmit": "true"  
};
async.series([
  function rm_docs(callback){
    var doc_dir="./docs";
    var rm_docs = "rm -rf " + doc_dir;
    exists(doc_dir,function(ex){
      if(ex){
        child_process.exec(rm_docs, function(error,stdout,stderr){
          if(error){
            callback(error,null);
          } else {
            callback(null,"Successfully removed old docs.");
          }
        });
      }else {
         callback(null,null);
      }
    });
  }, 
  function rm_mojito(callback){
    var mojito_dir = "./mojito_src";
    var rm_mojito = "rm -rf " + mojito_dir;
    exists(mojito_dir,function(ex){ 
      if(ex){
        child_process.exec(rm_mojito,function(error,stdout,stderr){
          if(error){
            callback(error,null);
          } else {
            callback(null,"Successfully removed old Mojito source.");
          }
        });
      } else {
         callback(null, "The Mojito source directory does not exist.");
      }
    });
  },
  function get_mojito(callback) {
    var clone_mojito = "git clone https://github.com/yahoo/mojito.git mojito_src";
    child_process.exec(clone_mojito, function(error,stdout,stderr){
     if(error){
       callback(error,null);
     } else {
       callback(null,"Successfully retrieved Mojito from GitHub.");
     }
   });
  },
  function get_mojito_version(callback){
    var get_version = "npm info mojito version";
    child_process.exec(get_version,function(error,stdout,stderr){
      if(stdout){
        var version = (stdout[stdout.length-1]=="\n") ? stdout.substring(0,stdout.length-2) : stdout;
        options.project.version = version;
        options.version = version;
        callback(null,"Changed version of Mojito to latest (" + version + ").");
      }else{
        console.log(error);
        callback("Unable to change version", null);
      }
    }); 
  },  
  // Compile docs, copy logo image, inline replace text, and commit to SVN
  function build_docs(callback){
    // Create data file and create builder object
    var json = (new yuidocjs.YUIDoc(options)).run();
    var builder = new yuidocjs.DocBuilder(options, json);
    builder.compile(function(error,result) {
     if(error){
          callback(error,null);
        } else{
          callback(null,"Successfully built_docs with YUIDoc.");
        }
     });
  },
  function replace_title(callback){
   
    // Change text from Docs API to Mojito API docs and add/commit files
    var title_replace = "sed -i -e 's/API Docs/Mojito API Docs/g' ./docs/index.html";
    child_process.exec(title_replace, function(error,stdout,stderr){
      if(error){
        callback(error,null);
      } else{
        callback(null,"Replaced title successfully.");
      }
    });   
  },
  function rm_mojito(callback){
    var rm_mj = "rm -rf ./mojito_src";
    child_process.exec(rm_mj, function(error,stdout,stderr){
       if(error){
         callback(error,null);
       } else {
         callback(null,"Successfully removed Mojito source.");
       }
    });   
  }],
  function(err,results){
    if(err){
      console.log("Error(s): ");
      for(var i in err) {
        console.log(err[i]);
      }
    } else{
      console.log("Results: ");
      for(var i in results) {
        console.log(results[i]);
      }
    }
  });
  
