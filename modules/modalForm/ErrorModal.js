import Modal from "./Modal.js";

class ErrorModal extends Modal {
  constructor(modal) {
    super(modal)
  }
  showErrorModal(){
    this.showModal();
    document.addEventListener('click', (e)=>{
      if(e.target.classList.contains('error-close')){
        document.querySelector('.modal-error').classList.add("modal");
      }
    });
  }
}

export default ErrorModal;