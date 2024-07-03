const express = require('express');
const axios = require('axios');
const ytdl = require('ytdl-core');
const TikTokScraper = require('tiktok-scraper');
const InstagramScraper = require('instagram-scraper');
const FacebookScraper = require('facebook-scraper');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/download', async (req, res) => {
    const { url, platform } = req.query;

    try {
        switch (platform) {
            case 'youtube':
                res.header('Content-Disposition', 'attachment; filename="video.mp4"');
                ytdl(url, { format: 'mp4' }).pipe(res);
                break;
            case 'tiktok':
                const tiktokVideo = await TikTokScraper.getVideoMeta(url);
                res.header('Content-Disposition', `attachment; filename="${tiktokVideo.video.title}.mp4"`);
                axios.get(tiktokVideo.video.download_url, { responseType: 'stream' }).then(response => {
                    response.data.pipe(res);
                });
                break;
            case 'instagram':
                const instagramPost = await InstagramScraper(url);
                res.header('Content-Disposition', `attachment; filename="${instagramPost.url}.mp4"`);
                axios.get(instagramPost.url, { responseType: 'stream' }).then(response => {
                    response.data.pipe(res);
                });
                break;
            case 'facebook':
                const facebookVideo = await FacebookScraper(url);
                res.header('Content-Disposition', `attachment; filename="${facebookVideo.title}.mp4"`);
                axios.get(facebookVideo.url, { responseType: 'stream' }).then(response => {
                    response.data.pipe(res);
                });
                break;
            default:
                res.status(400).send('Unsupported platform');
        }
    } catch (error) {
        res.status(500).send('Error downloading video');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});