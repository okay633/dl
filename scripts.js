document.getElementById('downloadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const videoURL = document.getElementById('videoURL').value;
    const platform = document.getElementById('platform').value;
    const resultDiv = document.getElementById('result');
    const noticeDiv = document.getElementById('notice');

    if (videoURL.trim() === '') {
        resultDiv.innerHTML = '<p style="color: red;">Please enter a video URL.</p>';
        return;
    }

    let downloadLink = '';

    switch(platform) {
        case 'youtube':
            downloadLink = `https://example.com/download?url=${encodeURIComponent(videoURL)}&format=mp4`;
            resultDiv.innerHTML = `<p>Downloading YouTube video: <a href="${downloadLink}" target="_blank">${videoURL}</a></p>`;
            break;
        case 'tiktok':
            downloadLink = `https://example.com/download?url=${encodeURIComponent(videoURL)}&platform=tiktok`;
            resultDiv.innerHTML = `<p>Downloading TikTok video or photo: <a href="${downloadLink}" target="_blank">${videoURL}</a></p>`;
            break;
        case 'instagram':
            downloadLink = `https://example.com/download?url=${encodeURIComponent(videoURL)}&platform=instagram`;
            resultDiv.innerHTML = `<p>Downloading Instagram video: <a href="${downloadLink}" target="_blank">${videoURL}</a></p>`;
            break;
        case 'facebook':
            downloadLink = `https://example.com/download?url=${encodeURIComponent(videoURL)}&platform=facebook`;
            resultDiv.innerHTML = `<p>Downloading Facebook video: <a href="${downloadLink}" target="_blank">${videoURL}</a></p>`;
            break;
        default:
            resultDiv.innerHTML = '<p style="color: red;">Invalid platform selected.</p>';
            break;
    }

    if (platform === 'facebook') {
        noticeDiv.innerHTML = `<p>Notice: If the Facebook video is private (not posted publicly), we are sorry but it's not supported right now. We respect your privacy, and downloading private videos would require logging into your Facebook account.</p>`;
    } else {
        noticeDiv.innerHTML = '';
    }
});