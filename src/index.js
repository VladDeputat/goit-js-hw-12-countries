import './styles.css';
import fetchCountries from './js/fetchCountries';
import countryListTpl from './templates/countryList.hbs';
import singleCountryTpl from './templates/singleCountry.hbs';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const listWrapperRef = document.querySelector('.countryList');
const coutntryDesc = document.querySelector('.countryDesc');
const debounce = require('lodash.debounce');
const inputRef = document.querySelector('.input');

inputRef.addEventListener('input', debounce(onInput, 500));

function crear() {
  listWrapperRef.innerHTML = '';
  coutntryDesc.innerHTML = '';
}

function onInput() {
  if (!inputRef.value) {
    crear();
    return;
  }
  fetchCountries(inputRef.value).then(countries => {
    if (countries.length >= 10) {
      crear();
      error({
        text: 'Too many matches found! Please enter a more specific query',
      });
    }
    if (countries.status === 404) {
      crear();
      error({
        text: 'No country has been found. Please enter a more specific query!',
      });
      return;
    }
    if (countries.length <= 10 && countries.length > 1) {
      coutntryDesc.innerHTML = '';
      listWrapperRef.innerHTML = countryListTpl(countries);
    }
    if (countries.length === 1) {
      listWrapperRef.innerHTML = '';
      coutntryDesc.innerHTML = singleCountryTpl(countries);
    }
  });
}
