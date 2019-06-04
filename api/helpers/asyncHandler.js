module.exports = cb => {
    return async(req, res, next) => {
        try {
            cb(req, res)
        } catch (error) {
            res
            .status(500)
            .json(error);
        }
    }
}