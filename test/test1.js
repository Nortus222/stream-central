var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');


var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('Test Movies result', function () {
  
    var requestResult;
    var response;
       
      before(function (done) {
          chai.request("http://localhost:8080")
        .get("/movies")
        .end(function (err, res) {
          requestResult = res.body;
          response = res;
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
          done();
        });
          });
      
      it('Should return an array object with more than 2 objects', function (){
        expect(response).to.have.status(200);
        expect(response.body).to.have.length.above(2);
        expect(response).to.have.headers;
      });

      it('The first entry in the array has known properties', function(){
        expect(requestResult[0]).to.include.keys('tmdb_id');
        expect(requestResult[0]).to.have.property('_id');
        expect(response.body[0]).to.have.deep.property('listId');
        expect(response.body).to.not.be.a.string;
      });


});
