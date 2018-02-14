export function wordCount(string) {
  return string ?
    (string.replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g) || []).length :
    0;
}

export function charCount(string) {
  return string ?
    string.replace(/\s/g, '').length :
    0;
}
