process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
//let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
var should = chai.should()
let Book = require('../models/books');

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
            .get('/api/books/')
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
            id: 'b3',
            title: "The Lord of the Rings <script>",
            author: "J.R.R. Tolkien",
            year: 1954,
            pages: 1170
        }
        chai.request(server)
            .post('/api/books/')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.should.have.property('message').eql('Book successfully added!');
                res.body.createdBook.should.have.property('title');
                res.body.createdBook.should.have.property('author');
                res.body.createdBook.should.have.property('pages');
                res.body.createdBook.should.have.property('year');
                res.body.createdBook.should.have.property('title').to.not.match(/<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/)
                done();
            });
    });
});


describe('/PUT/:id book', () => {
    it('it should UPDATE a book given the id', (done) => {
        let book = {
            id: 'b2',
            title: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            year: 1954,
            pages: 1170
        }
        // book.save((err, book) => {
        chai.request(server)
            .put('/api/books/b2')
            .send(book)
            .end((err, res) => {
                //console.log(res)
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Book updated!');
                //res.body.should.have.property('year').eql(1950);

                done();
            });
    });
});

describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', (done) => {
        let book = new Book({ id: 'b3', title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778 })
        book.save((err, book) => {
            chai.request(server)
                .delete('/api/books/b3')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully deleted!');
                    // res.body.result.should.have.property('ok').eql(1);
                    // res.body.result.should.have.property('n').eql(1);
                    done();
                });
        });
    });
});

describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
        let bid = 'b2'
        chai.request(server)
            .get('/api/books/' + bid)
            .end((err, res) => {
                //console.log(res.body.book[0])
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.book[0].should.have.property('title');
                res.body.book[0].should.have.property('author');
                res.body.book[0].should.have.property('pages');
                res.body.book[0].should.have.property('year');
                res.body.book[0].should.have.property('id').eql(bid);
                res.body.book[0].should.have.property('title').to.not.match(/<(|\/|[^\/>][^>]+|\/[^>][^>]+)>/)
                done();
            });
    });

});


