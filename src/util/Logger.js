const fs = require("fs");
const logFilePath = "./logs/latest";
require("colors");

function Info(text) {
    console.log(text.white);
    writeFile(logFilePath, text+"\n");
}
function Success(text) {
    console.log(text.brightGreen);
    writeFile(logFilePath, text+"\n");
}
function Warning(text) {
    console.log(text.yellow);
    writeFile(logFilePath, text+"\n");
}
function Error(text) {
    console.log(text.brightRed);
    writeFile(logFilePath, text+"\n");
}

exports.Info = Info;
exports.Success = Success;
exports.Warning = Warning;
exports.Error = Error;

function writeFile(path, content) {
    var newContent = content;

    try {
        if (fs.existsSync(logFilePath)) {
            fs.readFile(path, 'utf-8', (err, data) => {
                if(err) return Error(err);
                newContent = data + content;
            });
        }
    } catch(err) { Logger.Error(err) }

    fs.writeFile(path, newContent, function(err) {
        if(err) return Error(err);
    });
}
