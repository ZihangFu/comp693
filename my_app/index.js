const express = require("express")
const multer  = require('multer')
const cors = require("cors")
const path = require("path")
const upload = multer({ dest: path.join(__dirname,"./uploads")})
const app = express();
const port = 8848;
const UserController = require("./controller/UserController")
const PageController = require("./controller/PageController")
const PagesDesc = require("./controller/PageDesc")
const CommentController = require("./controller/CommentController")
const ActivitysController = require("./controller/ActivitysController")
const ErrMid = require("./base/ErrMid");


app.use(express.static(path.join(__dirname,"./public")))
app.use(upload.single("img"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api/users",UserController)
app.use("/api/pages",PageController)
app.use("/api/pagesDesc",PagesDesc)
app.use("/api/comment",CommentController)
app.use("/api/Activitys",ActivitysController)

app.use(ErrMid)
app.listen(port,()=>{
    console.log("server start");
})