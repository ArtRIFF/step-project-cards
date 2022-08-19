"use strict";
import AvtorizationModal from "./modules/modalForm/AvtorizationModal.js";
import CreateCardModal from "./modules/modalForm/CreateCardModal.js";
import draqAndDropFunc from "./modules/function/draqAndDropFunc.js";
import UserCardRender from "./modules/modalForm/UserCardRender.js";//<--
const btnAuntification = document.querySelector(".btn-auntification");
const btnCreateCard = document.querySelector(".btn__create-card");

//Рендер через локал сторедж
const cardsWrapper = document.querySelector('.cards-wrapper');//<--
let arrayBase = JSON.parse(localStorage.getItem("localBase"));//<--
if (arrayBase || arrayBase && !!arrayBase.length) {                                              //<--
  arrayBase.forEach(client => {
    const card = new UserCardRender(client);
    card.createCard();
    card.showMoreInfo();
  })
  draqAndDropFunc();
} else {
  cardsWrapper.innerHTML = "<h1 class='message-nocard' style='color:white; background:red; text-align:center;'>No items have been added</h1>";
}

const modalAvtorization = new AvtorizationModal(".modal-authorization");

btnAuntification.addEventListener("click", () => {
  modalAvtorization.showModalAvtorization();
});

btnCreateCard.addEventListener("click", () => {
  const modalCreateCard = new CreateCardModal(
    modalAvtorization.getToken(),
    ".modal-create-card "
  );
  modalCreateCard.showModalCreateCard();
});

//Filter  -немає статусу done open
document.querySelector('.btn-search').addEventListener('click', () => {
  const priorityValue = document.querySelector('.search-priority').value;
  const descValue = document.querySelector('.search-desc').value;
  const arrayBase = JSON.parse(localStorage.getItem("localBase"));
  let resoultArray;
  if (descValue) {
    resoultArray = arrayBase.filter(card => {
      return (card.title.includes(descValue) || card.description.includes(descValue)) && card.priority === priorityValue;
    })
  } else {
    resoultArray = arrayBase.filter(card => card.priority === priorityValue);
  }
  document.querySelector('.cards-wrapper').innerText = "";
  resoultArray.forEach(client => {
    const card = new UserCardRender(client);
    card.createCard();
    card.showMoreInfo();
    if (modalAvtorization.getToken()) {
      card.deleteCardMod(modalAvtorization.getToken());
    }
  })
});

//drag and drop
// let dragSrcEl;
// function handleDragStart(e) {
//   this.style.opacity = '0.4';

//   dragSrcEl = this;

//   e.dataTransfer.effectAllowed = 'move';
//   e.dataTransfer.setData('text/html', this.innerHTML);
// }

// function handleDragEnd(e) {
//   this.style.opacity = '1';
//   items.forEach(function (item) {
//     item.classList.remove('over');
//   });
// }


// function handleDragEnter(e) {
//   this.classList.add('over');
// }

// function handleDragLeave(e) {
//   this.classList.remove('over');
// }

// function handleDrop(e) {
//   e.stopPropagation(); // препятствует перенаправлению в браузере.
//   console.log(dragSrcEl);
//   if (dragSrcEl !== this) {
//     console.log(dragSrcEl);
//     dragSrcEl.innerHTML = this.innerHTML;
//     this.innerHTML = e.dataTransfer.getData('text/html');
//   }

//   return false;
// }

// let items = document.querySelectorAll('.cards-wrapper .card');
// items.forEach(function (item) {
//   item.addEventListener('dragstart', handleDragStart);
//   item.addEventListener('dragend', handleDragEnd);
//   item.addEventListener('dragenter', handleDragEnter);
//   item.addEventListener('dragleave', handleDragLeave);
//   item.addEventListener('dragend', handleDragEnd);
//   item.addEventListener('drop', handleDrop);
// });

// let obj = {
//   "title": "323333333333333333",
//   "description": "324324324234234",
//   "priority": "Low",
//   "fullName": "322222222222222",
//   "doctor": "Cardiologist",
//   "age": "34",
//   "diseases": "2222222222222",
//   "weight": "12",
//   "presure": "123434",
//   "id": 74177
// }

// console.log(obj.title.includes("323333333333333333"));

// Функція для отримання карток з серверу(для тестів)

// const showAllCards = sendRequest(
//   "https://ajax.test-danit.com/api/v2/cards",
//   "GET",
//   {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }
// )
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => console.error(error.message));
