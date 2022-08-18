"use strict";
import AvtorizationModal from "./modules/modalForm/AvtorizationModal.js";
import CreateCardModal from "./modules/modalForm/CreateCardModal.js";
import sendRequest from "./modules/function/sendRequest.js";
import UserCardRender from "./modules/modalForm/UserCardRender.js";//<--
const btnAuntification = document.querySelector(".btn-auntification");
const btnCreateCard = document.querySelector(".btn__create-card");

//Рендер через локал сторедж
const cardsWrapper = document.querySelector('.cards-wrapper');//<--
let arrayBase = JSON.parse(localStorage.getItem("localBase"));//<--
if (arrayBase||arrayBase&&!!arrayBase.length) {                                              //<--
  arrayBase.forEach(client => {
    const card = new UserCardRender(client);
    card.createCard();
    card.showMoreInfo();
  })
} else {
  cardsWrapper.innerHTML = "<h1 class='message-nocard' style='color:white; background:red; text-text-align:center:'>No items have been added</h1>";
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
document.querySelector('.btn-search').addEventListener('click',()=>{
  const priorityValue = document.querySelector('.search-priority').value;
  const descValue = document.querySelector('.search-desc').value;
  const arrayBase = JSON.parse(localStorage.getItem("localBase"));
  let resoultArray;
  if (descValue) {
    resoultArray = arrayBase.filter(card => {
      return (card.title.includes(descValue)||card.description.includes(descValue))&&card.priority === priorityValue;
   }) 
  } else {
    resoultArray = arrayBase.filter(card => card.priority === priorityValue);
  }
  document.querySelector('.cards-wrapper').innerText = "";
  resoultArray.forEach(client =>{
    const card = new UserCardRender(client);
    card.createCard();
    card.showMoreInfo();
    if (modalAvtorization.getToken()) {
      card.deleteCardMod(modalAvtorization.getToken()); 
    }
  })
});

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
