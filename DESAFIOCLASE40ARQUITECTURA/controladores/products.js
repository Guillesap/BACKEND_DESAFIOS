import log4js from 'log4js'
import { generateMockProducts, fetchProducts, addProduct, updateProduct, removeProduct } from '../logica/productos.js'

export const returnTestProducts = async (req, res) => {
    try {
        const prods = generateMockProducts(5)
        res.json(prods)
    } catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
    }
}

export const returnProducts = async (req, res) => {
    try {
        const payload = await fetchProducts(req.params.id)
        res.send(payload)
    }
    catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
    }
}
export const createProduct = async (req, res) => {
    try {
        const payload = await addProduct(req.body)
        res.send(payload)
    }
    catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
    }
}
export const editProduct = async (req, res) => {
    try {
        const payload = await updateProduct(req.params.id, req.body)
        res.send(payload)
    }
    catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const payload = await removeProduct(req.params.id)
        res.send(payload)
    }
    catch(err) {
        let logger = log4js.getLogger('errores')
        logger.error(err)
    }
}