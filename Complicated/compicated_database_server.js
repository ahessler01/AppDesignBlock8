function getValue( res )
{
    // console.log( "getValue" );
    res.writeHead( 200 );
    res.end( JSON.stringify( value ) );
}

function pullFromDatabase() {
  var db = new sqlite.Database( "School_Manager.sqlite" );
  var results = [ ]
  var result = { }
  result.url =
  result.nickname=
  results.push(row)
  res.end()
}

function doTheServer( req, res )
{
    // console.log( "doTheServer " + req.url );
    if( req.url == "/empty_table" )
    {
        dawnOfTime( );
    }
    else if( req.url == "/get_data" )
    {
        valueReturned( false, res );
    }
    else if( req.url == "/get_value" )
    {
        getValue( res );
    }
    else if( req.url == "/lower_higher_client.js" )
    {
        giveBackFile( "lower_higher_client.js", res )
    }
    else
    {
        giveBackFile( "lower_higher.html", res )
    }
}

var server = http.createServer( doTheServer );
server.listen( 8080 );
