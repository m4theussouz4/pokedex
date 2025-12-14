import { TranslocoTestingModule, TranslocoTestingOptions } from '@jsverse/transloco';
import ptBR from '../../../assets/i18n/pt-BR.json';
import enUS from '../../../assets/i18n/en-US.json';
import esES from '../../../assets/i18n/es-ES.json';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { ptBR, enUS, esES },
    translocoConfig: {
      availableLangs: ['ptBR', 'enUS', 'esES'],
      defaultLang: 'ptBR',
    },
    preloadLangs: true,
    ...options,
  });
}