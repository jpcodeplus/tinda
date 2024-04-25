function applyDragToAllCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => dragElement(card));
}

function dragElement(element) {
  let startX = 0, startY = 0;
  let moveX = 0, moveY = 0;
  const initialTop = element.offsetTop;
  const initialLeft = element.offsetLeft;

  element.addEventListener("mousedown", startDrag, false);
  element.addEventListener("touchstart", startDrag, false);

  function startDrag(e) {
    if (e.type === "touchstart") {
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
    } else { // mousedown
      startX = e.clientX;
      startY = e.clientY;
    }
    document.addEventListener("mousemove", drag, false);
    document.addEventListener("touchmove", drag, false);
    document.addEventListener("mouseup", stopDrag, false);
    document.addEventListener("touchend", stopDrag, false);
  }

  function drag(e) {
    let clientX = startX;
    let clientY = startY;

    if (e.type === "touchmove") {
      clientX = e.touches[0].pageX;
      clientY = e.touches[0].pageY;
    } else { // mousemove
      clientX = e.clientX;
      clientY = e.clientY;
    }

    moveX = clientX - startX;
    moveY = clientY - startY;

    element.style.top = `${initialTop + moveY}px`;
    element.style.left = `${initialLeft + moveX}px`;
  }

  function stopDrag() {
    document.removeEventListener("mousemove", drag, false);
    document.removeEventListener("touchmove", drag, false);
    document.removeEventListener("mouseup", stopDrag, false);
    document.removeEventListener("touchend", stopDrag, false);
  }
}

// Aktiviere die Drag-Funktion für alle .card Elemente beim Laden der Seite
window.onload = applyDragToAllCards;
