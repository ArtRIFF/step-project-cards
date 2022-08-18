import sendRequest from "./sendRequest.js";
import UserCardRender from "./../modalForm/UserCardRender.js";
function renderAllCards(token) {
  sendRequest("https://ajax.test-danit.com/api/v2/cards", "GET", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((data) => {
      localStorage.clear();//<--
      let localBase = [];//<--
      if (data.length > 0) {
        document.querySelector(".cards-wrapper").innerText = "";
        data.forEach((client) => {
          const card = new UserCardRender(client);
          localBase.push(client);//<--
          card.createCard();//<--
          card.showMoreInfo();//<--
          card.deleteCardMod(token);//<--
        });
      }
      localStorage.setItem("localBase", JSON.stringify(localBase));
    })
    .catch((error) => console.error(error.message));
}
export default renderAllCards;
