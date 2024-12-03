// server/index.js
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio'; 

const app = express();

// CORSの設定
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// データベース接続設定
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  // password: '1998kouki',
  password: '',
  database: 'portfolio_gallery'
}).promise();

// OGP情報取得関数
async function getOGPData(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    return {
      title: $('meta[property="og:title"]').attr('content'),
      description: $('meta[property="og:description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content'),
      site_name: $('meta[property="og:site_name"]').attr('content')
    };
  } catch (error) {
    console.error('Error fetching OGP:', error);
    return null;
  }
}

// GETエンドポイント
app.get('/api/portfolios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM portfolios ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// POSTエンドポイント
app.post('/api/portfolios', async (req, res) => {
  const { title, url, industry, experience, color, description } = req.body;
  
  try {
    // OGP情報を取得
    const ogpData = await getOGPData(url);
    
    const [result] = await pool.query(
      "INSERT INTO portfolios (title, url, industry, experience, color, description, ogp_data) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        url,
        industry,
        experience,
        color,
        description,
        JSON.stringify(ogpData),
      ]
    );
    
    res.json({
      success: true,
      id: result.insertId,
      data: {
        title,
        url,
        url,
        industry,
        experience,
        color,
        description,
        ogp_data: ogpData,
      },
    });
  } catch (error) {
    console.error('Error creating portfolio:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// const PORT = 8080;
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});