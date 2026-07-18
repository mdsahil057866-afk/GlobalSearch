const Video = require('../models/Video');
const fs = require('fs');
const path = require('path');

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, category, isShort, duration, channelName } = req.body;
    let videoUrl = '';
    let thumbnailUrl = '';

    if (req.files && req.files['video']) {
      videoUrl = `/uploads/videos/${req.files['video'][0].filename}`;
    } else {
      return res.status(400).json({ error: 'Video file is required' });
    }

    if (req.files && req.files['thumbnail']) {
      thumbnailUrl = `/uploads/videos/thumbnails/${req.files['thumbnail'][0].filename}`;
    }

    const video = new Video({
      title,
      description,
      category,
      isShort: isShort === 'true',
      duration,
      channelName: channelName || 'GlobalSearch Creator',
      videoUrl,
      ...(thumbnailUrl && { thumbnailUrl }),
      // Using a dummy user id or the one from mockAuth if available
      channel: req.user ? req.user.id : null,
      views: 0
    });

    await video.save();
    res.status(201).json(video);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ error: 'Failed to upload video' });
  }
};

exports.streamVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).send('Video not found');
    }

    // Convert URL back to local path: /uploads/videos/filename -> public/uploads/videos/filename
    const videoPath = path.join(__dirname, '..', 'public', video.videoUrl);
    
    if (!fs.existsSync(videoPath)) {
      return res.status(404).send('Video file not found on server');
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if(start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
        return;
      }

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    console.error('Streaming error:', error);
    res.status(500).send('Server Error');
  }
};
