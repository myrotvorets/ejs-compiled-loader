// const {equal} = require('assert');

const equal = (actual, expected) => {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}`);
    }
};

var tpl = require('./template.ejs');
equal(tpl({ noun: 'World' }), 'Hello, World!\n');

// var tpl3 = require("./subdir/parent.ejs");
// equal(tpl3({foo: "foo"}), "parent: child: foo\n\n");

var tpl4 = require('./htmlmin.ejs');
equal(tpl4({ test: 123 }), '123\n');

var tpl2 = require('!!../?delimiter=?!./template2.ejs');
equal(tpl2({ hobbies: ['food', 'code'] }).trimRight(), '  I like food.\n  I like code.');
