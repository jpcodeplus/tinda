let currentImgIndex = 0;
let lastUsedNameIndex = -1;

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

  // Mouse Events
  element.addEventListener("mousedown", startDrag);

  // Touch Events
  element.addEventListener("touchstart", startDrag, {passive: false});

  function startDrag(e) {
    e.preventDefault();
    pos3 = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    pos4 = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchend", stopDrag);
    document.addEventListener("touchmove", drag, {passive: false});
  }

  function drag(e) {
    e.preventDefault();
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

    pos1 = pos3 - clientX;
    pos2 = pos4 - clientY;
    pos3 = clientX;
    pos4 = clientY;

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

  function stopDrag() {
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("touchend", stopDrag);
    document.removeEventListener("touchmove", drag);
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

// Globale Variablen zur Verwaltung des Bildindexes und des letzten Namens


function addNewCard() {
  const cardStack = document.querySelector(".card-stack");
  if (cardStack) {
    const newCard = document.createElement("div");
    newCard.className = "card";

    // Erstellen und Hinzufügen des card_image divs
    const cardImage = document.createElement("div");
    cardImage.className = "card_image";
    const img = document.createElement("img");
    // Bilder zyklisch durchlaufen
    currentImgIndex = (currentImgIndex % 3) + 1;  // Erhöht den Index zyklisch: 1, 2, 3, 1, 2, 3, ...
    img.src = `./img/example${currentImgIndex}.png`;
    cardImage.appendChild(img);
    newCard.appendChild(cardImage);

    // Erstellen und Hinzufügen des card_content divs
    const cardContent = document.createElement("div");
    cardContent.className = "card_content";
    const h3 = document.createElement("h3");
    h3.textContent = `${getRandomName()} (${getRandomAge()})`; // Zufälliger Name und Alter
    cardContent.appendChild(h3);
    newCard.appendChild(cardContent);

    cardStack.appendChild(newCard);
    dragElement(newCard); // Make the new card draggable as well
  }
}

function getRandomName() {
  const names = ["Manfred", "Sebastian", "Heiko", "Marcel", "Jürgen", "Frank", "Dieter", "Klaus", "Gerd", "Hans", "Peter", "Wolfgang", "Thomas", "Michael", "Bernd"];
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * names.length);
  } while (randomIndex === lastUsedNameIndex); // Verhindere die direkte Wiederholung eines Namens
  lastUsedNameIndex = randomIndex;
  return names[randomIndex];
}

function getRandomAge() {
  const minAge = 18;
  const maxAge = 72;
  return Math.floor(Math.random() * (maxAge - minAge + 1) + minAge);
}




  function returnToStart(element) {
    element.style.top = `${initialTop}px`;
    element.style.left = `${initialLeft}px`;
    element.style.transform = "rotate(0deg)";
  }
}



// Aktiviere die Drag-Funktion für alle .card Elemente beim Laden der Seite
window.onload = applyDragToAllCards;
