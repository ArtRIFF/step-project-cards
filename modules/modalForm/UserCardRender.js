import sendRequest from "./../function/sendRequest.js";
// const token = "975f23a5-90e2-4c35-896b-1b7f5de25eca";
import Modal from "./../modalForm/Modal.js";
import CreateCardModal from "./CreateCardModal.js";
import renderAllCards from "./../function/renderAllCards.js";
import draqAndDropFunc from "./..//function/draqAndDropFunc.js";
const container = document.getElementById("section-cards");

class Card {
  constructor(cardData) {
    this.id = cardData.id;
    this.fullName = cardData.fullName;
    this.description = cardData.description;
    this.priority = cardData.priority;
    this.doctor = cardData.doctor;
    this.age = cardData.age;
    this.title = cardData.title;
    this.lastVisit = cardData.lastVisit;
    this.diseases = cardData.diseases;
    this.weight = cardData.weight;
    this.presure = cardData.presure;
  }
  createCard() {
    //створюю картку
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("mb-2");

    // додаю кнопки закриття і редагування картки
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("buttons-wrapper");
    buttonsWrapper.innerHTML = `<div class="btn-closed" disabled aria-label="Delite">
                                        <img id="del${this.id}" src="./img/iconClose.png" alt="">
                                    </div>
                                    <div id="edit${this.id}" class="btn-edit" disabled aria-label="Edit">
                                        <img src="./img/iconEdit.png" alt="">
                                    </div>`;
    card.append(buttonsWrapper);
    // Створюю тіло інформації картки
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `  <h5 class="card-title">${this.fullName}</h5>
                                <p class="card-text">${this.doctor}</p>`;
    card.append(cardBody);
    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    card.append(cardInfo);
    //Створюю кнопку 'Показати більше'
    const showMoreBtn = document.createElement("button");
    showMoreBtn.classList.add("btn");
    showMoreBtn.classList.add("btn-primary");
    showMoreBtn.classList.add("show_more");
    showMoreBtn.innerText = "Показати більше";
    showMoreBtn.setAttribute("id", `show${this.id}`);
    card.append(showMoreBtn);
    container.append(card);
  }

  deleteCard() {
    const delBtn = document.getElementById(`del${this.id}`);
    delBtn.addEventListener("click", () => {
      sendRequest(
        `https://ajax.test-danit.com/api/v2/cards/${this.id}`,
        "DELETE",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((data) => {
        container.innerHTML = "";
        renderAllCards(token);
      });
    });
  }

  deleteCardMod(token) { //<--
    const delBtn = document.getElementById(`del${this.id}`);
    delBtn.addEventListener("click", (e) => {
      sendRequest(
        `https://ajax.test-danit.com/api/v2/cards/${this.id}`,
        "DELETE",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((data) => {
        // container.innerHTML = "";
        // renderAllCards(token);

        const id = +e.target.closest("div .btn-closed").children[0].id.slice(3);//id. slice через додавання del
        let arrayBase = JSON.parse(localStorage.getItem("localBase"));
        const newArray = arrayBase.filter(card => card.id !== id)//видалення з массиву стореджа
        localStorage.setItem("localBase", JSON.stringify(newArray));
        const buttonWrapper = e.target.closest("div .buttons-wrapper");//кривий пошук картки на сторінці через структуру
        buttonWrapper.closest(".card").remove();
        draqAndDropFunc();
      });
    });
  }


  // deleteCardMod(token) {                                    //<--
  //   sendRequest(
  //     `https://ajax.test-danit.com/api/v2/cards/${this.id}`,
  //     "DELETE",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   ).then((data) => {
  //     console.log(data);
  //   }).catch(() => {
  //     console.log("щось не так!");
  //   });
  // }

  editCard() {
    const editBtn = document.getElementById(`edit${this.id}`);
    editBtn.addEventListener("click", () => {
      sendRequest(
        `https://ajax.test-danit.com/api/v2/cards/${this.id}`,
        "GET",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((userCardData) => {
        const editUserCreateCard = new CreateCardModal(
          token,
          ".modal-create-card ",
          "edit",
          userCardData
        );
        editUserCreateCard.showModalCreateCard();
      });
      //   const editUserCreateCard = new CreateCardModal(
      //     modalAvtorization.getToken(),
      //     ".modal-create-card "
      //   );
    });
    // editBtn.addEventListener("click", () => {
    //   const editUserCreateCard = new CreateCardModal(
    //     modalAvtorization.getToken(),
    //     ".modal-create-card "
    //   );
    //   editUserCreateCard.showModalCreateCard();

    //   sendRequest(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({
    //       id: this.id,
    //       title: "Визит к кардиологу",
    //       description: "Новое описание визита",
    //       doctor: "Cardiologist",
    //       bp: "24",
    //       age: 23,
    //       weight: 70,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((response) => console.log(response));
    // });
  }
  showMoreInfo() {
    const showBtn = document.getElementById(`show${this.id}`);
    showBtn.addEventListener("click", () => {
      showBtn.setAttribute("disabled", true);
      const info = showBtn.previousElementSibling;
      info.insertAdjacentHTML(
        "afterbegin",
        `
                    <p class="${this.age ? "info-team" : "invisible"}">Вік: ${this.age
        }</p>
                    <p class="${this.description ? "info-team" : "invisible"
        }">Опис візиту: ${this.description}</p>
                    <p class="${this.priority ? "info-team" : "invisible"
        }">Терміновість: ${this.priority}</p>
                    <p class="${this.title ? "info-team" : "invisible"
        }">Процедура: ${this.title}</p>
                    <p class="${this.lastVisit ? "info-team" : "invisible"
        }">Останній візит: ${this.lastVisit}</p>
                    <p class="${this.diseases ? "info-team" : "invisible"
        }">Хвороби: ${this.diseases}</p>
                    <p class="${this.weight ? "info-team" : "invisible"
        }">iндекс маси тіла: ${this.weight}</p>
                    <p class="${this.presure ? "info-team" : "invisible"
        }">Тиск: ${this.presure}</p>
                
              `
      );
    });
  }
}

export default Card;
