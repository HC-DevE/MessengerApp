const moment = require("moment");

function formatMessage(username, text, color) {
  //filter the message
  filteredText = filterMessage(text);
  return {
    username,
    text: filteredText,
    color,
    time: moment().format("h:mm a"),
  };
}

function formatFileMessage(username, data, fileName, color) {
  return {
    username,
    data,
    fileName,
    color,
    time: moment().format("h:mm a"),
  };
}

function filterMessage(msg) {
  const badWords = ["putain", "pute", "fuck", "bitch"]; //etc...
  return msg
    .split(" ")
    .map((word) => {
      if (badWords.includes(word.toLowerCase())) {
        return "*".repeat(word.length);
      } else {
        return word;
      }
    })
    .join(" ");
}

module.exports = { formatMessage, formatFileMessage };