const mongoose = require('mongoose');
require('./../../src/services/mongoose');
require('./../../src/models/user')(mongoose);
require('./../../src/models/chat_group')(mongoose);

const ChatGroup = mongoose.model('ChatGroup');
const User = mongoose.model('User');

describe('Chat group', () => {
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

  it('description', async () => {
    const instance = await new ChatGroup({
      name: 'chat'

    });
    instance.participiants.push(user)
    await instance.save()
    console.log(instance);

    instance.messages.push({
      sender: user,
      seenBy:[user],
      text: 'ele',
      createdAt: Date.now()
    })
    
    await instance.save()
    console.log(instance.messages)
    const g = await ChatGroup.findOne({})

    console.log(g.messages)
  });
});
