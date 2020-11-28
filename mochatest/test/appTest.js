const assert = require('chai').assert;
const app = require('../app');


var Book = new app.createbook('b1','Name', 'Yash', 2012, 1980);

describe('App', function(){

  describe('Book ID', () => {
    it('Should be of type string', () => {
      assert.typeOf(Book.id, 'string', 'is of type string');
    });

    it('Should be Alphanumeric', () => {
      assert.match(Book.id, /^[a-zA-Z0-9_]*$/, 'id is alphanumeric');
    });

    it('Should not be NULL', () => {
      assert.isNotNull(Book.id, 'ID is not NULL');
    });
  });

  describe('Book Title', () => {
    it('Should be of type string', () => {
      assert.typeOf(Book.title, 'string', 'is of type string');
    });

    it('Should be longer than 4 Characters', () => {
      assert.isAtLeast(Book.title.length, 4, 'Title is longer than 4 characters');
    });

    it('Should not be NULL', () => {
      assert.isNotNull(Book.title, 'Title is not NULL');
    });
  });

  describe('Book Author', () => {
    it('Should be of type string', () => {
      assert.typeOf(Book.author, 'string', 'is of type string');
    });

    it('Should be longer than 4 Characters', () => {
      assert.isAtLeast(Book.author.length, 4, 'Title is longer than 4 characters');
    });

    it('Should not be NULL', () => {
      assert.isNotNull(Book.author, 'Author Name is not NULL');
    });
  });

  describe('Book Publishing Year', () => {
    it('Should be of type number', () => {
      assert.typeOf(Book.year, 'number', 'is of type number');
    });

    it('Should be a valid Year', () => {
      assert.match(Book.year, /^\d{4}$/ , 'Year Of Publishing is finite');
    });

    it('Should not be NULL', () => {
      assert.isNotNull(Book.year, 'Year is not NULL');
    });
  });

  describe('Book Pages', () => {
    it('Should be of type number', () => {
      assert.typeOf(Book.pages, 'number', 'is of type number');
    });

    it('Should not be NULL', () => {
      assert.isNotNull(Book.pages, 'No. of Pages are not NULL');
    });
  });
});
