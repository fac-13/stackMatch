/* eslint no-var: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
/* eslint no-undef: 0 */

var signupButton = document.getElementById('js-signup');

signupButton.addEventListener('click', function (e) {
  e.preventDefault();
  clientRequest('GET', '/signup', null, function (response) {
    console.log(response);
  });
});

