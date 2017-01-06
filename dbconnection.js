var mysql       = require('mysql'),
    connection,
    query;

query = `
INSERT
  INTO AI_INFO 
    (COMMAND_STRING, SCREEN_IMAGE_BASE64)
    VALUES
    ("teste", "teste");`

connection = connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'snes',
  password : '123456',
  database : 'SnesDB'
});
 
connection.connect();
 
connection.query(query, function(err, rows, fields) {
  console.log('The solution is: ', rows);
});
 
connection.end();