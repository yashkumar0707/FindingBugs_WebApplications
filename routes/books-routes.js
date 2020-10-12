const express = require('express');

const router = express.Router();
const booksControllers = require('../controllers/books-controllers')
router.get('/:bid', booksControllers.getBooksById);
router.post('/', booksControllers.createBook)
router.put('/:bid', booksControllers.updateBook)
//router.delete('/:bid', booksControllers.deleteBook)

module.exports = router
