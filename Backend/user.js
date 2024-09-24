const mongoose = require('mongoose');

const ImagesSchema = new mongoose.Schema(
    {
        image: String
    },
    {
        collection: "ImageD",
    }
);

mongoose.model("ImageD", ImagesSchema);