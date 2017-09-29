module.exports = mongoose => {
  const projectSchema = new mongoose.Schema({
    name: String,
    participiants: [],
    stickers: [stickerSchema],
    wall: wallSchema
  });

  //self reference mongodb best practice?
  const stickerSchema = new mongose.Schema({
    text: String,
    picture: String,
    video: String,
    gMapsCoords: {
      xCord: Number,
      yCord: Number
    },
    edgeList: [stickerSchema]
  });

  const postSchema = new mongoose.Schema({
      title: String,
      text: String,
      sender: {
        ref: 'User',
        type: mongoose.ObjectId
      },
      replies: [postSchema ]
  });

  const wallSchema = new mongoose.Schema({
    posts: [{
      postSchema
    }]
  });
};
