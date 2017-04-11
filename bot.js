const Discord = require("discord.js");
const Reload = require("self-reload-json");
const console = require("console");
const nodeliquidsoap = require("liquidsoap");

const prefix = ';';
const token = "Mjg5NTY3ODk0ODI2Nzc4NjI1.C6ORkg.j-kbV3kvSum1D5wkmwPv8nZQnk0";

var adminList = new Reload("./data/admins.json");
var bot = new Discord.Client();


bot.login(token);

bot.on("message", msg => {
    if (msg.content.startsWith(prefix + "userinfo")) {
        let args = processArgs(msg.content);
        msg.channel.sendMessage(
            "Role ID: " + msg.member.highestRole.id +
            "\nUser ID: " + msg.member.id +
            "\nUser Name: " + msg.member.username + "#" + msg.member.discriminator +
            "\nIs Admin: " + checkPermissions(msg.member.username));
        console.log("userinfo done by: " + msg.member.username + "#" + msg.member.discriminator +
            ", args: " + args);
    } else if (msg.content.startsWith(prefix + "off") && checkPermissions(msg.author.username)) {
        msg.channel.sendMessage("Shutting Down...");
        bot.destroy();
    } else if (msg.content.startsWith(prefix + "listadmins")) {
        for (var value in adminList) {
            msg.channel.sendMessage(value);
        }
    } else if (msg.content.startsWith(prefix + "checkadmin")) {
        msg.channel.sendMessage(checkPermissions(msg.author.username))
    } else if (msg.content.startsWith(prefix + "reboot") && checkPermissions(msg.author.username)) {
        reboot()
    }
});
setInterval(update, 10000);

function update() {

}

function reboot() {
    bot.destroy();
    bot.login(token);
}

function checkPermissions(userInput) {
    for (var value in adminList) {
        if (userInput == value) {
            return true;
            break;
        } else {
            return false;
        }
    }
}

function processArgs(args) {
    args = args.split(";");
    return args;
}
