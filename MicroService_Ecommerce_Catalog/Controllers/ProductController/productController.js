const ProductModel = require('../../Models/Products');
const {
    genericFunctionTosendJsonResponse
} = require('../../Utils/ApiResponceUtils');
const ObjectId = require('mongodb').ObjectId;

const getAllProducts = async (req, res, next) => {
    try {
        const allProducts = await ProductModel.find().orFail();
        res.json(
            genericFunctionTosendJsonResponse(
                'Product Fetched SuccessFully',
                allProducts
            )
        );
    } catch (err) {
        next(err);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params;

        if (!ObjectId.isValid(productId)) {
            res.json(
                'Please Enter Correct Product ID',
            )
        } else {
            const specificProduct = await ProductModel.findById(productId).orFail();
            res.json(
                genericFunctionTosendJsonResponse(
                    'Specific Product Fetched SuccessFully',
                    specificProduct
                )
            );
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { getAllProducts, getProductById };
