const { Router } = require('express');
const User = require('../controllers/user');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();


router.get('/all', User.findAll);

router.get('/', authMiddleware, User.findOne);

router.post('/signup', User.signup);

router.post('/dup', User.dupCheck);

router.patch('/nickname', authMiddleware, User.nicknameUpdate);

router.delete('/:userId', User.deleteUser);


router.post('/login', User.localSign);

router.get('/kakao/callback', User.kakaoSign);

router.get('/signout/:refreshToken', User.signout);


module.exports = router;