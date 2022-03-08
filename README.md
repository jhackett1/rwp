# rwp

A tiny WP plugin.

It gives you a shortcode `[rwp-postcode-lookup-form]`, which spits out the HTML of a form and enqueues the JavaScript.

## Developing

You need node.js installed.

1. Run `npm i` and `npm run build`
2. Delete the `node_modules`, `src` and `.parcel-cache` directories, which aren't needed once built.
3. Compress the whole directory, upload it to a WP site and activate it.

## Google app script

It relies on a simple app script to process webhook requests and add new rows to a google sheet:

```
function doPost(e) {
  const newVals = Object.values(JSON.parse(e.postData.contents))
  newVals.push(new Date().toLocaleString())
  const spreadsheet =  SpreadsheetApp.openByUrl(YOUR_SHEET_URL_HERE")
  const sheet = spreadsheet.getSheets()[0]
  const lastRow = sheet.getLastRow()
  sheet.getRange(lastRow + 1, 1, 1, newVals.length).setValues([newVals])
}
```
