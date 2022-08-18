import sendRequest from './../function/sendRequest.js';
import {validateEmail,validatePassword} from './../function/validationFunc.js';
import renderAllCards from './../function/renderAllCards.js';
import Modal from './Modal.js';
import ErrorModal from './ErrorModal.js';

class AvtorizationModal extends Modal{
  constructor(modal) {
    super(modal),
    this.token = null
  }
  showModalAvtorization() {
    this.showModal();
    const btnSendRequest = document.querySelector('.btn__send-request');
    btnSendRequest.addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.querySelector('.input-email');
      const passwordInput = document.querySelector('.input-password');
      if(validateEmail(emailInput)&&validatePassword(passwordInput)){
        this.sendAuntificationData(emailInput.value, passwordInput.value);
      }
    })
    function closeEvent(event) {
      if (event.target.classList.contains('modal-close') || !event.target.classList.contains('header-button') && !event.target.closest(".modal-authorization")) {
        document.removeEventListener('click', closeEvent);
        document.querySelector('.modal-authorization').classList.add("modal");
      }
    }
    document.addEventListener('click', closeEvent);
  }
  sendAuntificationData(email, password) {
    const body = {
      email: email,
      password: password
    };
    sendRequest("https://ajax.test-danit.com/api/v2/cards/login", 'POST', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then((response) => {
      if(response.status!==200){
            throw new Error(response.status)
          } 
      return response.text();
    })
    .then(token => {
      this.token = token;
        this.changeNavButton();
        this.hideModal();
        renderAllCards(token);
    })
     .catch(error => {
        console.log(error);
        const errorModal = new ErrorModal('.modal-error');
        errorModal.showErrorModal();
      });

  }
  changeNavButton() {
    document.querySelector('.btn-auntification').classList.add('visually-hidden');
    document.querySelector('.btn__create-card').classList.remove('visually-hidden');
  }
  getToken() {
    return this.token;
  }
}

export default AvtorizationModal;