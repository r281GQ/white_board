const mongoose = require('mongoose');

const ChatGroup = mongoose.model('ChatGroup');

const writeMessage = async ({ message, group }) => {
  return await ChatGroup.findOneAndUpdate(
    { _id: group },
    { $push: { messages: message } },
    { new: true }
  );
};

const seenBy = async ({ message, user, chatGroup }) => {
  return await ChatGroup.findOneAndUpdate(
    { _id: chatGroup, 'messages._id': message },
    { $push: { 'messages.$.seenBy': user } },
    { new: true }
  );
};

const getMessages = async (group) => {
  return await ChatGroup.find({_id: group});
}

module.exports = { writeMessage, seenBy, getMessages };
