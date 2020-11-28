const express = require('express');

const bodyParser = require('body-parser')
const router = express.Router();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const loginControllers = require('../controllers/login-controllers')
router.get('/', urlencodedParser, loginControllers.loginGet);
router.post('/', urlencodedParser, loginControllers.loginPost)
router.get('/about', urlencodedParser, loginControllers.mlGet);
router.post('/about', urlencodedParser, loginControllers.mlPost)
// router.put('/:bid', booksControllers.updateBook)
// router.delete('/:bid', booksControllers.deleteBook)
// router.get('/', booksControllers.getBooks)
module.exports = router

