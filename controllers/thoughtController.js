const mongoose = require('mongoose'); 
const Thought = require('../models/Thought');
const User = require('../models/User');


const getThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching thoughts', error });
    }
};


const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching thought', error });
    }
};


const createThought = async (req, res) => {
    try {
        const thought = await Thought.create(req.body);

        const user = await User.findByIdAndUpdate(
          req.body.userId, 
          { $push: { thoughts: thought._id } },
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

        res.status(201).json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error creating thought', error });
    }
};


const updateThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error updating thought', error });
    }
};


const deleteThought = async (req, res) => {
  try {
      
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
          return res.status(404).json({ message: 'No thought found with this ID' });
      }

      
      await User.findByIdAndUpdate(
          thought.userId, 
          { $pull: { thoughts: thought._id } },
          { new: true }
      );

      
      await Thought.findByIdAndDelete(req.params.thoughtId);

      res.json({ message: 'Thought deleted successfully and removed from user' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting thought', error });
  }
};



const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: 'Error adding reaction', error });
    }
};


const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this ID' });
        }
        res.json({message: 'Reaction deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error removing reaction', error });
    }
};

module.exports = { 
    getThoughts, 
    getThoughtById, 
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    removeReaction 
};
