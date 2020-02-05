import { string, shape } from 'prop-types';

export const languageModel = shape({
  code: string,
  name: string,
  nativeName: string,
});


