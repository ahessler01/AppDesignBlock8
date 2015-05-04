var fs = require( "fs" );
var http = require( "http" );
var sqlite = require( "sqlite3" );

function listClasses( req, res )
{
    var db = new sqlite.Database( "School_Manager.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>" +
  "<table>" +
  "<tbody>" +
  "<th> Department </th>" +
  "<th> Class Name </th>" +
  "<th> Class Id </th>";



    db.each( "SELECT * FROM CLASSES", function( err, row ) {
        console.log( row );
        console.log(err)

	resp_text += "<tr><td>" + row.Department + "</td><td>" + row.Classname + "</td><td>" + row.Id + "</td></tr>" ;
    });

    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listStudents( req, res )
{
    var db = new sqlite.Database( "School_Manager.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>" +
  "<table>" +
  "<tbody>" +
  "<th> Name </th>" +
  "<th> Year </th>" +
  "<th> Id </th>";



    db.each( "SELECT * FROM STUDENTS", function( err, row ) {
        console.log( row );
        console.log(err)

	resp_text += "<tr><td>" + row.Name + "</td><td>" + row.Year + "</td><td>" + row.Id + "</td></tr>" ;
    });

    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listTeachers( req, res )
{
    var db = new sqlite.Database( "School_Manager.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>" +
  "<table>" +
  "<tbody>" +
  "<th> Name </th>" +
  "<th> Office </th>" +
  "<th> Id </th>";



    db.each( "SELECT * FROM TEACHERS", function( err, row ) {
        console.log( row );
        console.log(err)

	resp_text += "<tr><td>" + row.Name + "</td><td>" + row.Office + "</td><td>" + row.Id + "</td></tr>" ;
    });

    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listTeachingAssignments( req, res )
{
    var db = new sqlite.Database( "School_Manager.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>" +
  "<table>" +
  "<tbody>" +
  "<th> Class ID </th>" +
  "<th> Teacher ID </th>" ;

    db.each( "SELECT * FROM TEACHINGASSIGNMENTS", function( err, row ) {
        console.log( row );
        console.log(err)

	resp_text += "<tr><td>" + row.ClassId + "</td><td>" + row.TeacherId + "</td></tr>" ;
    });

    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function listEnrollments( req, res )
{
    var db = new sqlite.Database( "School_Manager.sqlite" );
    var resp_text = "<!DOCTYPE html>"+
	"<html>" +
	"<body>" +
  "<table>" +
  "<tbody>" +
  "<th> Class Name </th>" +
  "<th> Student Name </th>" ;

    db.each( "SELECT * FROM ENROLLMENTS " +
    "JOIN CLASSES ON CLASSES.ClassId = ENROLLMENTS.ClassId " +
    "JOIN STUDENTS ON STUDENTS.StudentId = ENROLLMENTS.StudentId", function( err, row ) {
        console.log( row );
        console.log(err)

	resp_text += "<tr><td>" + row.Classname + "</td><td>" + row.Name + "</td></tr>" ;
    });

    db.close(
	   function() {
	       console.log( "Complete! "+resp_text );
	       resp_text += "</tbody>" + "</table>" + "</body>" + "</html>";
	       res.writeHead( 200 );
	       res.end( resp_text );
	   } );
}

function formInputParser( url )
{
    inputs = {}
    var form_text = url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    for( var i = 0; i < form_inputs.length; i++ ) {
        var inp = form_inputs[i].split( "=" );
        inputs[ inp[0] ] = inp[1];
    }
    console.log( inputs );
    return inputs;
}

function addStudents( req, res )
{
    var db = new sqlite.Database( "School_Manager.sqlite" );
    console.log( req.url );
    //formInputParser( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var name_input = form_inputs[0].split( "=" );
    var year_input = form_inputs[1].split( "=" );
    var id_input = form_inputs[2].split( "=" );
    //var Name = null, Year = null, Id = null;
    if( name_input == null || year_input == null || id_input == null )
    {
        res.writeHead( 200 );
        res.end( "ERROR" );
        return;
    }
    // perf, stage numbers that exist in DB
    var student_exists = false;
  /*  db.all( "SELECT COUNT(Name) FROM STUDENTS WHERE ID = "+Name,
        function( err, rows ) {
            name_exists = rows[0]['COUNT(Name)'] == 1;
        });*/
    if( !student_exists )
    {
        // ....
    }
     var sql_cmd2 = "INSERT INTO STUDENTS ('Name', 'Year', 'StudentId') VALUES ('"+
        name_input[1]+"', '"+
         year_input[1]+"', '"+
         id_input[1]+"')";
     db.run( sql_cmd2 );
    db.close();
    res.writeHead( 200 );
    res.end( "<html><body>Added Student!!!</body></html>" );
}

function addEnrollments( req, res )
{
    var db = new sqlite.Database( "School_Manager.sqlite" );
    console.log( req.url );
    formInputParser( req.url );
    var form_text = req.url.split( "?" )[1];
    var form_inputs = form_text.split( "&" );
    var class_input = form_inputs[0].split( "=" );
    var student_input = form_inputs[1].split( "=" );
    //var Class = null, Student = null;
  /*  for( var i = 0; i < form_inputs.length; i++ ) {
        var inp = form_inputs[i].split( "=" );
        if( inp[0] == 'class' ) {
            Class = inp[1];
        }
        else if( inp[0] == 'student' ) {
            Student = inp[1];
        }
    }*/
    if( class_input == null || student_input == null)
    {
        res.writeHead( 200 );
        res.end( "ERROR" );
        return;
    }
    // perf, stage numbers that exist in DB
    var enrollment_exists = false;
  /*  db.all( "SELECT COUNT(ClassId) FROM ENROLLMENTS WHERE ID = "+Class,
        function( err, rows ) {
            name_exists = rows[0]['COUNT(ClassId)'] == 1;
        });*/
    if( !enrollment_exists )
    {
        // ....
    }
    var sql_cmd = "INSERT INTO ENROLLMENTS ('ClassId', 'StudentId') VALUES ('"+
        class_input[1]+"','"+
        student_input[1] + "')"
    console.log(sql_cmd)
    db.run( sql_cmd );
    db.close();
    res.writeHead( 200 );
    res.end( "<html><body>Added Enrollment!!!</body></html>" );
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
        res.writeHead( 404 );
        res.end( "" );
        return;
    }

    res.writeHead( 200 );
    res.end( contents );
}

function serverFn( req, res )
{
    var filename = req.url.substring( 1, req.url.length );
    if( filename == "" )
    {
        filename = "./school_index.html";
    }
    if( filename.substring( 0, 12 ) == "list_classes" )
    {
        listClasses( req, res );
    }
    else if( filename.substring( 0, 13 ) == "list_students" )
    {
        listStudents( req, res );
    }
    else if( filename.substring( 0, 13 ) == "list_teachers" )
    {
        listTeachers( req, res );
    }
    else if( filename.substring( 0, 24 ) == "list_teachingassignments" )
    {
        listTeachingAssignments( req, res );
    }
    else if( filename.substring( 0, 16 ) == "list_enrollments" )
    {
        listEnrollments( req, res );
    }
    else if( filename.substring( 0, 12 ) == "add_students" )
    {
        addStudents( req, res );
    }
    else if( filename.substring( 0, 15 ) == "add_enrollments" )
    {
        addEnrollments( req, res );
    }
    else
    {
        serveFile( filename, req, res );
    }
}

var server = http.createServer( serverFn );

server.listen( 7099 );
