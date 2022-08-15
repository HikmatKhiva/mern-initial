const { Router } = require('express');
const Link = require('../modules/link');

const router = Router();

router.get('/:code', async (req, res) => {
    try {
        const link = await Link.findOne({ code: req.params.code });
        if (link) {
            link.clicks++
            await link.save()
            return res.redirect(link.from)
        }
        res.status(404).json('cannot find Link')
    } catch (e) {
        res.status(500).json({ message: "server went wrong " });
    }
})


module.exports = router