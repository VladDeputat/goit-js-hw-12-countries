import './styles.css';

const inputRef = document.querySelector('.input');

inputRef.addEventListener('input', () => {
  console.log(inputRef.value);
});

fetch('https://restcountries.eu/rest/v2');
