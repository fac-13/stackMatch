/* eslint no-var: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
/* eslint wrap-iife: 0 */

var openModalBtn = document.querySelectorAll('.btn-open-modal');
var closeModalBtn = document.querySelectorAll('.btn-close-modal');
var modalIsOpen = document.querySelectorAll('.modal');
var modalDetails = document.getElementById('modal-details');
var modalStack = document.getElementById('modal-stack');
var modalJob = document.getElementById('modal-job');
var modalDelete = document.getElementById('modal-delete');
var deleteConfirmInput = document.querySelector('#delete_account_input');
var deleteBtn = document.querySelector('#delete-account-btn');

var stackAddBtn = document.querySelector('#stack__addbutton');
var stack__list = document.querySelector('#stack__list');
var stack__input = document.querySelector('#stack__input');
var stackValidation = document.querySelector('#stack__validation');

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
    case 'stack':
      modalStack.style.display = 'block';
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


// TECH STACK FUNCTIONS
function checkTechDuplicates() {
  var liArr = [];
  var listIds = document.querySelectorAll('#stack__list li[id]');
  for (var i = 0; i < listIds.length; i++) {
    liArr.push(listIds[i].id);
  }
  return liArr;
}

function removeLi(liId) {
  liId.remove();
}

stackAddBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();

  var listOfTech = checkTechDuplicates();

  var tech = stack__input.value;
  if (!tech) {
    return;
  }
  if (!listOfTech.includes(tech)) {
    var techString =
    stackValidation.classList.add('is-hidden');
    stack__list.insertAdjacentHTML('beforeend', `<li id="${tech}">
    <label for="tech" class="sg-title">
      <input type="hidden" name="tech" value="${tech}">
    </label>
    <div>${tech}</div>
    <button class="stack__removebutton" type="button" id="${tech}-btn">Remove</button>
  </li>`);
    var newLiId = document.getElementById(tech);
    var newLiBtn = document.getElementById(`${tech}-btn`);
    newLiBtn.addEventListener('click', (e) => {
      e.preventDefault;
      removeLi(newLiId);
    });
  } else {
    stackValidation.classList.remove('is-hidden');
  }
});
