const Index = require("../../index");
const { TextChannel } = require("discord.js");
var client;

function SetClient(_client) {
    client = _client;
}

function UpdateStats() {
    client.channels.cache.get("885121886885924868").send(".");
}

exports.SetClient = SetClient;
exports.UpdateStats = UpdateStats;
