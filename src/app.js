import express from "express";
import multer from "multer";
import File from "./models/files.models.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const upload = multer({ dest: "uploads" });

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/api/files", upload.single("file"), async (req, res) => {
    try {
        const file = new File({
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size,
        });

        const data = await file.save();

        // return res.status(201).json({
        //     file: `${process.env.APP_BASE_URL}/files/${data.id}`
        // });

        return res.render("index", {
            fileLink: `${process.env.APP_BASE_URL}/files/${data.id}`
        });
    }
    catch(error) {
        // return res.status(500).json({
        //     error
        // });

        return res.render("index", {
            error: "failed"
        });
    }
});



app.get("/files/:id", async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if(!file) {
            return res.render("download", {
                error: "File Not Found"
            });
        }
        return res.render("download", {
            id: file.id,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.id}`
        });
    }
    catch(error) {
        return res.render("download", {
            error: "Failed"
        });
    }
});

app.get("/files/download/:id", async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if(!file) {
            return res.render("download", {
                error: "File Not Found"
            });
        }

        res.download(file.path, file.filename);
    }
    catch(error) {
        return res.render("download", {
            error: "Failed"
        });
    }
});



export { app };