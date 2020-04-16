window.onload = function() {
  var cards = document.getElementsByClassName("card-book");

  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function() {
      getInfosBook(this);
    }, false);
  }

  document.getElementById("btn-confirm").addEventListener("click", function() {
    saveReserveDevolution();
  }, false);
  
  document.getElementById("modal-close").addEventListener("click", function() {
    displayModal();
  }, false);
};

window.onclick = function(event) {
  if (event.target.id == "modal-details-book") {
    displayModal();
  }
}

function getInfosBook(element) {
  var image = element.querySelector(".card-img-book img");
  var title = element.querySelector(".card-title-book");
  var author = element.querySelector(".card-author-book");
  var resume = element.querySelector(".card-resume-book p");
  var imageModal = document.querySelector(".modal-img-book");
  var titleModal = document.querySelector(".modal-title-book");
  var authorModal = document.querySelector(".modal-author-book");
  var resumeModal = document.querySelector(".modal-resume-book p");

  if (image) {
    image = image.cloneNode(true);

    if (imageModal.childNodes.length == 0) {
      imageModal.appendChild(image);
    } else {
      imageModal.replaceChild(image, imageModal.childNodes[0]);
    }
  }
  if (title) {
    titleModal.innerText = title.innerText;
  }
  if (author) {
    authorModal.innerText = author.innerText;
  }
  if (resume) {
    resumeModal.innerText = resume.innerText;
  }

  displayModal(true);
}

function saveReserveDevolution() {
  var isbn = document.getElementById("isbn");
  var action = document.getElementById("type-action");
  var card, statusBook;

  if (isbn && isbn.value.trim() != "" && action && action.value != "") {
    card = document.getElementById("ISBN-" + isbn.value.trim());

    if (card) {
      statusBook = card.getAttribute("status-book");

      switch (action.value) {
        case "R":
          if (statusBook == "D") {
            setReserve(card);
    
            isbn.value = "";
            action.value = "";
          } else {
            alert("Livro indisponível para reserva.");
          }
          break;
        case "D":
          if (statusBook == "I") {
            setDevolution(card);
    
            isbn.value = "";
            action.value = "";
          } else {
            alert("Livro não pode ser devolvido, pois está disponível.");
          }
          break;
        default:
          alert("Ocorreu um erro ao confirmar esta ação.");
          break;
      }
    } else {
      alert("ISBN não localizado em nossa lista.");
    }
  } else {
    alert("Informe o ISBN e o tipo de ação que deseja realizar.");
  }
}

function setReserve(card) {
  var statusCard = card.querySelector(".card-status-book");
  var dataAtual = (new Date()).toLocaleDateString();

  if (statusCard) {
    card.setAttribute("status-book", "I");

    statusCard.innerText = "Reservado em " + dataAtual;
    statusCard.classList.add("status-unavailable");
  }
}

function setDevolution(card) {
  var statusCard = card.querySelector(".card-status-book");

  if (statusCard) {
    card.setAttribute("status-book", "D");
    
    statusCard.innerText = "Disponível";
    statusCard.classList.remove("status-unavailable");
  }
}

function displayModal(display = false) {
  var modal = document.getElementById("modal-details-book");

  if (display) {
    modal.classList.add("modal-show");
  } else {
    modal.classList.remove("modal-show");
  }
}
