export default class Product {

    constructor(name, prx, cata, img) {
        this.name = name;
        this.price = prx
        this.category = cata
        this.image = img
    }
     toString() {
        return  JSON.stringify(this)
    }
}