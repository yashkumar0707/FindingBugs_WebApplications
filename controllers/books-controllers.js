
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
    res.status(201).json({ book: createdBook })
}
exports.getBooksById = getBooksById
exports.createBook = createBook