// ═══════════════════════════════════════════════════════════
//   MK SHOP – Google Apps Script
//   Paste this into Apps Script editor, deploy as Web App
//   Execute as: Me | Who has access: Anyone
// ═══════════════════════════════════════════════════════════

const SHEET_ID  = '1ybeYgQE238B7eZOv8uiuNIKbXPu7GDP-jEOBGvI1keY';
const SHEET_TAB = 'Sheet1'; // change if your tab name is different

// Handle POST — called by admin panel
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'addProduct') {
      appendRow(data.row);
      return respond({ status: 'ok' });
    }
    return respond({ status: 'unknown_action' });
  } catch(err) {
    return respond({ status: 'error', message: err.message });
  }
}

// Handle GET — used as CORS workaround (data passed as query param)
function doGet(e) {
  try {
    const action = e.parameter.action;
    if (action === 'addProduct') {
      const row = JSON.parse(decodeURIComponent(e.parameter.row));
      appendRow(row);
      return respond({ status: 'ok' });
    }
    return respond({ status: 'ready' });
  } catch(err) {
    return respond({ status: 'error', message: err.message });
  }
}

function appendRow(row) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB);
  sheet.appendRow(row);
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
