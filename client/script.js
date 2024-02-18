const { ipcRenderer } = require("electron");

console.log("Loading UCI Client...");

document.addEventListener("DOMContentLoaded", async () => {
    // ipcRenderer.send("get_customs");

    document.addEventListener("keyup", (e) => {
        
        
        switch (e.key) {

            // lobby switch
            case "F4": 
                window.location.href = "https://krunker.io/";
                break;
        };
    
    });
});

ipcRenderer.on("customs", (a0, user_customs = {
    userscripts: {},
    userstyles: {}
}) => {
    let scripts = user_customs["userscripts"];
    let styles = user_customs["userstyles"];
    
    let scripts_object = Object.keys(scripts);
    let styles_object = Object.keys(styles);
    
    // scripts
    for (let i = 0; i < scripts_object.length; i++) {
        let script_name = scripts_object[i];
        let script_content = scripts[script_name];

        let s = document.createElement("script");
        s.id = "uci_" + script_name;
        s.textContent = script_content;

        document.head.appendChild(s);
    };

    // styles
    for (let i = 0; i < styles_object.length; i++) {
        let style_name = styles_object[i];
        let style_content = styles[style_name];

        let s = document.createElement("style");
        s.id = "uci_" + style_name;
        s.textContent = style_content;

        document.head.appendChild(s);
    };
});