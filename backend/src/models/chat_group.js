module.exports = mongoose => {
  const Schema = mongoose.Schema;

  const messageSchema = new Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    seenBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    text: {
      type: String
    },
    createdAt: Number
  });

  const chatGroupSchema = new Schema({
    name: {
      type: String
    },
    participiants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
    ],
    messages: [messageSchema]
  });
  
  mongoose.model('ChatGroup', chatGroupSchema);
};
