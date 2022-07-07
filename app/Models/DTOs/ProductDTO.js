class ProductDTO {
    constructor(productObj, id) {
        Object.assign(this, productObj)

        this.created_at = productObj.created_at || Date.now()
        this.updated_at = Date.now()

        if (id) {
            this.id = id
        }
    }
}

module.exports = ProductDTO