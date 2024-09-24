const express = require('express');
require("./database.js");
const mongoose = require('mongoose');
const cors = require('cors')
const Client = require('./Client.js')



const app = express();
app.use(express.json());
app.use(cors());

require("./user.js")
const Images = mongoose.model("ImageD")

app.get("/", async (req, res) => {
    res.send("Success");
});

app.listen(5000, () => {
    console.log("server Started");
})
///////////////////Add Image///////////////////////////



const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../FrontEnd/pbphotography/src/Components/image')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/upload-image", upload.single("image"), async (req, res) => {
    console.log("req.body");
    const imageName = req.file.filename;
    try {
        await Images.create({ image: imageName })
        res.json({ status: "ok" })
    } catch (error) {
        res.json({ status: "error" })
    }
})
//////////////////////fetch img//////////////////////////////////
app.get("/get_img", async (req, res) => {
    try {
        Images.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        res.json({ status: "error" })
    }
})





///////////////////////Contact Page///////////////////////////////
app.use(express.json());
app.use(cors());
app.post("/contact", async (req, resp) => {
    let clientt = new Client(req.body);
    let result = await clientt.save();
    result = result.toObject();
    delete result.password;
    resp.send(result);
    // resp.send(req.body)
})