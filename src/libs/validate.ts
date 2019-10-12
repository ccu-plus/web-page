import { extend, localize, setInteractionMode, ValidationObserver, ValidationProvider } from 'vee-validate';
import { digits, email, max, min, required } from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';

extend('digits', digits);
extend('email', email);
extend('max', max);
extend('min', min);
extend('required', required);

localize('zhTW', zhTW);

setInteractionMode('eager');

export { ValidationObserver, ValidationProvider };
