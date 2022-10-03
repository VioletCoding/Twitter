module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ["@babel/plugin-transform-flow-strip-types"],
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ["module-resolver", {
                "alias": {
                    "@Components": "./components",
                    "@Pages": "./pages",
                    "@Styles": "./styles",
                    "@Assets": "./assets",
                    "@Network": "./network",
                    "@Utils": "./utils",
                    "@Storage": "./storage"
                },
                "extensions": [
                    ".js",
                    ".jsx",
                    ".ts",
                    ".tsx",
                    ".jpg",
                    ".png"
                ]
            }],
        ]
    }
}
