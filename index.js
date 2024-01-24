const http = require('http');
const member = require('./member.js');
const user = require('./users.js');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json'); // Corrected content type

  const url = req.url;

  if (url === '/about') {
    res.write(
      JSON.stringify({
        status: 'success',
        Message: 'response success',
        Description: 'Exercise #03',
        Date: '2024-24-01T07:51:09+08:00',
        Data: member.getMembers(),
      })
    );
  } else if (url === '/users') {
    res.write(JSON.stringify(user.users));
  } else {
    res.end('This is the home page');
    return; // Exit the function early to avoid calling res.end() again below
  }

  res.end(); // Move res.end() here to avoid calling it multiple times
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
