# 基于 Socket.io 的 room 实现群聊

群聊功能主要是基于 socket.io 的 room 实现的，可以把 client socket 加入某个 room，然后向这个 room 发消息。这样，发消息的时候带上昵称、群聊名等内容，就可以往指定群聊发消息了。

更完善的聊天室，会带上 userId、groupId 等，然后可以根据这俩 id 查询更详细的信息，但只是消息格式更复杂一些，原理都是 room。

🌰：
public/chatroom.html
src\socket-chatroom
http://localhost:3000/static/chatroom.html

使用：
打开多个相同的页面，输入房间号，相同房间号的用户可以互相发送消息，会继续打印在控制台
