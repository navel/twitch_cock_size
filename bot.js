require('dotenv').config();
const tmi = require('tmi.js');
console.log(process.env.BOT_USERNAME);
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.BOT_USERNAME,
  ]
};

const client = new tmi.client(opts);
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();

function onMessageHandler (target, context, msg, self) {
  if (self) { return; }

  const commandName = msg.trim();

  if (commandName === '!penis' || commandName === '!cocksize' || commandName === 'cocksize' || commandName === '@cocksize' ) {
    const num = rollDick(context.username);
    client.say(target, `@${context.username} cock size is ${num}cm`);
    console.log(commandName, context.username, num);
  } else if (commandName === 'balls' || commandName === '!balls') {
    const type = rollBalls(context.username);
    client.say(target, `@${context.username} has ${type} balls `);
    console.log(commandName, context.username, type);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

function rollDick (username) {
  return dailyHashRandom(1, 35, username + 'dick');
}

function rollBalls (username) {
  const ballsTypes = ['leather', 'golden', 'huge', 'delicious', 'steel', 'stinky', 'hairy', 'no'];
  const number = dailyHashRandom(0, 7, username + 'balls')
  return ballsTypes[number];
}

function dailyHashRandom(from, to, prefix) {
  const date_ob = new Date();
  const date = (date_ob.getFullYear() + ("0" + (date_ob.getMonth() + 1)).slice(-2) + ("0" + date_ob.getDate()).slice(-2));
  const crypto = require('crypto');
  const hash = crypto.createHash('md5').update(prefix + date).digest('hex');
  return stringSum(hash) % (to - from + 1) + from;
}

function stringSum(str) {
  let sum = 0;
  for (let i = 0, ch; i < str.length; i++) {
    sum += str.charCodeAt(i);
  }
  return sum
}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
