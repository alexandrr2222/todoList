export function DOM_Helper({ element, domClass, domText, append, prepend }) {
  const newElement = document.createElement(element);
  if (domClass) newElement.classList.add(domClass);
  if (domText) newElement.textContent = domText;
  if (append) append.append(newElement);
  if (prepend) prepend.append(newElement);
  return newElement;
}

export function addGlobalEventListener(
  eventType,
  selectorElement,
  callback,
  parent = document,
) {
  parent.addEventListener(eventType, (e) => {
    const targetElement = e.target.closest(selectorElement);
    if (targetElement) {
      callback(targetElement);
    }
  });
}
