// ---- Paste this into Google Apps Script (Extensions > Apps Script) ----
// Then click Deploy > New deployment > Web app
// Set "Execute as" = Me, "Who has access" = Anyone
// Copy the deployment URL and put it in index.html

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  var timestamp = new Date().toISOString();
  var page = e.parameter.page || '/';
  var ua = e.parameter.ua || '';

  // Get visitor IP via external service
  var ip = '';
  try {
    ip = e.parameter.ip || '';
  } catch(err) {
    ip = 'unknown';
  }

  sheet.appendRow([timestamp, ip, page, ua]);

  // Return 1x1 transparent pixel
  return ContentService
    .createTextOutput('{"status":"ok","count":' + (sheet.getLastRow() - 1) + '}')
    .setMimeType(ContentService.MimeType.JSON);
}
