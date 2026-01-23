import { useWaterLevel } from "@/hooks/useWaterLevel";
import { useTranslations, Language } from "@/hooks/useTranslations";
import { Loader2 } from "lucide-react";
import termasOpen from "@/assets/termas-open.png";
import termasFlooded from "@/assets/termas-flooded.png";
import escudoBande from "@/assets/escudo-bande.png";

const FLOOD_THRESHOLD = 70;
const MAPS_URL = "https://www.google.com/maps/place/Roman+Caldaria+of+Bande+(Hotsprings)/@41.9793225,-7.9818843,130m/data=!3m1!1e3!4m14!1m7!3m6!1s0xd2547bff013a7c7:0xe8fceefffe603cf5!2sRoman+Caldaria+of+Bande+(Hotsprings)!8m2!3d41.9793225!4d-7.9818843!16s%2Fg%2F11b6v6mh3k!3m5!1s0xd2547bff013a7c7:0xe8fceefffe603cf5!8m2!3d41.9793225!4d-7.9818843!16s%2Fg%2F11b6v6mh3k?hl=en&entry=ttu";

const languages: { code: Language; label: string }[] = [
  { code: 'gl', label: 'GL' },
  { code: 'es', label: 'ES' },
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
];

const Index = () => {
  const { percentage, loading, error, lastUpdated } = useWaterLevel();
  const { t, language, changeLanguage } = useTranslations();
  
  const isFlooded = percentage !== null && percentage >= FLOOD_THRESHOLD;

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    const locale = language === 'en' ? 'en-US' : language === 'pt' ? 'pt-PT' : 'es-ES';
    return lastUpdated.toLocaleString(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-helvetica">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-500 text-lg">...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-helvetica p-8">
        <p className="text-gray-600 text-center text-lg">{error}</p>
        <a 
          href="https://www.embalses.net/pantano-706-las-conchas.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 text-blue-500 underline text-lg"
        >
          {t.dataSource}
        </a>
      </div>
    );
  }

  const waterLevelPercentage = percentage || 0;
  const statusColor = isFlooded ? 'text-red-500' : 'text-green-500';
  const dotColor = isFlooded ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className="min-h-screen flex flex-col bg-white font-helvetica">
      {/* Language Switcher */}
      <div className="flex justify-end p-4 gap-2 text-sm">
        {languages.map((lang) => (
          <span
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`cursor-pointer hover:underline ${
              language === lang.code ? 'text-blue-700 font-medium' : 'text-blue-500'
            }`}
          >
            {lang.label}
          </span>
        ))}
      </div>

      {/* Header */}
      <header className="text-center px-6 pt-4 pb-8">
        <h1 className="text-4xl md:text-5xl font-medium text-black mb-3 font-helvetica">
          {t.title}
        </h1>
        <p className="text-sm md:text-base text-gray-400 whitespace-pre-line">
          {t.subtitle}
        </p>
      </header>

      {/* Status Card - Gray outer box, white inner box */}
      <div className="px-6 mb-6">
        <div className="bg-gray-100 rounded-2xl p-4 max-w-md mx-auto">
          <div className="bg-white rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-3 h-3 rounded-full ${dotColor}`}></span>
              <span className={`text-xl md:text-2xl font-bold ${statusColor}`}>
                {isFlooded ? t.closed : t.open}
              </span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm ml-5">
              {t.lastUpdate} {formatLastUpdated()}
            </p>
          </div>
        </div>
      </div>

      {/* Full-width Illustration */}
      <div className="w-full">
        <img 
          src={isFlooded ? termasFlooded : termasOpen} 
          alt={isFlooded ? t.closed : t.open}
          className="w-full h-auto"
        />
      </div>

      {/* Water Level Info Card */}
      <div className="px-6 py-8">
        <div className="bg-gray-100 rounded-2xl p-4 max-w-xl mx-auto">
          <div className="bg-white rounded-xl p-5">
            {/* Green/Red Title */}
            <h2 className={`text-xl md:text-2xl font-bold ${statusColor} mb-2`}>
              {waterLevelPercentage.toFixed(1).replace('.', ',')}{t.waterLevel}
            </h2>
            
            {/* Threshold Bar */}
            <div className="mb-4">
              <div className="relative h-5 bg-gray-100 rounded border border-gray-200">
                <div 
                  className={`absolute left-0 top-0 h-full rounded-l ${isFlooded ? 'bg-red-100' : 'bg-blue-100'}`}
                  style={{ width: `${Math.min(waterLevelPercentage, 100)}%` }}
                ></div>
                <div 
                  className="absolute top-0 h-full border-r-2 border-blue-500"
                  style={{ left: '70%' }}
                ></div>
                <span className="absolute left-1 top-0 h-full flex items-center text-xs text-gray-500">
                  {t.floodThreshold}
                </span>
              </div>
            </div>
            
            {/* Info Text */}
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {t.description}<br />
              <a 
                href="https://www.embalses.net/pantano-706-las-conchas.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {t.dataSource}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Location Link */}
      <div className="px-6 pb-6 text-center">
        <p className="text-sm md:text-base text-gray-400">
          {t.location}{' '}
          <a 
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-600"
          >
            {t.locationLink}
          </a>.
        </p>
      </div>

      {/* Footer with Logo - Centered */}
      <footer className="px-6 py-8 flex justify-center">
        <img 
          src={escudoBande} 
          alt="Escudo de Bande" 
          className="h-24 md:h-28 w-auto"
        />
      </footer>
    </div>
  );
};

export default Index;
