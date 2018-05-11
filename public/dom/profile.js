/* eslint no-var: 0 */
/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
/* eslint wrap-iife: 0 */

// modal functionality courtesy of team pett-y - https://github.com/fac-13/pett-y

var openDetailsBtn = document.getElementById('open-modal-details');
var modalDetails = document.getElementById('modal-details');
var modalProjects = document.getElementById('modal-projects');
var modalJobs = document.getElementById('modal-jobs');


function closeModal() {
  modalDetails.style.display = 'none';
  // modalProjects.style.display = 'none';
  // modalJobs.style.display = 'none';
}

function openModal(modalName) {
  modalName.style.display = 'block';
  // document.getElementById('close-modal').addEventListener('click', closeModal);
  window.addEventListener('keydown', (event) => {
    if (event.key == 'Escape') closeModal();
  });
}


openDetailsBtn.addEventListener('click', () => { openModal(modalDetails); });
// openProjectsBtn.addEventListener('click', openModal);
// openJobsBtn.addEventListener('click', openModal);

document.getElementById('open-modal').addEventListener('keydown', (event) => {
  if (event.key == 'Enter') openModal();
});


// Modal does not close on click!!
window.addEventListener('click', (event) => {
  console.log(event.target);
  console.log('clicking');
  if (event.target !== document.getElementsByClassName('modal')) {
    closeModal();
  }
});
