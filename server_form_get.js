var http = require( "http" );
var fs = require( 'fs' );

function serverFn( req, res )
{
    for( field in req )
    {
        console.log( "R."+field+" = ..."/*+req[ field ]*/ );
    }
    for( field in req.headers )
    {
        console.log( "R.header."+field+" = ..."/*+req[ field ]*/ );
    }
    console.log( "url: "+req.url.toString() );

    if( req.url.substring( 0, 16 ) == "/submit_the_form" )
    {
        var x = req.url.split("?")
        var form_values = x[1].split("&")

        console.log(form_values.toString())
        fs.appendFile('information.txt', form_values, function (err) {
          if (err) throw err;
          console.log('The "data to append" was appended to file!');
        });

    }


    res.writeHead( 200 );
    var h = "<!DOCTYPE html>"+
        "<html>"+
        "<body>"+
        "<form action='submit_the_form' method='get'>"+
        "<input name='note' type='text' value='write something'>"+
        "<input name='email' type='email' value='example@yahoo.com'>" +
        "<input name='password' type='password' value='password'>"+
        "<input type='submit'>"+



        "</form>"+
        "</body>"+
        "</html>";
    res.end( h );
}



var server = http.createServer( serverFn );

server.listen( 8080 );
