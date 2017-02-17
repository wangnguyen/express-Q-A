const express = require('express');
const router = express.Router();

// GET /questions
// get questions
router.get('/', (req, res) => {
    res.json({
        response: 'Getting all questions',
    });
})

// POST /questions
// create question
router.post('/', (req, res) => {
    res.json({
        response: 'Create questions',
        body: req.body,
    });
})

// GET /questions/:qID
// get question by ID
router.get('/:qID', (req, res) => {
    res.json({
        response: `Get question id: ${req.params.qID}`,
    });
})

// GET /questions/:qID/answers
// get answers by question
router.get('/:qID/answers', (req, res) => {
    res.json({
        response: `Get answers for question id: ${req.params.qID}`,
    })
})

// POST /questions/:qID/answers
// create the answer
router.post('/:qID/answers', (req, res) => {
    res.json({
        response: `Create answer for question id: ${req.params.qID}`,
        body: req.body,
    })
})

// PUT /questions/:qID/answers/:aID
// update the answer
router.put('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: `update answer id: ${req.params.aID} of question id: ${req.params.qID}`,
        body: req.body,
    })
})

// DELETE /questions/:qID/answers/:aID
// delete the answer
router.delete('/:qID/answers/:aID', (req, res) => {
    res.json({
        response: `delete answer id: ${req.params.aID} of question id: ${req.params.qID}`,
    })
})

// POST /questions/:qID/answers/:aID/vote-:dir
// vote the answer (vote-up || vote-down)
router.post('/:qID/answers/:aID/vote-:dir', (req, res, next) => {
    // just allow string 'up' or 'down'
    if(req.params.dir.search(/^(up|down)$/) === -1) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    } else {
        next();
    }
}, (req, res) => {
    res.json({
        response: `Vote ${req.params.dir} answer id: ${req.params.aID} of question id: ${req.params.qID}`,
    })
})

module.exports = router;