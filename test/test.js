var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');


var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('HTTP GET Test 1: Test Movies result', function () {
    var requestResult;
    var response;
       
    // execute the get request
      before(function (done) {
          chai.request("https://streamcentral.azurewebsites.net")
        .get("/movies/")
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
              // expect(body[i]).to.have.property('imdb_id');
            }
            return true;
          });
      });
});

describe('HTTP GET Test 2: Test Favorites result', function () {

  var requestResult;
  var response;
     
    before(function (done) {
        chai.request("https://streamcentral.azurewebsites.net")
      .get("/user/favorites/2")
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
      expect(requestResult).to.have.length(1);
    });

    it('Object has known properties', function(){
      expect(requestResult).to.include.keys('_id', 'id', 'movies', 'userId');
      expect(requestResult['movies']).to.be.an('array');
    });
});

// Test HTTP POST
describe('Test POST: adding a movie to the Favorites list', function(){
  var requestResult;
  var response;

    // post request to add a movie w/ ID 1 to the favorites list of user 1
      before(function (done) {
          chai.request("https://streamcentral.azurewebsites.net")
        .post('/user/favorites/1')
        .end(function (err, res) {
          requestResult = res.body;
          response = res;
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
          done();
        });
      });

      it('Should return one JSON object', function (){ 
        expect(response).to.have.headers;
        expect(requestResult).to.have.length(1);
      });
  
      it('The JSON object properties have the expected names and types', function(){
        expect(requestResult).to.include.keys('id', 'movies', 'userId');
        expect(requestResult['movies']).to.be.an('array');
        expect(requestResult['id'].to.be.a('string'))
        expect(requestResult['userId'].to.be.a('string'))
      });

      it('The user and movie IDs are equal to the expected values', function(){
        expect(requestResult['movies']).to.have.length.above(0)
        expect(requestResult['movies']).to.contain(1)
        expect(requestResult['userId']).to.equal('1')
      });

      it('The movies array contains distinct numbers', function(){
        expect(requestResult['movies']).to.satisfy(
          function(moviesArray){
            // check that every element is a number
            for(var i = 0; i < moviesArray.length; i++){
              expect(moviesArray[i]).to.be.a('number');
            }

            // check that the numbers are distinct
            set = new Set(moviesArray)
            expect(set.length).to.equal(moviesArray.length)
            return true;
          }
        )
      })
});