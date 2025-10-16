let place;

document.addEventListener('DOMContentLoaded', () => {
  const message = document.createElement('div');
  message.classList.add('main-message');
  document.body.appendChild(message);

  fetch('/components/message.html')
    .then(res => res.text())
    .then(data => {
      message.innerHTML = data;
      place = message;
    })
    .catch(err => console.error('Error loading message:', err));
});

let messageTimeout;

export function messageShow(status, text, path) {
  if (!place) return;

  const placeMessage = document.getElementById('message-texe');
  const pathLootile = document.getElementById('lootile');

  if (pathLootile) pathLootile.setAttribute('src', path);
  if (placeMessage) placeMessage.textContent = text;

  clearTimeout(messageTimeout);
  place.classList.add('active');

  messageTimeout = setTimeout(() => {
    place.classList.remove('active');
  }, 4000);
}
