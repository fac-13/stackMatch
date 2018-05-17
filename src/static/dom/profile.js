/* eslint no-var: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
/* eslint wrap-iife: 0 */

var openModalBtn = document.querySelectorAll('.btn-open-modal');
var closeModalBtn = document.querySelectorAll('.btn-close-modal');
var modalIsOpen = document.querySelectorAll('.modal');
var modalDetails = document.getElementById('modal-details');
var modalJob = document.getElementById('modal-job');
var modalDelete = document.getElementById('modal-delete');
var deleteConfirmInput = document.querySelector('#delete_account_input');
var deleteBtn = document.querySelector('#delete-account-btn');


function closeModal() {
  modalIsOpen.forEach((modal) => {
    modal.style.display = 'none';
  });
}

function openModal(profileSection) {
  // used switch case to allow for addition profile sections, ie projects section
  switch (profileSection) {
    case 'details':
      modalDetails.style.display = 'block';
      break;
    case 'job':
      modalJob.style.display = 'block';
      break;
    case 'delete':
      modalDelete.style.display = 'block';
      break;
    default:
      break;
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

openModalBtn.forEach(btn => btn.addEventListener('click', (e) => {
  openModal(e.target.value);
}));
closeModalBtn.forEach(btn => btn.addEventListener('click', (e) => {
  closeModal();
}));

// validation

// delete profile validation
deleteConfirmInput.addEventListener('keyup', (e) => {
  var userGithubHandle = e.target.dataset.githubhandle;
  var confirmGithubHandle = e.target.value;
  deleteBtn.disabled = confirmGithubHandle !== userGithubHandle;
});

// delete button delete request
deleteBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/deleteAccount');
  xhr.send();
  window.location.assign('/goodbye');
});


