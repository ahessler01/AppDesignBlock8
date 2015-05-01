var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );

/*
var db = new sqlite.Database( "telluride.sqlite" );
var resp_text = "<!DOCTYPE html>"+
"<html>" +
"<body>";
db.each("SELECT TIME FROM PERFORMANCE", function (err,row){
  db.each("SELECT NAME FROM STAGES", function (err,row){
    //db.each("SELECT NAME FROM PERFORMERS", function(err, row) {

    console.log( "stage "+row.NAME );
//resp_text +="<tr>"+/*"<td>" + row.NAME + "</td>*//*+"<td>" + row.STAGE + "</td><td>" + row.TIME + "</td></tr>"
//row.NAME;

})
,
 function() {
     console.log( "Complete! " +resp_text );
     resp_text += "</body>" + "</1>";
     res.writeHead( 200 );
     res.end( resp_text );
 } );
*/


function listPerformers( req, res )
{
    var db = new sqlite.Database( "telluride.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>";
    db.each("SELECT TIME FROM PERFORMANCE", function (err,row){

      resp_text+="<tr><td>" + row.TIME + "</td></tr>"

      db.each("SELECT NAME FROM STAGES", function (err,row){

        resp_text+="<tr><td>" + row.STAGE + "</td></tr>"

        db.each("SELECT NAME FROM PERFORMERS", function (err,row) {

          resp_text+="<tr><td>" + row.NAME + "</td></tr>"


        resp_text +="<tr><td>" + row.NAME + "</td><td>" + row.STAGE + "</td><td>" + row.TIME + "</td></tr>"
        console.log( "stage "+row.NAME + " " + "time" + row.TIME );

        })
,
	   function() {
	       console.log( "Complete! " +resp_text );
	       resp_text += "</body>" + "</1>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   };
} )
} );
}

function serveFile( filename, req, res )
{
    try
    {
    	var contents = fs.readFileSync( filename ).toString();
    }
    catch( e )
    {
    	console.log(
    	    "Error: Something bad happened trying to open "+filename );
    	process.exit( 1 );
    	/* Return a 404 page */
    }

    res.writeHead( 200 );
    res.end( contents );
}

function serverFn( req, res )
{
    var filename = req.url.substring( 1, req.url.length );
    if( filename == "" )
    {
        filename = "./index.html";
    }
    if( filename == "list_performers" )
    {
        listPerformers( req, res );
    }
    else if (filename == "favicon.ico")
    {
      res.writeHead(404)
      res.end("")
    }
    else
    {
        serveFile( filename, req, res );
    }
}

var server = http.createServer( serverFn );

server.listen( 8080 );
