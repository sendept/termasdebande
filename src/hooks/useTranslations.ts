import { useState, useCallback } from 'react';

export type Language = 'gl' | 'es' | 'pt' | 'en';

interface Translations {
  title: string;
  subtitle: string;
  open: string;
  closed: string;
  lastUpdate: string;
  waterLevel: string;
  description: string;
  dataSource: string;
  location: string;
  locationLink: string;
  cookieText: string;
  cookieAccept: string;
  cookieReject: string;
  cookieSettings: string;
}

const translations: Record<Language, Translations> = {
  gl: {
    title: 'Termas de Bande',
    subtitle: 'Comproba se as termas están abertas\npara poder visitalas',
    open: 'Abertas',
    closed: 'Pechadas',
    lastUpdate: 'Última actualización:',
    waterLevel: '% nivel de auga do encoro',
    description: 'As termas de Bande están abertas por tempada. Ás veces atópanse inundadas polo encoro próximo. Esta web monitoriza o nivel da auga para que saibas cando visitalas. O acceso ás termas é gratuíto. A temperatura da auga varía entre 36 e 48 graos. Os datos sobre o nivel da auga proveñen de estacións de monitorización locais',
    dataSource: 'www.embalses.net',
    location: 'As termas romanas de Bande atópanse en',
    locationLink: 'esta ubicación',
    cookieText: 'Usamos cookies de Google Analytics para contar as visitas a esta web. Só se activan se as aceptas.',
    cookieAccept: 'Aceptar',
    cookieReject: 'Rexeitar',
    cookieSettings: 'Cookies',
  },
  es: {
    title: 'Termas de Bande',
    subtitle: 'Comprueba si las termas están abiertas\npara poder visitarlas',
    open: 'Abiertas',
    closed: 'Cerradas',
    lastUpdate: 'Última actualización:',
    waterLevel: '% nivel de agua de embalse',
    description: 'Las termas de Bande están abiertas por temporada. A veces se encuentran inundadas por el embalse cercano. Esta web monitoriza el nivel del agua para que sepas cuándo visitarlas. El acceso a las termas es gratuito. La temperatura del agua varía entre 36 y 48 grados. Los datos sobre el nivel del agua provienen de estaciones de monitorización locales',
    dataSource: 'www.embalses.net',
    location: 'Las termas romanas de Bande se encuentran en',
    locationLink: 'esta ubicación',
    cookieText: 'Usamos cookies de Google Analytics para contar las visitas a esta web. Solo se activan si las aceptas.',
    cookieAccept: 'Aceptar',
    cookieReject: 'Rechazar',
    cookieSettings: 'Cookies',
  },
  pt: {
    title: 'Termas de Bande',
    subtitle: 'Verifique se as termas estão abertas\npara poder visitá-las',
    open: 'Abertas',
    closed: 'Fechadas',
    lastUpdate: 'Última atualização:',
    waterLevel: '% nível de água da barragem',
    description: 'As termas de Bande estão abertas por temporada. Às vezes encontram-se inundadas pela barragem próxima. Este site monitoriza o nível da água para que saiba quando visitá-las. O acesso às termas é gratuito. A temperatura da água varia entre 36 e 48 graus. Os dados sobre o nível da água provêm de estações de monitorização locais',
    dataSource: 'www.embalses.net',
    location: 'As termas romanas de Bande encontram-se em',
    locationLink: 'esta localização',
    cookieText: 'Usamos cookies do Google Analytics para contar as visitas a este site. Só são ativados se os aceitar.',
    cookieAccept: 'Aceitar',
    cookieReject: 'Rejeitar',
    cookieSettings: 'Cookies',
  },
  en: {
    title: 'Bande Hot Springs',
    subtitle: 'Check if the hot springs are open\nto visit them',
    open: 'Open',
    closed: 'Closed',
    lastUpdate: 'Last updated:',
    waterLevel: '% reservoir water level',
    description: 'The Bande hot springs are open seasonally. Sometimes they are flooded by the nearby reservoir. This website monitors the water level so you know when to visit. Access to the hot springs is free. The water temperature varies between 36 and 48 degrees. Data about the water level comes from local monitoring stations',
    dataSource: 'www.embalses.net',
    location: 'The Roman hot springs of Bande are located at',
    locationLink: 'this location',
    cookieText: 'We use Google Analytics cookies to count visits to this site. They are only enabled if you accept.',
    cookieAccept: 'Accept',
    cookieReject: 'Reject',
    cookieSettings: 'Cookies',
  },
};

export const useTranslations = () => {
  const [language, setLanguage] = useState<Language>('es');

  const t = translations[language];

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return {
    t,
    language,
    changeLanguage,
  };
};
