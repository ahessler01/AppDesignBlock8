//var fs = require( 'fs' );
var http = require('http');
var fs   = require('fs');

if( process.argv.length < 3 )
{
    console.log( "Error: You must import a file" );
    process.exit( 1 );
}

var fn1 = process.argv[ 2 ];
//var re = /^(^/,| ^\n)/

try
{
    var lines1 = fs.readFileSync( fn1 ).toString().split( "\n" );
}
  catch( e )
  {
      console.log(
          "Error: Something bad happened trying to open "+
              fn1 );
      process.exit( 1 );
  }

var url_list = []
var name_list = []

//for each line store in different array index


for (var i = 0; i < lines1.length; i++)
{
    var name
    var url

    var determiner = (i%2)
    //console.log("buzz" + determiner)
    if (determiner==0)
    {
      name = lines1[i]
      name_list.push(name)
      //push contents of array index into fill_first arrayToDataTable()?
    }

    else
    {
      url = lines1[i]
      url_list.push(url)
      //push contents of array index into fill_second
    }

  }
  var string_text = name_list;//.toString()
  var string_text2 = url_list;//.toString()
 console.log("foo" + string_text.length + " bar" + string_text2.length)

 var download = function( url, dest, cb ) {
     console.log( "Download!  " + dest );
     var file = fs.createWriteStream( dest );
     // No synchronous style!!!
     // var data = http.getSync( url );

     var request = http.get( url, function( response ) {
         console.log( "get callback!" );
         response.pipe( file );
         file.on( 'finish', function() {
             console.log( "finish callback!" );
             // close() is async, call cb after close completes.
             file.close( cb );
         });
     });
     console.log( "called http.get" );
     request.on( 'error', function( err ) { // Handle errors
         console.log( "error callback!" );
         // Delete the file async. (But we don't check the result)
         fs.unlink(dest);
         if( cb )
             cb( err.message );
     });
     console.log( "called request.on" );
 };

 for (var i=0; i<string_text.length; i++)
 {
   try {
     download( string_text[i], string_text2[i],
               function() { console.log( "main cb" ) } );
   }
   catch(c) {
     console.log("Some error")
   }


   console.log( "Done?" );
 }
