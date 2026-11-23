/**
 * Google Apps Script — Penerima RSVP Langsung ke Google Sheets (Tanpa Backend)
 *
 * CARA PASANG (5 langkah):
 * 1. Buat Google Sheet baru di Google Drive Anda.
 * 2. Klik menu: Extensions -> Apps Script.
 * 3. Hapus kode bawaan, lalu tempel seluruh kode file ini dan klik Save.
 * 4. Klik Deploy -> New deployment -> pilih jenis "Web app":
 *    - Execute as: Me (akun Google Anda)
 *    - Who has access: Anyone
 *    Klik Deploy -> salin URL Web App (berakhiran /exec).
 * 5. Buat file `.env` di root project (salin dari `.env.example`), lalu isi:
 *    VITE_GOOGLE_SHEET_RSVP_URL=https://script.google.com/macros/s/XXXX/exec
 *    Restart `npm run dev` agar perubahan `.env` terbaca.
 */

var SHEET_NAME = 'RSVP';
var MAX_GUESTS = 5;

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ status: 'error', message: 'Payload kosong.' });
    }

    var body = JSON.parse(e.postData.contents);
    var guestName = String(body.guestName || '').trim();
    var attendance = String(body.attendance || '').trim();
    var guestCount = Number(body.guestCount || 0);
    var message = String(body.message || '').trim();

    if (guestName.length < 2 || guestName.length > 100) {
      return jsonResponse({
        status: 'error',
        code: 'VALIDATION_ERROR',
        message: 'Nama tamu harus 2-100 karakter.',
      });
    }

    if (attendance !== 'attending' && attendance !== 'not_attending') {
      return jsonResponse({
        status: 'error',
        code: 'VALIDATION_ERROR',
        message: 'Status kehadiran tidak valid.',
      });
    }

    if (attendance === 'attending') {
      if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > MAX_GUESTS) {
        return jsonResponse({
          status: 'error',
          code: 'VALIDATION_ERROR',
          message: 'Jumlah tamu harus antara 1 sampai ' + MAX_GUESTS + '.',
        });
      }
    } else {
      guestCount = 0;
    }

    if (message.length > 500) {
      return jsonResponse({
        status: 'error',
        code: 'VALIDATION_ERROR',
        message: 'Catatan maksimal 500 karakter.',
      });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow([
        'Waktu Kirim',
        'Nama Tamu',
        'Kehadiran',
        'Jumlah Tamu',
        'Catatan',
      ]);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    }

    var attendanceLabel = attendance === 'attending' ? 'Hadir' : 'Tidak Hadir';
    var timestamp = Utilities.formatDate(
      new Date(),
      'Asia/Jakarta',
      'yyyy-MM-dd HH:mm:ss'
    );

    sheet.appendRow([
      timestamp,
      sanitizeCell(guestName),
      attendanceLabel,
      guestCount,
      sanitizeCell(message),
    ]);

    return jsonResponse({
      status: 'ok',
      id: 'rsvp-' + Date.now(),
    });
  } catch (err) {
    return jsonResponse({
      status: 'error',
      message: 'Terjadi kendala saat menyimpan data RSVP.',
    });
  }
}

/**
 * Mencegah spreadsheet formula injection jika input diawali =, +, -, atau @
 */
function sanitizeCell(value) {
  if (!value) return '';
  if (/^[=+\-@]/.test(value)) {
    return "'" + value;
  }
  return value;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
