import sendRequest from "./../function/sendRequest.js";
import Modal from "./../modalForm/Modal.js";
import UserCardRender from "./../modalForm/UserCardRender.js";

import {
  validateDesc,
  validateAge,
  validateWeight,
} from "./../function/validationFunc.js";

class CreateCardModal extends Modal {
  constructor(token, modal) {
    super(modal), (this.token = token);
  }

  showModalCreateCard() {
    this.showModal();
    const selectDoctor = this.modal.querySelector(".select-doctor");
    const optionForm = this.modal.querySelector(".modal-optional");
    const inputs = this.modal.querySelectorAll('input');
    const textareas = this.modal.querySelectorAll('textarea');
    function cleanAllInputs() {
      [...inputs].forEach(input => {
        input.value = "";
      });

      [...textareas].forEach(textarea => {
        textarea.value = "";
      });
    }

    selectDoctor.addEventListener("change", () => {
      optionForm.innerText = "";
      switch (selectDoctor.value) {
        case "Therapist":
          optionForm.insertAdjacentHTML(
            "afterbegin",
            `
          <div class="input-group mb-3">
          <span class="input-group-text">Вік</span>
          <input type="text"  class="form-control visit-client__old">
          </div>
          `
          );
          break;
        case "Dentist":
          optionForm.insertAdjacentHTML(
            "afterbegin",
            `
          <div class="input-group mb-3">
          <span class="input-group-text">Дата останнього відвідування</span>
          <input type="date"  class="form-control visit-date">
        </div>
          `
          );
          break;
        case "Cardiologist":
          optionForm.insertAdjacentHTML(
            "afterbegin",
            ` <div class="input-group mb-3">
            <span class="input-group-text">Звичайний тиск</span>
            <input type="text"  class="form-control visit-presure">
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Індекс маси тіла</span>
            <input type="text"  class="form-control visit-weight">
          </div>
          <div class="input-group mb-3">
            <textarea class="form-control visit-diseases" placeholder="Перенесені захворювання серцево-судинної системи" id="textareaСardiologistCard" style="height: 100px"></textarea>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Вік</span>
            <input type="text"  class="form-control visit-client__old">
          </div>
            `
          );
          break;
      }
    });

    document.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.classList.contains("btn__send-request")) {
        const visitTitleInput = this.modal.querySelector(".visit-title");
        const visitDesc = this.modal.querySelector("#textareaCreateCard").value;
        const visitPriority = this.modal.querySelector(".visit-priority").value;
        const visitFullNameInput = this.modal.querySelector(
          ".visit-client__name"
        );

        let body = {
          title: visitTitleInput.value,
          description: visitDesc,
          priority: visitPriority,
          fullName: visitFullNameInput.value,
         doctor: selectDoctor.value,
        };
        switch (body.doctor) {
          case "Therapist":
            const visitOldInput = this.modal.querySelector(".visit-client__old");
            body.age = visitOldInput.value;
            break;
          case "Dentist":
            const visitLastDate = this.modal.querySelector(".visit-date").value;
            body.lastVisit = visitLastDate;
            break;
          case "Cardiologist":
            const visitNormalPresure =
              this.modal.querySelector(".visit-presure").value;
            const visitWeight = this.modal.querySelector(".visit-weight").value;
            const visitDiseases =
              this.modal.querySelector(".visit-diseases").value;
            const visitAge = this.modal.querySelector(".visit-client__old").value;
            body.age = visitAge;
            body.diseases = visitDiseases;
            body.weight = visitWeight;
            body.presure = visitNormalPresure;
            break;
        }
        if (validateDesc(visitTitleInput) && validateDesc(visitFullNameInput)) {
          switch (body.doctor) {
            case "Therapist":
              const visitOldInput =
                this.modal.querySelector(".visit-client__old");
              if (validateAge(visitOldInput)) {
                cleanAllInputs();
                this.postCard(body);
              }
              break;
            case "Dentist":
              const visitLastDateInput = this.modal.querySelector(".visit-date");
              if (validateDesc(visitLastDateInput)) {
                cleanAllInputs();
                this.postCard(body);
              }
              break;
            case "Cardiologist":
              const visitNormalPresureInput =
                this.modal.querySelector(".visit-presure");
              const visitWeightInput = this.modal.querySelector(".visit-weight");
              const visitDiseasesInput =
                this.modal.querySelector(".visit-diseases");
              const visitAgeInput =
                this.modal.querySelector(".visit-client__old");
              if (
                validateAge(visitAgeInput) &&
                validateDesc(visitDiseasesInput) &&
                validateDesc(visitNormalPresureInput) &&
                validateWeight(visitWeightInput)
              ) {
                cleanAllInputs();
                this.postCard(body);
              }
              break;
          }
        }
      }
      if (e.target.classList.contains("modal-close") ||
        (!e.target.classList.contains("header-button") &&
          !e.target.closest(".modal-create-card"))) {
        cleanAllInputs();
        this.modal.classList.add("modal");
      }
    });
  }

  postCard(card) {

    sendRequest("https://ajax.test-danit.com/api/v2/cards", "POST", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(card),
    })

      .then((response) => response.text())
      .then(() => {
        this.hideModal();
        const cardElement = new UserCardRender(card); //<--   
        cardElement.createCard();//<--
        cardElement.showMoreInfo();//<--
        cardElement.deleteCardMod(this.token);//<--
        let arrayBase = JSON.parse(localStorage.getItem("localBase"));
        document.querySelector(".message-nocard")?.remove();
        arrayBase.push(card);
        localStorage.setItem("localBase", JSON.stringify(arrayBase));
      })
      .catch((error) => console.error(error.message));
  }

}


export default CreateCardModal;
