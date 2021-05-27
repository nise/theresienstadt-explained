//i18n-setup.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './assets/languages/ger.json'
import axios from 'axios'

Vue.use(VueI18n)

// for some weird reason, Vuei18n fails when non default languages contain their language acronym, like in ger.json


export const i18n = new VueI18n({
  locale: 'ger', // set locale
  fallbackLocale: 'ger',
  messages // set locale messages
})

const loadedLanguages = ['ger'] // our default language that is preloaded

function setI18nLanguage (lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync(lang) {
  // If the same language
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang))
  }

  // If the language hasn't been loaded yet
  return import(/* webpackChunkName: "lang-[request]" */ `./assets/languages/${lang}.json`).then(
    messages => {
      i18n.setLocaleMessage(lang, messages.default)
      loadedLanguages.push(lang)
      return setI18nLanguage(lang)
    }
  )
}