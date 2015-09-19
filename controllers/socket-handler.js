/**
 * Created by Akari on 19/09/2015.
 */
/**
 * Socket.io handler
 */
var io = require('socket.io').listen(server);
var users = [];

io.on('connect', function (socket) {
    users.push(socket);
    var username = 'Anon-' +  (users.indexOf(socket) + 1);
    socket.emit('accept-connection', {username: username});
    socket.on('disconnect', function (socket) {
        delete users[users.indexOf(socket)];
    });
    socket.on('send-msg', function (socket) {
        io.sockets.emit('send-msg', {data: socket.data});
    });
});
