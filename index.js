/* Config */
var DB_URL = 'http://localhost:5984';
var DB_NAME = 'test2';

var nano = require('nano')(DB_URL);
var db = nano.db.use(DB_NAME);
var Bert = require('./lib/bert/bert').Bert;


function getRevIdforDocument() {
	/* Document */
	var Deleted = false;
	var OldStart = 0;
	var OldRev = 0;
	var Body = Bert.tuple([]);
	var Atts2 = [];
	var revSequence = 1; 

	var revisionInfo = [
		Deleted,
		OldStart,
		OldRev,
		Body,
		Atts2
	];

	var bertDoc = Bert.binary_to_list(Bert.encode(revisionInfo));
	var docBuffer = new Buffer(bertDoc);
	var revMd5 = require('crypto').createHash('md5').update(docBuffer).digest("hex");
	var rev_id = revSequence + '-' + revMd5;

	console.log(rev_id);

	return rev_id;
}

getRevIdforDocument();