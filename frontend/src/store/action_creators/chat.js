import * as chat from '../actions/chat';

export const f = '';

export const writeMessage = msg => {
  return { type: 'SEND_CHAT_MESSAGE', payload: msg };
};
