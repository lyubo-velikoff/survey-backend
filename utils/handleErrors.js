module.exports = (err, res) => {
    res.status(500).json({
        msg: err.message || 'Some error occurred'
    })
}
