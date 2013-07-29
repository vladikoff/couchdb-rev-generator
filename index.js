/* Config */
var DB_URL = 'http://localhost:5984';
var DB_NAME = 'test2';

var nano = require('nano')(DB_URL);
var db = nano.db.use(DB_NAME);
var Bert = require('./lib/bert/bert').Bert;

     
function getRevIdforDocument() {
  /* Document */
  // Deleted: boolean deleted document flag
  var Deleted = false;
  // OldStart: update sequence of the document
  var OldStart = 0;
  // OldRev: md5 revision of the previous document
  var OldRev = 0;
  // Body: JSON decoded contents of the document inside of the BERT tuple
  //  Bert.encode(Bert.tuple("Hello", 1));
  //  Erlang: {"Hello",1}
  var Body = Bert.tuple([]);
  // Atts2: Attachments
  var Atts2 = [];

  // Calculated 'OldStart' based on length
  var revSequence = 1; 

  var revisionInfo = [
    Deleted,
    OldStart,
    OldRev,
    Body,
    Atts2
  ];

  // Encode the data into a BERT list.
  var bertDoc = Bert.binary_to_list(Bert.encode(revisionInfo));

  // Create a a new Buffer from the BERT list
  var docBuffer = new Buffer(bertDoc);

  // Create the MD5 hash from the Buffer docBuffer
  var revMd5 = require('crypto').createHash('md5').update(docBuffer).digest("hex");

  // Final revision id is the revSequence (update sequence of the document) and the calculated MD5
  var rev_id = revSequence + '-' + revMd5;

  console.log(rev_id);

  return rev_id;
}

getRevIdforDocument();