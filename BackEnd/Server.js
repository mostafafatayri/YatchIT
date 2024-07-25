import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import fs from 'fs';
import https from 'https';
import Auth from "./router/Auth.router.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import Yacht from "./router/Yacht.router.js"
import Marina from "./router/Marina.router.js";
import Admin from "./router/Admin.router.js";
const app = express(); // Tell server type is express

dotenv.config();

try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("The YatchIt database is connected");
} catch (error) {
    console.log("Failed to connect to the BookIt database  ", error);
}

const allowedOrigins = ["http://localhost:5173"];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('combined')); 

app.use("/api/auth", Auth);
app.use("/api/yatch",Yacht);
app.use("/api/marina",Marina);
app.use("/api/adminActions",Admin);

// Read the SSL certificate and key files
const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start HTTPS server
httpsServer.listen(4490, () => {
    console.log("The backend server is running on HTTPS (zay el fool ya bashaaa)!");
});

// Optionally redirect HTTP to HTTPS
const http = express();

http.get('*', (req, res) => {
    res.redirect(`https://${req.headers.host}${req.url}`);
});

http.listen(80, () => {
    console.log('HTTP Server running on port 80 and redirecting to HTTPS');
});
