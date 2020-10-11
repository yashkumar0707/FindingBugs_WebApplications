//let mongoose = require("mongoose");
//let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
var should = chai.should()


chai.use(chaiHttp);
//Our parent block
// describe('Books', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         Book.remove({}, (err) => {
//             done();
//         });
//     });
/*
  * Test the /GET route
  */
describe('/GET book', () => {
    it('it should GET all the books', (done) => {
        chai.request(server)
            .get('/api/books/b1')
            .end((err, res) => {
                res.should.have.status(200);
                console.log(typeof (res.body))
                res.body.should.be.an('object');
                //res.body.length.should.be.equal(0);
                done();
            });
    });
});

