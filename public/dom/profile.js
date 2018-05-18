/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
var modalStack = document.getElementById('modal-stack');
var deleteConfirmInput = document.querySelector('#delete_account_input');
var deleteBtn = document.querySelector('#delete-account-btn');

var stackAddBtn = document.querySelector('#stack__addbutton');
var stack__list = document.querySelector('#stack__list');
var stack__input = document.querySelector('#stack__input');
var stackValidation = document.querySelector('#stack__validation');

function closeModal() {
  modalIsOpen.forEach(function (modal) {
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
    case 'stack':
      modalStack.style.display = 'block';
      break;
    default:
      break;
  }
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

openModalBtn.forEach(function (btn) {
  return btn.addEventListener('click', function (e) {
    openModal(e.target.value);
  });
});
closeModalBtn.forEach(function (btn) {
  return btn.addEventListener('click', function (e) {
    closeModal();
  });
});

// validation

// delete profile validation
deleteConfirmInput.addEventListener('keyup', function (e) {
  var userGithubHandle = e.target.dataset.githubhandle;
  var confirmGithubHandle = e.target.value;
  deleteBtn.disabled = confirmGithubHandle !== userGithubHandle;
});

// delete button delete request
deleteBtn.addEventListener('click', function (e) {
  e.preventDefault();
  var xhr = new XMLHttpRequest();
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

function removeTech(liId) {
  document.getElementById(liId).remove();
}

stackAddBtn.addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();

  var listOfTech = checkTechDuplicates();

  var tech = stack__input.value;
  if (!tech) {
    return;
  }
  if (!listOfTech.includes(tech)) {
    var techString = stackValidation.classList.add('is-hidden');
    stack__list.insertAdjacentHTML('beforeend', '<li id="' + tech + '">\n    <label for="tech" class="sg-title">\n    <input type="hidden" name="tech" value="' + tech + '">\n    </label>\n    <span class="sg-node"><button class="sg-node-remove" type="button" id="' + tech + '-btn">x</button>' + tech + '</span>\n    </li>');
    var newLiId = document.getElementById(tech);
    var newLiBtn = document.getElementById(tech + '-btn');
    newLiBtn.addEventListener('click', function (e) {
      e.preventDefault;
      newLiId.remove();
    });
  } else {
    stackValidation.classList.remove('is-hidden');
  }
});

/***/ })

/******/ });