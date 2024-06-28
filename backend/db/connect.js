const { default: mongoose } = require("mongoose")

const connectDb = (uri) => {
    return mongoose.connect(uri,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(() => console.log('mongodb in connected'))
    .catch(e => console.log(e))
}

module.exports = connectDb