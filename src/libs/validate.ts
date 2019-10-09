import { extend, localize, ValidationObserver, ValidationProvider } from 'vee-validate';
import { email, max, min, required } from 'vee-validate/dist/rules';
import zhTW from 'vee-validate/dist/locale/zh_TW.json';

extend('email', email);
extend('max', max);
extend('min', min);
extend('required', required);

localize('zhTW', zhTW);

export { ValidationObserver, ValidationProvider };
