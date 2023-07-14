require("dotenv/config");
module.exports = {
    log_dir: "./src/log",
    dbName: "SunflowerApp",
    invalid_dirs: [".git", ".vscode", "node_modules", "react_views"],
    valid_dirs: ["assets", "views", "public"],
    invalid_exts: [
        ".bat",
        ".env",
        ".htaccess",
        ".gitignore",
        // ".json",
        ".txt",
        ".md",
        ".tmp",
    ],
    registered_urls: {
        app: ["home", "search", "contracts", "login", "not_found", "user"],
    },
    invalid_files: [".htaccess", ".gitignore", ".npmrc", ".env", "Dockerfile"],
    secret: {
        access_token: "2dbf9507-1bd7-4ecf-9bb2-f4648dabe4f3",
        refresh_token: "ad3529e3-d60e-44e4-bfb6-e5279bf64ba8",
    },
};
