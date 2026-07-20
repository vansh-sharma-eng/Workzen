/** Converts an array of flat objects into a downloaded CSV file.
 * @param {string} filename - without extension, e.g. "employees-2026-07-16"
 * @param {{ key: string, label: string }[]} columns
 * @param {object[]} rows
 */
export function exportToCsv(filename, columns, rows) {
  const escape = (value) => {
    const str = value === null || value === undefined ? "" : String(value);
    // Quote any field containing a comma, quote, or newline; double up internal quotes.
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const header = columns.map((c) => escape(c.label)).join(",");
  const lines = rows.map((row) => columns.map((c) => escape(row[c.key])).join(","));
  const csv = [header, ...lines].join("\r\n");

  // BOM so Excel opens UTF-8 (names with accents, etc.) correctly instead of mangling it.
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
