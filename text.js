/*
  Text plugin
*/
exports.translate = function(load) {
  var text = load.source
    .replace(/(["\\])/g, '\\$1')
    .replace(/[\f]/g, "\\f")
    .replace(/[\b]/g, "\\b")
    .replace(/[\n]/g, "\\n")
    .replace(/[\t]/g, "\\t")
    .replace(/[\r]/g, "\\r")
    .replace(/[\u2028]/g, "\\u2028")
    .replace(/[\u2029]/g, "\\u2029");

  if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
    load.metadata.format = 'amd';
    return 'def' + 'ine(function() {\nreturn "' + text + '";\n});';
  }

  if (typeof module !== "undefined" && module.exports && typeof require === "function") {
    load.metadata.format = 'cjs';
    return 'module.exports = "' + text + '";';
  }

  load.metadata.format = 'esm';
  return 'export default "' + text + '";';
}