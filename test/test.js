var chai = require('chai');
var chaiHttp = require('chai-http');
var async = require('async');


var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();

var http = require('http');
chai.use(chaiHttp);

describe('HTTP GET Test 1: Test all movies', function () {
    var requestResult;
    var response;
       
    // execute the get request
      before(function (done) {
          chai.request("https://streamcentral.azurewebsites.net")
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
        expect(requestResult[0]).to.include.keys('tmdb_id', 'title', '_id');
        expect(requestResult[0]).to.have.property('_id').that.is.a('string');
        expect(requestResult[0]).to.have.property('tmdb_id').that.is.a('number');
        expect(requestResult[0]).to.have.property('title').that.is.a('string');
      });

      it('The elements in the array have the expected properties', function(){
        expect(response.body).to.have.length.above(2);
        expect(response.body).to.satisfy(
          function (body) {
            for (var i = 0; i < body.length; i++) {
              expect(body[i]).to.have.property('_id');
              expect(body[i]).to.have.property('tmdb_id').that.is.a('number');
              expect(body[i]).to.have.property('title');
            }
            return true;
          });
      });
});

describe('HTTP GET Test 2: Test one movie', function () {
  var requestResult;
  var response;
     
    before(function (done) {
        chai.request("https://streamcentral.azurewebsites.net")
      .get("/movies/866398")
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
      expect(requestResult).to.include.keys('_id', 'tmdb_id');
      expect(requestResult['tmdb_id']).to.be.a('number');
    });
});

// Test HTTP POST
describe('Test POST: adding a movie to the Favorites list', function(){
  var requestResult;
  var response;

    // post request to add a movie to the favorites list of user 1
      before(function (done) {
          chai.request("https://streamcentral.azurewebsites.net")
        .post('/favorites/1/98723472')
        .end(function (err, res) {
          requestResult = res.body;
          response = res;
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
          done();
        });
      });
      // endpoint: Favorites/userid

      it('Should return one JSON object', function (){ 
        expect(response).to.have.headers;
        expect(response).to.have.status(200);
      });
  
      it('The JSON object properties have the expected names and types', function(){
        expect(requestResult).to.include.keys('__v', '_id', 'movies', 'userId');
        expect(requestResult['movies']).to.be.an('array');
        expect(requestResult['_id']).to.be.a('string');
        expect(requestResult['userId']).to.be.a('string');
      });

      it('The user and movie IDs are equal to the expected values', function(){
        expect(requestResult['movies']).to.have.lengthOf.above(0);
        expect(requestResult['movies']).to.include(98723472);
        expect(requestResult['userId']).to.equal('1');
      });

      it('The movies array contains distinct numbers', function(){
        expect(requestResult['movies']).to.satisfy(
          function(moviesArray){
            // check that every element is a number
            for(var i = 0; i < moviesArray.length; i++){
              expect(moviesArray[i]).to.be.a('number');
            }

            // check that the numbers are distinct
            set = new Set(moviesArray);
            expect(set.size).to.equal(moviesArray.length);
            return true;
          }
        )
      })
});