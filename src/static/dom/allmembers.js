/* eslint wrap-iife: 0 */

const allUsers = document.getElementsByClassName('profile__card');
const allUserIds = Array.from(allUsers).map(card => card.id);
console.log('this is allUsers', allUsers);
console.log('this is allUsersids', allUserIds);

allUserIds.forEach((cardId) => {
  const userCard = document.getElementById(cardId);
  userCard.addEventListener('click', (e) => {
    // currently directing to profile page when you click their gitter link (needs fixing)
    e.stopPropagation();
    window.location.assign(`/myprofile/${cardId}`);
  });
});
