const fs = require("fs");
const path = require("path");
const Logger = require("../util/Logger");

module.exports = {
    name: 'message',
    run: async(message) => {
        fs.readFile("../../database/user-stats.json", function (err, data) {
            if(err) {
                Logger.Error(err);
                return;
            };
            var json = JSON.parse(data);
            var userId = message.author.id;

            if(userId) {
                if(json[userId] != null) {
                    if(json[userId.messages] != null) {
                        json[userId].messages++;
                    } else {
                        json[userId].messages=1;
                    }
                } else {
                    json.push(userId);
                    json[userId].messages=1;
                }
            }
        });
    }
}
