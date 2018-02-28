import * as chat from '../actions/chat';

export const dummy = '';

export const writeMessage = msg => {
  return { type: chat.SEND_CHAT_MESSAGE, payload: msg };
};
