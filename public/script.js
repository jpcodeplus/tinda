function applyDragToAllCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => dragElement(card));
}

function dragElement(element) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const initialTop = element.offsetTop;
  const initialLeft = element.offsetLeft;
  const threshold = element.offsetWidth * 0.6;
  let lastDirection = null;
  let currentDirection = "neutral";

  element.addEventListener("mousedown", dragMouseDown);

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener("mouseup", closeDragElement);
    document.addEventListener("mousemove", elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    element.style.top = `${element.offsetTop - pos2}px`;
    element.style.left = `${element.offsetLeft - pos1}px`;
    updateTilt();
    checkThreshold();
  }

  function updateTilt() {
    const DEG = 18;
    const distanceMoved = element.offsetLeft - initialLeft;
    const maxDistance = window.innerWidth / 2;
    const tilt = Math.max(
      -DEG,
      Math.min(DEG, (DEG * distanceMoved) / maxDistance)
    );
    element.style.transform = `rotate(${tilt}deg)`;
  }

  function checkThreshold() {
    const distanceMoved = Math.abs(element.offsetLeft - initialLeft);
    updateCurrentDirection(distanceMoved);
    if (currentDirection !== lastDirection) {
      console.log(currentDirection);
      lastDirection = currentDirection;
    }
  }

  function updateCurrentDirection(distanceMoved) {
    if (distanceMoved > threshold) {
      currentDirection = element.offsetLeft < initialLeft ? "links" : "rechts";
    } else {
      currentDirection = "neutral";
    }
  }

  function closeDragElement() {
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
    handleDirection(currentDirection, element);
  }

  function handleDirection(direction, element) {
    switch (direction) {
      case "links":
        moveElementLeft(element);
        break;
      case "rechts":
        moveElementRight(element);
        break;
      case "neutral":
        returnToStart(element);
        break;
    }
  }

  function moveElementLeft(element) {
    animateOutOfView(element, -window.innerWidth);
  }

  function moveElementRight(element) {
    animateOutOfView(element, window.innerWidth);
  }

  function animateOutOfView(element, endPosition) {
    element.style.transition = "left 0.5s ease-out";
    element.style.left = `${endPosition}px`;
    setTimeout(() => {
      element.parentNode.removeChild(element);
      addNewCard();
    }, 500);
  }

  function addNewCard() {
    const cardStack = document.querySelector(".card-stack");
    if (cardStack) {
      const newCard = document.createElement("div");
      newCard.className = "card";
      newCard.textContent = "Neue Karte";
      cardStack.appendChild(newCard);
      dragElement(newCard); // Make the new card draggable as well
    }
  }

  function returnToStart(element) {
    element.style.top = `${initialTop}px`;
    element.style.left = `${initialLeft}px`;
    element.style.transform = "rotate(0deg)";
  }
}

// Aktiviere die Drag-Funktion für alle .card Elemente beim Laden der Seite
window.onload = applyDragToAllCards;