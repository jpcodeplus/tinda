# Dokumentation für <u>Tinda</u> Drag & Drop Funktionalität

## Überblick

Diese Dokumentation beschreibt die Funktionalität des JavaScript-Codes, der für das Drag & Drop von Karten (cards) innerhalb einer Webanwendung zuständig ist. Die Karten können nach links oder rechts gezogen werden, um eine Aktion auszuführen (z.B. Ablehnen oder Akzeptieren).

## Funktionen

### `applyDragToAllCards()`

- **Beschreibung**: Diese Funktion aktiviert das Drag & Drop für alle Elemente mit der Klasse `.card`.
- **Prozess**:
  - Selektiert alle Elemente mit der Klasse `.card`.
  - Wendet die Funktion `dragElement()` auf jedes dieser Elemente an.

### `dragTinda(element)`

- **Parameter**: `element` - Das HTML-Element, das drag-fähig gemacht wird.
- **Funktionalität**: Ermöglicht es, das gegebene Element zu ziehen und seine Position entsprechend zu aktualisieren.
- **Ereignisse**:
  - `mousedown` oder `touchstart` initiieren das Ziehen.
  - `mousemove` oder `touchmove` aktualisieren die Position des Elements.
  - `mouseup` oder `touchend` beenden den Ziehvorgang.

### Event Handling

- **`startDrag(e)`**: Initialisiert die Startposition für das Ziehen.
- **`drag(e)`**: Aktualisiert die Position des Elements während des Ziehens und prüft, ob Schwellenwerte überschritten werden.
- **`stopDrag()`**: Beendet das Ziehen und führt eine Aktion basierend auf der Richtung des Ziehens aus.

### Hilfsfunktionen

- **`updateTilt()`**: Berechnet und wendet eine Drehung auf das Element basierend auf seiner Bewegung an.
- **`checkThreshold()`**: Überprüft, ob das Element einen definierten Schwellenwert überschritten hat.
- **`updateCurrentDirection(distanceMoved)`**: Aktualisiert die Richtung der Bewegung basierend auf der zurückgelegten Distanz.
- **`handleDirection(direction, element)`**: Führt eine Aktion basierend auf der Richtung der Bewegung aus.
- **`animateOutOfView(element, endPosition)`**: Animiert das Element aus dem Sichtfeld.

## Todo-Liste für Verbesserungen

- **Performance Optimierung**:
  - Überprüfung und Optimierung der Event Listener, um die Reaktionsfähigkeit bei vielen Elementen zu verbessern.
- **Erweiterung der Gestenunterstützung**:
  - Implementierung weiterer Gesten wie Doppel-Tap oder Lang-Druck.
- **Benutzerfreundlichkeit**:
  - Verbesserung der visuellen Rückmeldung beim Ziehen, um die Benutzerführung zu verstärken.
- **Responsive Design**:
  - Sicherstellen, dass die Drag & Drop-Funktionalität auf allen Geräten gleich gut funktioniert, insbesondere auf Mobilgeräten.
- **Code Modularität**:
  - Refactoring des Codes, um die Wiederverwendbarkeit und Wartbarkeit zu verbessern, indem spezifische Funktionalitäten in separate Module aufgeteilt werden.

## Globale Variablen

- `currentImgIndex`: Verwaltet den aktuellen Bildindex für das Durchblättern der Bilder.
- `lastUsedNameIndex`: Stellt sicher, dass Namen nicht unmittelbar wiederholt werden.

