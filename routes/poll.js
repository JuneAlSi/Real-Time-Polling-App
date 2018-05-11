const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Vote = require('../models/Vote')

const Pusher = require('pusher')

const pusher = new Pusher({
  appId: '524037',
  key: '145a71ef5c0836604ae5',
  secret: 'e045c3c17fc0ea5bfb54',
  cluster: 'ap1',
  encrypted: true
});

router.get('/', (req, res) => {
  Vote.find().then(votes => res.json({
    success: true,
    votes: votes
  }))
})

router.post('/', (req, res) => {
  const newVote = {
    backend: req.body.backend,
    points: 1
  }

  new Vote(newVote).save().then(vote => {
    pusher.trigger('backend-poll', 'backend-vote', {
      points: parseInt(vote.points),
      backend: vote.backend
    });

    return res.json({
      success: true,
      message: 'Thank you for voting.'
    })
  });
});

module.exports = router;