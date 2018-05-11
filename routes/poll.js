const express = require('express')
const router = express.Router()

const Pusher = require('pusher')

const pusher = new Pusher({
  appId: '524037',
  key: '145a71ef5c0836604ae5',
  secret: 'e045c3c17fc0ea5bfb54',
  cluster: 'ap1',
  encrypted: true
});

router.get('/', (req, res) => {
  res.send('POLL')
})

router.post('/', (req, res) => {
  pusher.trigger('backend-poll', 'backend-vote', {
    points: 1,
    backend: req.body.backend
  });

  return res.json({
    success: true,
    message: 'Thank you for voting.'
  })
});

module.exports = router;