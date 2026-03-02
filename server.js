import express from "express";//테스트
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";
import session from "express-session";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import dotenv from "dotenv";
import { Console, debug } from "console";
import vision from "@google-cloud/vision";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 10000;
app.set("trust proxy", 1);
app.use(session({
  secret: "tmffkdlavmfhwprxm",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    sameSite: "None"
  }
}));
app.use(cors({
  origin: "https://worldservive.onrender.com", // 또는 Render 배포 주소
  credentials: true
}));
app.use(express.json());
app.use((req, res, next) => {
  //console.log("세션 객체:", req.session);
  next();
});
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ 연결 실패:", err);
  }
}
startServer();
const upload = multer({ dest: "temp/" });
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
async function saveFileToDrive(filePath, fileId) {
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const media = {
    mimeType: "application/json",
    body: fs.createReadStream(filePath)
  };
  const res = await drive.files.update({
    fileId: fileId,
    media: media
  });
  console.log("✅ Google Drive 저장 완료:", res.data.id);
}
const visclient = new vision.ImageAnnotatorClient({
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_KEY)
});
//파일들
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});
await oauth2Client.getAccessToken();
const drive = google.drive({ version: "v3", auth: oauth2Client });
async function downloadFile(fileId, destPath) {
  const dest = fs.createWriteStream(destPath);
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
  return new Promise((resolve, reject) => {
    res.data
      .on("end", () => {
        console.log("✅ 다운로드 완료:", destPath);
        resolve();
      })
      .on("error", (err) => {
        console.error("❌ 다운로드 실패:", err);
        reject(err);
      })
      .pipe(dest);
  });
}
await downloadFile("1cLgUI3fI7bntVzuQqPoeNSufSWRFHpnP", path.join(__dirname, "user.js"));

// // const res = await axios.post("http://localhost:10000/analyze-image", {
//   url: "https://example.com/test.jpg"
// });
// console.log(res.data);
app.get("/login", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    //prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/drive.file"
    ]
    //drive.file
  });
  res.redirect(authUrl);
});
app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: "로그아웃 실패" });
    }
    res.clearCookie("connect.sid"); // 세션 쿠키 제거
    res.json({ success: true });
  });
});
app.get("/userdata", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: "이메일이 필요합니다." });
    }
    const userPath = path.join(__dirname, "user.js");
    const usersCollection = JSON.parse(fs.readFileSync(userPath, "utf-8"));
    const user = usersCollection.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }
    res.json({
      email: user.email,
      picture: user.picture,
      nickname: user.nickname,
      bio: user.bio,
      create: user.createdAt,
      config: user.config
    });
  } catch (err) {
    console.error("사용자 정보 가져오기 실패_1:", err);
    res.status(500).json({ error: "서버 내부 오류", detail: err.message });
  }
});
app.get("/auth/check", async (req, res) => {
  //console.log("세션 토큰:", req.session.tokens);
  if (!req.session.tokens) {
    return res.status(401).json({ loggedIn: false });
  }
  try {
    oauth2Client.setCredentials(req.session.tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    const { email, name, picture } = userInfo.data;
    const userPath = path.join(__dirname, "user.js");
    const usersCollection = JSON.parse(fs.readFileSync(userPath, "utf-8"));
    let user = usersCollection.find(u => u.email === email);
    if (!user) {
      // 새 사용자 등록
      user = {
        email,
        picture,
        nickname: name,
        bio: "",
        createdAt: new Date(),
        config: {}
      };
      usersCollection.push(user);
      console.log("등록중");
      fs.writeFileSync(userPath, JSON.stringify(usersCollection, null, 2));
      await saveFileToDrive(userPath, "1cLgUI3fI7bntVzuQqPoeNSufSWRFHpnP");
      console.log("✅ 새 사용자 등록:", email);
    } else {
      console.log("🔎 기존 사용자 불러오기:", email);
    }
    req.session.userEmail = email;
    res.json({
      loggedIn: true,
      email: user.email,
      picture: user.picture,
      nickname: user.nickname,
      bio: user.bio,
      create: user.createdAt,
      config: user.config
    });
  } catch (err) {
    console.error("사용자 정보 가져오기 실패", err.response?.data || err);
    res.status(500).json({ error: "서버 내부 오류", detail: err.message });
  }
});
app.put("/user", async (req, res) => {
  const email = req.session.userEmail;
  const { nickname, bio, picture, config } = req.body;

  if (!email) return res.status(401).json({ error: "로그인 필요" });

  try {
    const userPath = path.join(__dirname, "user.js");
    const users = JSON.parse(fs.readFileSync(userPath, "utf-8"));
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ error: "사용자 없음" });
    }
    users[userIndex] = {
      ...users[userIndex],
      nickname,
      bio,
      picture,
      config
    };
    fs.writeFileSync(userPath, JSON.stringify(users, null, 2));
    await saveFileToDrive(userPath, "1cLgUI3fI7bntVzuQqPoeNSufSWRFHpnP");
    res.json({ success: true });
  } catch (err) {
    console.error("사용자 정보 수정 실패:", err);
    res.status(500).json({ error: "수정 실패" });
  }
});
// 인증 코드 처리
app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  //console.log("받은 토큰:", tokens);
  oauth2Client.setCredentials(tokens);
  req.session.tokens = tokens;
  req.session.save(err => {
    if (err) {
      console.error("❌ 세션 저장 실패:", err);
      return res.status(500).send("세션 저장 실패");
    }
    console.log("✅ 세션 저장 완료:");
    // console.log("✅ 세션 저장 완료:", req.session.tokens);
    res.redirect("/");
  });
});

app.post("/upload-file-drive", upload.single("file"), async (req, res) => {
  if (!req.session.tokens) return res.status(401).json({ error: "로그인 필요" });

  oauth2Client.setCredentials(req.session.tokens);
  const drive = google.drive({ version: "v3", auth: oauth2Client });

  const filePath = req.file.path;

  try {
    const fileMetadata = { name: req.file.originalname };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(filePath)
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: "id"
    });

    const fileId = response.data.id;

    await drive.permissions.create({
      fileId,
      requestBody: { role: "reader", type: "anyone" }
    });

    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
    res.json({ success: true, url: fileUrl });
  } catch (err) {
    console.error("Drive 업로드 실패", err);
    res.status(500).json({ error: "업로드 실패" });
  } finally {
    fs.unlinkSync(filePath); // 임시 파일 삭제
  }
});

app.use(express.static(path.join(__dirname, "dist")));
// SPA 라우팅 처리
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
