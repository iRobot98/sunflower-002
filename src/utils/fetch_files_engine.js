const fs = require("fs")
const { store, valid_asset_Files } = require("./fetch_files")


console.log(store,'\n',valid_asset_Files)

module.exports = {store, valid_asset_Files}