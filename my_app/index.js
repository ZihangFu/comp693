const express = require("express")
const multer = require('multer')
const cors = require("cors")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "./uploads"));
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, filename);
    }
});

// const upload = multer({ dest: path.join(__dirname, "./uploads") })
const upload = multer({ storage });
const app = express();
const port = 8848;
const UserController = require("./controller/UserController")
const PageController = require("./controller/PageController")
const PagesDesc = require("./controller/PageDesc")
const CommentController = require("./controller/CommentController")
const ActivitysController = require("./controller/ActivitysController")
const ErrMid = require("./base/ErrMid");
const asyncHeadle = require("./controller/baseController");
const pageService = require("./service/Page");



app.use(express.static(path.join(__dirname, "./public")))
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(upload.single("img"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api/users", UserController)
app.use("/api/pages", PageController)
app.get("/api/pagesDict", asyncHeadle(async (req, res, next) => {
    return await pageService.getDict(req.query);
}))
app.use("/api/pagesDesc", PagesDesc)
app.use("/api/comment", CommentController)
app.use("/api/Activitys", ActivitysController)

app.use(ErrMid)
app.listen(port, () => {
    console.log("server start");
})