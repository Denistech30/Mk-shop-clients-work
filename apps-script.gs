// ═══════════════════════════════════════════════════════════
//   MK SHOP – Google Apps Script
//   Deploy as Web App: Execute as Me | Anyone can access
// ═══════════════════════════════════════════════════════════

const SHEET_ID  = '1ybeYgQE238B7eZOv8uiuNIKbXPu7GDP-jEOBGvI1keY';
const SHEET_TAB = 'Sheet1';

function doGet(e) {
  const action = e.parameter.action;

  if (action === 'getProducts') {
    return respond(getProducts());
  }

  if (action === 'addProduct') {
    const row = JSON.parse(e.parameter.row);
    addProduct(row);
    return respond({ status: 'ok' });
  }

  if (action === 'deleteProduct') {
    const rowIndex = parseInt(e.parameter.rowIndex);
    deleteProduct(rowIndex);
    return respond({ status: 'ok' });
  }

  if (action === 'updateProduct') {
    const rowIndex = parseInt(e.parameter.rowIndex);
    const row = JSON.parse(e.parameter.row);
    updateProduct(rowIndex, row);
    return respond({ status: 'ok' });
  }

  return respond({ status: 'ready', message: 'MK Shop API' });
}

// Also handle POST for compatibility
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === 'addProduct') { addProduct(data.row); return respond({ status: 'ok' }); }
    if (data.action === 'deleteProduct') { deleteProduct(parseInt(data.rowIndex)); return respond({ status: 'ok' }); }
    if (data.action === 'updateProduct') { updateProduct(parseInt(data.rowIndex), data.row); return respond({ status: 'ok' }); }
    return respond({ status: 'unknown' });
  } catch(err) {
    return respond({ status: 'error', message: err.message });
  }
}

// ── Sheet operations ──────────────────────────────────────
function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_TAB);
}

function getProducts() {
  const sheet = getSheet();
  const data  = sheet.getDataRange().getValues();
  if (data.length < 2) return { status: 'ok', products: [] };

  const headers = data[0].map(h => String(h).trim().toLowerCase());
  const products = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    // Skip completely empty rows
    if (row.every(cell => cell === '' || cell === null)) continue;
    const obj = { _rowIndex: i + 1 }; // 1-based sheet row
    headers.forEach((h, idx) => { obj[h] = row[idx]; });
    products.push(obj);
  }

  return { status: 'ok', products };
}

function addProduct(row) {
  const sheet = getSheet();
  // If sheet is empty (no header row), write headers first
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Name','Price','OldPrice','Category','MediaURL','Badge','Description',
      'Subtitle','SalePercent','Stat1Num','Stat1Label','Stat2Num','Stat2Label',
      'Stat3Num','Stat3Label','Card1Title','Card1Text','Card2Title','Card2Text',
      'Collection','image2','image3','image4'
    ]);
  }
  sheet.appendRow(row);
}

function deleteProduct(rowIndex) {
  getSheet().deleteRow(rowIndex);
}

function updateProduct(rowIndex, row) {
  const sheet = getSheet();
  row.forEach((val, idx) => {
    sheet.getRange(rowIndex, idx + 1).setValue(val);
  });
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
