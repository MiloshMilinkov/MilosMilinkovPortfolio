import { inject, type InjectionKey } from 'vue'
import { en, type Messages } from './messages/en.ts'
import { ru } from './messages/ru.ts'
import { sr } from './messages/sr.ts'

export type { Messages }

export const LOCALES = ['en', 'sr', 'ru'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export interface LocaleInfo {
  /** Value of <html lang> and hreflang. */
  htmlLang: string
  ogLocale: string
  /** Path of the home page in this language. */
  path: string
  /** Name of the language in itself (shown in the picker). */
  name: string
  short: string
}

export const localeInfo: Record<Locale, LocaleInfo> = {
  en: { htmlLang: 'en', ogLocale: 'en_US', path: '/', name: 'English', short: 'EN' },
  sr: { htmlLang: 'sr-Latn', ogLocale: 'sr_RS', path: '/sr/', name: 'Srpski', short: 'SR' },
  ru: { htmlLang: 'ru', ogLocale: 'ru_RU', path: '/ru/', name: 'Русский', short: 'RU' },
}

export const messages: Record<Locale, Messages> = { en, sr, ru }

/** The locale whose <html lang> value is `htmlLang`; English when unknown. */
export function localeFromHtmlLang(htmlLang: string): Locale {
  return LOCALES.find((l) => localeInfo[l].htmlLang === htmlLang) ?? DEFAULT_LOCALE
}

/** The locale whose home path the URL path starts with (used by the dev server); English otherwise. */
export function localeFromPath(pathname: string): Locale {
  return LOCALES.find((l) => l !== DEFAULT_LOCALE && pathname.startsWith(localeInfo[l].path)) ?? DEFAULT_LOCALE
}

export interface I18n {
  locale: Locale
  t: Messages
}

export const I18N_KEY: InjectionKey<I18n> = Symbol('i18n')

export function useI18n(): I18n {
  const i18n = inject(I18N_KEY)
  if (!i18n) throw new Error('useI18n() called outside the portfolio app')
  return i18n
}
