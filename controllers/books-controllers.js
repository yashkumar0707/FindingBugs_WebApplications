
const dummy_place = [
    {
        id: 'b1',
        title: 'Harry Potter'
    }
]
const getBooksById = async (req, res, next) => {
    const bookById = req.params.bid;
    const book = dummy_place.find(b => {
        return b.id === bookById
    })
    res.json({ book });
};
const createBook = async (req, res, next) => {
    const { id, title } = req.body
    console.log(req.body)
    const createdBook = {
        id,
        title
    }
    // try {
    //     dummy_place.push(createdBook)
    //     res.json(201).json({ book: createdBook })
    // }
    // catch (err) {
    //     console.log(err)
    // }
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
exports.getBooksById = getBooksById
exports.createBook = createBook
exports.updateBook = updateBook