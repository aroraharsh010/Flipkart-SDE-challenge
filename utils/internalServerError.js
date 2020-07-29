module.exports = async (res, error) => {
    console.log({ error })
    return res.status(501).send({ error, message: "Internal Server Error" })
}