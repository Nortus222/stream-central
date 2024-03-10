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
        expect(requestResult[0]).to.include.keys('tmdb_id', 'title', 'imdb_id');
        expect(requestResult[0]).to.have.property('_id');
      });

      it('The elements in the array have the expected properties', function(){
        expect(response.body).to.have.length.above(2);
        expect(response.body).to.satisfy(
          function (body) {
            for (var i = 0; i < body.length; i++) {
              expect(body[i]).to.have.property('_id');
              expect(body[i]).to.have.property('tmdb_id').that.is.a('number');
              expect(body[i]).to.have.property('title');
              expect(body[i]).to.have.property('imdb_id');
            }
            return true;
          });
      });
});

describe('Test Favorites result', function () {

  var requestResult;
  var response;
     
    before(function (done) {
        chai.request("http://localhost:8080")
      .get("/favorites/2")
      .end(function (err, res) {
        requestResult = res.body;
        response = res;
                expect(err).to.be.null;
                expect(res).to.have.status(200);
        done();
      });
        });

    it('Should return one element', function (){ 
      expect(response).to.have.status(200);
      expect(response).to.have.headers;
    });

    it('Object has known properties', function(){
      expect(requestResult).to.include.keys('_id', 'id', 'movies', 'userId');
      expect(requestResult['movies']).to.be.an('array');
    });
});
