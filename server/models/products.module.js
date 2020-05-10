// #1 Import the constructor Schema and the model() method
// Note the use of ES6 desctructuring
const { Schema, model  }  = require('mongoose');
const mongoose = require('mongoose');
// #2 Instantiate a schema using mongoose Schema
const postSchema = new Schema({
    	category: String,
    	name: String,
    	price:  Number,
    	image: String
});

// #3 Create a model with mongoose model() method
const Product = model('post', postSchema);

export {Product};