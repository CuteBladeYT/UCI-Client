const fs = require("fs");

document.addEventListener("DOMContentLoaded", async () => {
    await load_user_customs();

    document.addEventListener("keyup", (e) => {
        
        
        switch (e.key) {

            // lobby switch
            case "F4": 
                window.location.href = "https://krunker.io/";
                break;
        };
    
    });
});

async function load_user_customs() {
    let user_customs = {
        userscripts: {},
        userstyles: {}
    };

    for (let i = 0; i < 2; i++) {
        let files_path = ["userscripts","userstyles"][i];

        let files = await fs.readdirSync(files_path);
        
        for (j = 0; j < files.length; j++) {
            let file_name = files[j];

            let file_content = await fs.readFileSync(`${files_path}/${file_name}`, {encoding:"utf-8"});

            user_customs[files_path][file_name] = file_content;
        };
    };
    

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
};