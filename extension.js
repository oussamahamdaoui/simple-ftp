// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const Client = require('ftp');
const fs = require('fs');



let host = "";
let port = 21;
let user = "";
let password = "";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.upload', function () {
        let filePath = vscode.window.activeTextEditor.document.fileName;
        const fileNameServer = vscode.window.showInputBox({
            prompt: "filename or path on the server",
            ignoreFocusOut: true
        }).then((res) => {
            if (res) {
                let c = new Client();
                console.log(res)

                c.connect({
                    host: host,
                    port: port,
                    user: user,
                    password: password

                });
                c.on('ready', function () {
                    c.put(filePath, res, function (err) {
                        if (err) throw err;
                        c.end();
                    });
                });
            }
        })
    });

    let disposable2 = vscode.commands.registerCommand('extension.connect', function () {

        vscode.window.showInputBox({
            prompt: "host name",
            ignoreFocusOut: true
        }).then((res) => {
            if (res) {
                host = res;
            }
            vscode.window.showInputBox({
                prompt: "port",
                ignoreFocusOut: true
            }).then((res) => {
                if (res) {
                    port = parseInt(res);

                    vscode.window.showInputBox({
                        prompt: "username name",
                        ignoreFocusOut: true
                    }).then((res) => {
                        if (res) {
                            user = res;
                            vscode.window.showInputBox({
                                prompt: "Password",
                                ignoreFocusOut: true
                            }).then((res) => {
                                if (res) {
                                    password = res;
                                }
                            });
                        }
                    });
                }
            
            });
        })



    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(disposable2);

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;