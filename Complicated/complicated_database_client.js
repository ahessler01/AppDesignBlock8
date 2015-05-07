var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );

function dawnOfTime()
{
      //window.setInterval( pollValue, 10 );
      //some blank table
      var data_req = new XMLHttpRequest();
      data_req.onload = valueReturned;
      data_req.open( "get", "get_data" );
      data_req.send();
}


function valueReturned()
{
    var table_elem =
        document.getElementById( "fillin_table" );
    var data = JSON.parse( this.responseText );
    for(var i = 0; i < data.length; i++){
    var row = data[i]
    }

}

function fillTable( req, res )
{
  var click_sender = new XMLHttpRequest();
  click_sender.open( "get", "empty_table" );
  click_sender.send();
    var table_elem =
        document.getElementById( "fillin_table" );
    var val = parseInt( slider_elem.value );
    var min = parseInt( slider_elem.min );
    var max = parseInt( slider_elem.max );
    if( up_not_down && ( val < max ) )
    {
        var click_sender = new XMLHttpRequest();
        click_sender.open( "get", "go_up" );
        click_sender.send();
    }
    else if( !up_not_down && ( val > min ) )
    {
        var click_sender = new XMLHttpRequest();
        click_sender.open( "get", "go_down" );
        click_sender.send();
    }
}
/*
function listDatabase( req, res )
{
    var db = new sqlite.Database( "Complicated_Link_Database.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>" +
  "<table>" +
  "<tbody>" +
  "<th> URL </th>" +
  "<th> Nickname </th>" +
  "<th> Delete? </th>";

  db.each( "SELECT * FROM Simple_Table", function( err, row ) {

    resp_text += "<tr><td>" + row.Link_Address + "</td><td>" + row.Nickname + "</td></tr>" ;
      });

      db.close(
  	   function() {
  	       console.log( "Complete! "+resp_text );
  	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
  	       res.writeHead( 200 );
  	       res.end( resp_text );

    }

  }*/
