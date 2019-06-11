const React = require('react');
const { addLocaleData } = require('react-intl');
const { FormattedMessage } = require('react-intl');
const enLocaleData = require('react-intl/locale-data/en');
const cnLocaleData = require('react-intl/locale-data/zh');
const ruLocaleData = require('react-intl/locale-data/ru');

const enUS = require('antd/lib/locale-provider/en_US');
const zhCN = require('antd/lib/locale-provider/zh_CN');
const ruRU = require('antd/lib/locale-provider/ru_RU');

const utils = require('./template/utils');

const enTranslationMessages = require('./en-US');
const cnTranslationMessages = require('./zh-CN');
const ruTranslationMessages = require('./ru-RU');

addLocaleData(enLocaleData);
addLocaleData(cnLocaleData);
addLocaleData(ruLocaleData);

const DEFAULT_LOCALE = 'en';

// prettier-ignore
const appLocales = [
  'en',
  'cn',
  'ru',
];

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages.messages)
      : {};
  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE ? defaultFormattedMessages[key] : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(enTranslationMessages.messages).reduce(flattenFormattedMessages, {});
};

const locales = {
  en: {
    ...enTranslationMessages,
    localeProvider: enUS,
    messages: formatTranslationMessages('en', enTranslationMessages.messages),
  },
  cn: {
    ...cnTranslationMessages,
    localeProvider: zhCN,
    messages: formatTranslationMessages('cn', cnTranslationMessages.messages),
  },
  ru: {
    ...ruTranslationMessages,
    localeProvider: ruRU,
    messages: formatTranslationMessages('ru', ruTranslationMessages.messages),
  },
};

const storeLocale = utils.isLocalStorageNameSupported() && localStorage.getItem('locale');

exports.FormattedMessage = props => {
  const { id } = props;
  return (
    <FormattedMessage
      {...props}
      defaultMessage={id
        .split('.')
        .slice(-1)
        .pop()}
    />
  );
};
exports.appLocales = appLocales;
exports.appLocalesSelect = {
  en: { id: 'LocaleToggle.en' },
  cn: { id: 'LocaleToggle.cn' },
  ru: { id: 'LocaleToggle.ru' },
};
exports.formatTranslationMessages = formatTranslationMessages;
exports.locales = locales;
exports.DEFAULT_LOCALE = storeLocale || DEFAULT_LOCALE;
