const mongoose = require('mongoose');
require('./../../src/services/mongoose');
require('./../../src/models/user')(mongoose);
require('./../../src/models/chat_group')(mongoose);
const {writeMessage, seenBy} = require('./../../src/services/chat_group');
const ChatGroup = mongoose.model('ChatGroup');
const User = mongoose.model('User');
describe('description', () => {
  let user;

  beforeEach(async () => {
    const userToCreate = new User({
      name: 'Endre',
      email: 'endre@mail.com',
      password: 'pass'
    });
    user = await userToCreate.save();
  });

  afterEach(async () => {
    await ChatGroup.remove({});
    await User.findOneAndRemove({});
  });

  it('description', async() => {
    const instance =  new ChatGroup({
      name: 'chat'

    });
    instance.participiants.push(user)
    await instance.save()


  


    const f = await writeMessage({message: {
      sender: user,
      text: 'ele',
      createdAt: Date.now()
    }, group: instance});

    const s = await seenBy({message: f.messages[0]._id, user: user,chatGroup: f._id});
    console.log(s);
  });

});
