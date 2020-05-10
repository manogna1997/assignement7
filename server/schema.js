const { gql } = require('apollo-server');
const { Product } = require('./models/products.module.js');

const typeDefs = gql`
  type Product  {
        id: ID,
    	category: Category!
    	name: String!
    	price: Float
    	image: String
  }
  enum Category {
        Shirts
        Jeans
        Jackets
        Sweaters
        Accessories 
  }
  type Query {
    products: [Product],
    getProduct(id: ID!): Product
  }
#   5e77bd80597d535d5d336f84
  type Mutation{
        createProd(name: String!,price: Float, image: String,category: Category!): Product!,
        editProd(id: ID!,name: String!,price: Float, image: String,category: Category!): Product!,
        removeProd(id: ID!): Boolean!
    }
`;
const products = [];
// The resolvers
const resolvers = {
    Query: { 
        products: () => Product.find({}),
        getProduct: (parent, args) => {
            console.log("trying to get "+args.id)
            return Product.findById(args.id);
          }
     },
    Mutation: {
        createProd(parent, args, ctx, info) {
            const product = new Product({
                // id: products.length + 1,
                name: args.name,
                image: args.image,
                price: args.price,
                category: args.category
            });
            return product.save();
        },
        editProd: (parent, args, ctx, info) => {
            console.log(args)
             Product.findByIdAndUpdate(args.id,
                {
                    $set: {
                        name: args.name,
                        image: args.image,
                        price: args.price,
                        category: args.category
                    },
                    useFindAndModify: true
                }, { new: true }, (err, Product) => {
                    if (err) {
                        console.log('Something went wrong when updating the movie');
                    } 
                    console.log("trying to update "+args.id)
                })
                return Product.findById(args.id);
        },
        removeProd: (parent, args, ctx, info) => {
            var passed = true
            console.log("got id for delete  "+args.id)
             Product.findByIdAndDelete(args.id,(err, Product) => {
                    if (err) {
                        passed = false
                    } 
                    console.log("trying to update "+args.id)
                })
                return passed
        }

        //  ...
    }
};

export { typeDefs, resolvers };