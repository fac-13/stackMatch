/* eslint no-var: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
/* eslint wrap-iife: 0 */

function clientRequest(method, url, body, callback) {
  var xhr = new XMLHttpRequest();
  if (method.toLowerCase() !== 'delete') {
    xhr.addEventListener('load', function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(JSON.parse(xhr.responseText));
      } else {
        console.log('XHR error', xhr.status);
      }
    });
  }
  xhr.open(method, url, true);
  xhr.send(body);
}
