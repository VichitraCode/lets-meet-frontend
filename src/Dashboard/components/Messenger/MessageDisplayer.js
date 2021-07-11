import store from '../../../store/store';
// Check messge is recived or sent
// on basis of this getRoghtMessage and getLeftMessage is called
export const appendMessage = (messag, right = false) => {
  const messagesContainer = document.getElementById("messages_container");
  const messageElement = right
    ? getRightMessage(messag)
    : getLeftMessage(messag);
  messagesContainer.appendChild(messageElement);
};

// will called when message is reciveved and will get render on the ledt side of message on container

const getLeftMessage = (messag) => {
  var name = store.getState().call.calleeUsername;

  if (name === '') {
    name = store.getState().call.callerUsername;

  }
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_left_container");
  const messageParagraph = document.createElement("p");
  const nameParagraph = document.createElement("div");
  messageParagraph.classList.add("message_left_paragraph");
  nameParagraph.classList.add("name_left_paragraph");
  messageParagraph.innerHTML = messag;
  nameParagraph.innerHTML = name;
  messageContainer.appendChild(messageParagraph);
  messageContainer.appendChild(nameParagraph);

  return messageContainer;
};
// will called when message is sent and will get render on te the right side if the screen
const getRightMessage = (messag) => {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("message_right_container");
  const messageParagraph = document.createElement("p");
  const nameParagraph = document.createElement("div");
  messageParagraph.classList.add("message_right_paragraph");
  nameParagraph.classList.add("name_right_paragraph");
  messageParagraph.innerHTML = messag;
  nameParagraph.innerHTML = 'You';
  messageContainer.appendChild(messageParagraph);
  messageContainer.appendChild(nameParagraph);


  return messageContainer;
};