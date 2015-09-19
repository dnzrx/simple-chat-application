/**
 * Created by Akari on 19/09/2015.
 */
var io = io.connect();
var username = '';

io.on('accept-connection', function (msg) {
    alert('Your Username: "' + msg.username + '"');
    username = msg.username;
});

io.on('send-msg', function (msg) {
    var data = msg.data;
    var sender = data.sender;
    var time = data.time;
    var msg = '<p>' + data.msg + '</p>';
    if (sender === username) {
        var span = '<span class="chat-img pull-right"><img src="images/default-user-image.png" height="50" width="50" class="img-circle"/></span>';
        var small = '<small class="text-muted"><span class="glyphicon glyphicon-time"></span>' + time + '</small>';
        sender = '<strong class="pull-right primary-font">' + data.sender + '</strong>';
        var header = '<div class="header">' + small + sender + '</div>';
        var chatBody = '<div class="chat-body clearfix">' + header + msg + '</div>';
        var li = '<li class="right clearfix">' + span + chatBody + '</li>';
        $('.chat').append(li);
    } else {
        var span = '<span class="chat-img pull-left"><img src="images/default-user-image.png" height="50" width="50" class="img-circle"/></span>';
        var small = '<small class="pull-right text-muted"><span class="glyphicon glyphicon-time"></span>' + time + '</small>';
        sender = '<strong class="primary-font">' + data.sender + '</strong>';
        var header = '<div class="header">' + sender + small + '</div>';
        var chatBody = '<div class="chat-body clearfix">' + header + msg + '</div>';
        var li = '<li class="left clearfix">' + span + chatBody + '</li>';
        $('.chat').append(li);
    }
    $('.panel-body').scrollTop($('.panel-body')[0].scrollHeight);
});

$(function () {
    $('#btn-chat').click(function () {
        var d = new Date();
        var msg = $.trim($('#txt-msg').val());
        $('#txt-msg').val('');
        $('#txt-msg').focus();
        var a_p = "";
        var curr_hour = d.getHours();
        if (curr_hour < 12) {
            a_p = "AM";
        }
        else {
            a_p = "PM";
        }
        if (curr_hour == 0) {
            curr_hour = 12;
        }
        if (curr_hour > 12) {
            curr_hour = curr_hour - 12;
        }
        var curr_min = d.getMinutes();
        curr_min = curr_min + "";
        if (curr_min.length == 1) {
            curr_min = "0" + curr_min;
        }
        var time = curr_hour + " : " + curr_min + " " + a_p;
        if (msg.length == 0) {
            //alert
            return;
        }
        var data = {
            sender: username,
            msg: msg,
            time: time
        };
        io.emit('send-msg', {data: data});
    });
});