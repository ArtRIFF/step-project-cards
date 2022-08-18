class Modal {
  constructor(modalClass) {
    this.modal = document.querySelector(modalClass);
  }
  showModal(){
    this.modal.classList.remove('modal');
  }
  hideModal() {
    this.modal.classList.add('modal');
  }
}

export default Modal;