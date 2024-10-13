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
const ActivityService = require("./service/Activitys");
const Users = require("./service/Users");
const Comment = require("./service/Comment");
const AverageRating = require("./service/AverageRating");

app.use(express.static(path.join(__dirname, "./public")))
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(upload.single("img"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use("/api/users", UserController)
app.post("/api/login", asyncHeadle(async (req, res) => {
    return await Users.loginByUsernameAndPwd(req.body);
}))

app.use("/api/pages", PageController)
app.get("/api/pagesDict", asyncHeadle(async (req, res, next) => {
    return await pageService.getDict(req.query);
}))
app.use("/api/pagesDesc", PagesDesc)
app.use("/api/comment", CommentController)
app.get("/api/getComment/:id", asyncHeadle(async (req, res, next) => {
    return await Comment.getCommentByVenueId(req.params.id);
}))

app.get("/api/getAvgRating/:id", asyncHeadle(async (req, res, next) => {
    return await AverageRating.getAverageRatingById(req.params.id);
}))
app.put("/api/putAvgRating/:id", asyncHeadle(async (req, res, next) => {
    return await AverageRating.updateAverageRating(req.params.id, req.body);
}))

app.use("/api/Activitys", ActivitysController)
app.get("/api/venue/:id", asyncHeadle(async (req, res, next) => {
    return await ActivityService.getActivityByPagesId(req.params.id);
}))


app.get("/api/getRecommendations", asyncHeadle(async (req, res, next) => {
    // Query no more than 10 AverageRating records
    const avgRatings = await AverageRating.getAllAverageRating();

    // If the result is empty
    if (avgRatings.length === 0) {
        // Execute the getAllActivity function directly
        return await ActivityService.getAllActivity();
    } else {
        // Sort by the size of avg_rating
        avgRatings.sort((a, b) => b.avg_rating - a.avg_rating);

        // Traverse the AverageRating records and query the corresponding Activity
        const activityList = [];
        for (const rating of avgRatings.slice(0, 10)) { // Only take the first 10
            const activity = await ActivityService.getActivityById(rating.Activity_id);
            if (activity) {
                activityList.push(activity);
            }
        }
        // Return the final result
        return activityList;
    }
}))

app.post("/api/searchVenue", asyncHeadle(async (req, res, next) => {
    return await ActivityService.searchActivities(req.body)
}));

app.use(ErrMid)
app.listen(port, () => {
    console.log("server start");
})