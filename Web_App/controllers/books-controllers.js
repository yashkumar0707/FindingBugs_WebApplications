const book = require('../models/books')
const HttpError = require('../models/http-error');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
var should = chai.should()
let Book = require('../models/books');

chai.use(chaiHttp);
const dummy_place = [
    {
        id: 'b1',
        title: 'Harry Potter'
    }
]
const getBooksById = async (req, res, next) => {
    const bookById = req.params.bid;
    // const book = dummy_place.find(b => {
    //     return b.id === bookById
    // })
    // res.json({ book });
    let getBook;
    try {
        getBook = await book.find({ id: bookById });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a place.',
            500
        );
        return next(error);
    }
    if (!getBook) {
        const error = new HttpError(
            'Could not find place for the provided id.',
            404
        );
        return next(error);
    }
    //res.json({ book: getBook.toObject({ getters: true }) });
    res.json({ book: getBook })
};
const createBook = async (req, res, next) => {
    const { id, title, author, year, pages } = req.body
    console.log(req.body)
    const createdBook = new book({
        id,
        title,
        author,
        year,
        pages
    })
    // try {
    //     dummy_place.push(createdBook)
    //     res.json(201).json({ book: createdBook })
    // }
    // catch (err) {
    //     console.log(err)
    // }
    const result = await createdBook.save()

    res.json({ message: "Book successfully added!", createdBook });

}
const updateBook = async (req, res, next) => {
    const { id, title, author, year, pages } = req.body
    const createdBook = {
        id,
        title
    }
    console.log('updtae')
    try {
        getBook = await book.find({ id: id });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a place.',
            500
        );
        return next(error);
    }
    getBook[0].pages = pages
    console.log(getBook)
    try {
        await getBook[0].save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update place.',
            500
        );
        return next(error);
    }
    for (i = 0; i < dummy_place.length; i++) {
        if (dummy_place[i].id == id) {
            dummy_place[i].title = title
        }
    }
    res.json({ message: 'Book updated!', getBook });
}
const deleteBook = async (req, res, next) => {
    const bookById = req.params.bid;
    await book.remove({ id: bookById })
    res.json({ message: 'Book successfully deleted!' });
}
const getBooks = async (req, res, next) => {
    const books = await book.find()
    // describe('/GET book', () => {
    //     it('it should GET all the books', (done) => {
    //         chai.request(server)
    //             .get('/api/books/')
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 console.log(typeof (res.body))
    //                 res.body.should.be.an('object');
    //                 //res.body.length.should.be.equal(0);
    //                 done();
    //             });
    //     });
    // });
    res.json({ books })
}
exports.getBooksById = getBooksById
exports.createBook = createBook
exports.updateBook = updateBook
exports.deleteBook = deleteBook
exports.getBooks = getBooks