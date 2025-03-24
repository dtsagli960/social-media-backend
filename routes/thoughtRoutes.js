const express = require('express');
const router = express.Router();
const { 
    getThoughts, 
    getThoughtById, 
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    removeReaction 
} = require('../controllers/thoughtController'); 

router.get('/', getThoughts);

router.get('/:thoughtId', getThoughtById);

router.post('/', createThought);

router.put('/:thoughtId', updateThought);

router.delete('/:thoughtId', deleteThought);

router.post('/:thoughtId/reactions', addReaction);

router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
