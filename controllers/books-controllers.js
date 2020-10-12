const book = require('../models/books')
const HttpError = require('../models/http-error');
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
    let place;
    try {
        place = await book.find({ id: bookById });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a place.',
            500
        );
        return next(error);
    }
    if (!place) {
        const error = new HttpError(
            'Could not find place for the provided id.',
            404
        );
        return next(error);
    }
    res.json({ place });
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
    const { id, title } = req.body
    const createdBook = {
        id,
        title
    }
    console.log('updtae')
    for (i = 0; i < dummy_place.length; i++) {
        if (dummy_place[i].id == id) {
            dummy_place[i].title = title
        }
    }
    res.json({ message: 'Book updated!', createdBook });
}
const deleteBook = async (req, res, next) => {
    const bookById = req.params.bid;
    await book.remove({ id: bookById })
    res.json({ message: 'Book successfully deleted!' });
}
const getBooks = async (req, res, next) => {
    res.json({ dummy_place })
}
exports.getBooksById = getBooksById
exports.createBook = createBook
exports.updateBook = updateBook
exports.deleteBook = deleteBook
exports.getBooks = getBooks