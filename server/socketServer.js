"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const uuid_1 = require("uuid");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const connected = [];
wss.on("connection", (socket) => {
    const s = socket;
    s.id = (0, uuid_1.v4)();
    connected.push(socket);
    console.log(`Client connected: ${s.id}`);
    socket.on("message", (message) => {
        console.log(`Received message from ${s.id}: ${message}`);
    });
});
wss.on("close", (socket) => {
    const s = socket;
    console.log(`Client disconnected: ${s.id}`);
});
