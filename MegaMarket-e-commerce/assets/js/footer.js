document.addEventListener('DOMContentLoaded', () => {
  const footerPlaceholder = document.createElement('footer');
  document.body.appendChild(footerPlaceholder);
  fetch('/components/footer.html')
    .then(res => res.text())
    .then(data => {
      footerPlaceholder.innerHTML = data;
    }).catch(err=>console.error('Error loading footer:', err));
});
