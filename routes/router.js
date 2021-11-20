const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/:where/:type', (req, res) => {
    console.log(req.originalUrl)
    res.render(`${req.params.where}/${req.params.type}`);
})


module.exports = router;