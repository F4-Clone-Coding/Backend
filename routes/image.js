const { Router } = require('express');
const router = Router();
const ImagesController = require('../controllers/image');
const imagesController = new ImagesController();
const upload = require('../utils/multer');

router.post('/', upload.array('01', 500), imagesController.uploadImages);

module.exports = router;
