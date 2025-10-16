import { messageShow } from '/assets/js/message.js';

document.addEventListener('DOMContentLoaded', () => {
  const technicalSupportr = document.createElement('div');
  technicalSupportr.classList.add('technical-support');
  document.body.appendChild(technicalSupportr);
  fetch('/components/technicalSupport.html')
    .then(res => res.text())
    .then(data => {
      technicalSupportr.innerHTML = data;
    })
    .catch(err => console.error('Error loading footer:', err));
  technicalSupportr.addEventListener('click', () => {
    messageShow(
      true,
      'Customer support is currently unavailable, unfortunately.',
      'https://lottie.host/5152cddc-5972-409e-b2d1-af06e36a0795/RELRQVXw5b.lottie',
    );
  });
});
