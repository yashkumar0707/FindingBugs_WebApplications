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
describe('/POST book', () => {
    // it('it should not POST a book without pages field', (done) => {
    //     let book = {
    //         title: "The Lord of the Rings",
    //         author: "J.R.R. Tolkien",
    //         year: 1954
    //     }
    //     chai.request(server)
    //         .post('/book')
    //         .send(book)
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('errors');
    //             res.body.errors.should.have.property('pages');
    //             res.body.errors.pages.should.have.property('kind').eql('required');
    //             done();
    //         });
    // });
    it('it should POST a book ', (done) => {
        let book = {
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954,
            pages: 1170
        }
        chai.request(server)
            .post('/api/books')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('message').eql('Book successfully added!');
                res.body.createdBook.should.have.property('title');
                //res.body.createdBook.should.have.property('author');
                // res.body.book.should.have.property('pages');
                // res.body.book.should.have.property('year');
                done();
            });
    });
});

