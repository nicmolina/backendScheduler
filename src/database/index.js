const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://dbNode:Nicolas210999@cluster0.0xkvn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
mongoose.Promise = global.Promise;

module.exports = mongoose;