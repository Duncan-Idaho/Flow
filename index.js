var crypto = require('crypto');
var assert = require('assert');
var pmongo = require('promised-mongo');
var Q = require('q');
var _ = require('lodash');

var db = pmongo('flow', ['messages']);

function createMessageData(text) {
  return {
    type: 'text',
    data: text
  };
}

function createMessage(data) {
  var hasher = crypto.createHash('sha256');
  hasher.update(JSON.stringify(data));
  var id = hasher.digest("hex");  

  return {
    _id: id,
    content: data
  };
}

function acknowledgeDocumentInsert (messages) {
  console.log("Inserted a message.");
}
function acknowledgeDocumentInsert4 () {
  console.log("Failed to insert a message.");
}

function acknowledgeDbClosed2 (db) {
  console.log("Database is closed.");
}


var data = createMessageData('Hello! This is a third, unrelated message');
var message = createMessage(data);

db.messages.insert(message)
  .then(acknowledgeDocumentInsert)
  .then(_.bind(db.close, db))
  .then(acknowledgeDbClosed);
