import { app } from "./app.js";
import { connectDB } from "./db/connect.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4000;



connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Express App running on 127.0.0.1:${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`${error}`);
    })