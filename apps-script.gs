// ═══════════════════════════════════════════════════════════
//   MK SHOP – Google Apps Script
//   Paste this entire file into your Google Apps Script editor
//   Then deploy as a Web App (Anyone can access)
// ═══════════════════════════════════════════════════════════

const SHEET_ID  = '1ybeYgQE238B7eZOv8uiuNIKbXPu7GDP-jEOBGvI1keY';
const SHEET_TAB = 'Sheet1'; // Change if your tab has a different name

function doPost(e) {
  try {
    const data   = JSON.parse(e.postData.contents);
    const action = data.action;

    if (action === 'addProduct') {
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB);
      // Row order: Name, Price, OldPrice, Category, MediaURL, Badge, Description, Collection
      sheet.appendRow(data.row);
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'unknown_action' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle CORS preflight
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'MK Shop API ready' }))
    .setMimeType(ContentService.MimeType.JSON);
}
