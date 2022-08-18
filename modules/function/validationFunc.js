function validateEmail(elem) {
  let value = elem.value;
 if (value.includes('@')){
  elem.classList.remove("is-invalid")
    return true;
  } else {
    elem.classList.add("is-invalid")
    return false;
  }
}

function validatePassword(elem) {
  let value = elem.value;
 if (!value.includes(' ')&&value.length>5&&value){
  elem.classList.remove("is-invalid")
    return true;
  } else {
    elem.classList.add("is-invalid")
    return false;
  }
}

function validateDesc(elem) {
  let value = elem.value;
 if (value.length>5&&value){
  elem.classList.remove("is-invalid")
    return true;
  } else {
    elem.classList.add("is-invalid")
    return false;
  }
}

function validateAge(elem) {
  let value = elem.value;
 if (Number(value)&&value>=1&&value<=100&&value){
  elem.classList.remove("is-invalid")
    return true;
  } else {
    elem.classList.add("is-invalid")
    return false;
  }
}
function validateWeight(elem) {
  let value = elem.value;
 if (Number(value)&&value>=1&&value<=300&&value){
  elem.classList.remove("is-invalid")
    return true;
  } else {
    elem.classList.add("is-invalid")
    return false;
  }
}

export {validateEmail,validatePassword,validateDesc,validateAge,validateWeight};