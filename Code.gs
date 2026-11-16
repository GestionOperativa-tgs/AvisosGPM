/**
 * Apps Script – Tablero de Avisos SAP-PM · O&M GPM
 * Pegar en Extensiones > Apps Script del Google Sheets "AVISOS GPM".
 * Implementar > Nueva implementación > Aplicación web
 *   Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario
 * Copiar la URL /exec en FUENTE.appsScriptUrl dentro de index.html.
 *
 * Lee la pestaña HOJA; si no existe, toma la primera pestaña del archivo.
 * Las fechas que Sheets haya convertido a fecha se envían como yyyy-MM-dd;
 * las que sigan como texto (dd.mm.aaaa, formato de bajada SAP) las interpreta el tablero.
 */
const HOJA = 'AVISOS';

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tz = ss.getSpreadsheetTimeZone();
  const sh = ss.getSheetByName(HOJA) || ss.getSheets()[0];
  const filas = sh.getDataRange().getValues()
    .filter((r, i) => i === 0 || r.some(c => c !== '' && c !== null))
    .map(r => r.map(c => c instanceof Date ? Utilities.formatDate(c, tz, 'yyyy-MM-dd') : c));
  const out = { AVISOS: filas, hoja: sh.getName(), generado: new Date().toISOString() };
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}
