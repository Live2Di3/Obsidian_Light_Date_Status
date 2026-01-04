const { Plugin, TFile } = require('obsidian');

module.exports = class LightDateStatus extends Plugin {
    async onload() {
        const statusBarItemEl = this.addStatusBarItem();
        statusBarItemEl.addClass("mod-quiet");

        const updateStatus = (file) => {
            if (file instanceof TFile && file.extension === "md") {
                
                // Fonction de formatage locale (Française, 24h, avec année)
                const format = (date) => {
                    return date.toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                };
                
                const created = format(new Date(file.stat.ctime));
                const modified = format(new Date(file.stat.mtime));

                statusBarItemEl.setText(`Date de création : 📅 ${created}  |  Date de modification : 📝 ${modified}`);
            } else {
                statusBarItemEl.setText("");
            }
        };

        this.registerEvent(this.app.workspace.on("file-open", updateStatus));
        this.registerEvent(this.app.vault.on("modify", updateStatus));
    }
};
