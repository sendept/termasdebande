import { useWaterLevel } from "@/hooks/useWaterLevel";
import { Loader2 } from "lucide-react";
import termasOpen from "@/assets/termas-open.png";
import termasFlooded from "@/assets/termas-flooded.png";
import escudoBande from "@/assets/escudo-bande.png";

const FLOOD_THRESHOLD = 70;
const MAPS_URL = "https://www.google.com/maps/place/Roman+Caldaria+of+Bande+(Hotsprings)/@41.9793225,-7.9818843,130m/data=!3m1!1e3!4m14!1m7!3m6!1s0xd2547bff013a7c7:0xe8fceefffe603cf5!2sRoman+Caldaria+of+Bande+(Hotsprings)!8m2!3d41.9793225!4d-7.9818843!16s%2Fg%2F11b6v6mh3k!3m5!1s0xd2547bff013a7c7:0xe8fceefffe603cf5!8m2!3d41.9793225!4d-7.9818843!16s%2Fg%2F11b6v6mh3k?hl=en&entry=ttu";

const Index = () => {
  const { percentage, loading, error, lastUpdated } = useWaterLevel();
  
  const isFlooded = percentage !== null && percentage >= FLOOD_THRESHOLD;

  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    return lastUpdated.toLocaleString('es-ES', {
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
        <p className="mt-4 text-gray-500 text-lg">Consultando nivel del agua...</p>
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
          Ver en embalses.net
        </a>
      </div>
    );
  }

  const waterLevelPercentage = percentage || 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-helvetica">
      {/* Language Switcher */}
      <div className="flex justify-end p-4 gap-3 text-base">
        <span className="text-blue-500 cursor-pointer hover:underline">GL</span>
        <span className="text-blue-500 cursor-pointer hover:underline">ES</span>
        <span className="text-blue-500 cursor-pointer hover:underline">PT</span>
        <span className="text-blue-500 cursor-pointer hover:underline">EN</span>
      </div>

      {/* Header */}
      <header className="text-center px-6 pt-6 pb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">
          Termas de Bande
        </h1>
        <p className="text-base md:text-lg text-gray-500">
          Comprueba si termas estan abiertas<br />
          para poder visitarlas
        </p>
      </header>

      {/* Status Card */}
      <div className="px-6 mb-8">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <span className={`w-4 h-4 rounded-full ${isFlooded ? 'bg-red-500' : 'bg-blue-500'}`}></span>
            <span className={`text-3xl md:text-4xl font-bold ${isFlooded ? 'text-red-500' : 'text-blue-500'}`}>
              {isFlooded ? 'Cerradas' : 'Abiertas'}
            </span>
          </div>
          <p className="text-gray-400 text-sm md:text-base ml-7">
            Última actualización: {formatLastUpdated()}
          </p>
        </div>
      </div>

      {/* Full-width Illustration */}
      <div className="w-full">
        <img 
          src={isFlooded ? termasFlooded : termasOpen} 
          alt={isFlooded ? "Termas inundadas" : "Termas accesibles"}
          className="w-full h-auto"
        />
      </div>

      {/* Water Level Info Card */}
      <div className="px-6 py-10">
        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden max-w-xl mx-auto shadow-sm">
          {/* Blue Header */}
          <div className="bg-blue-500 text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-4 h-4 rounded-full bg-white"></span>
              <p className="text-2xl md:text-3xl font-bold">
                {waterLevelPercentage.toFixed(1).replace('.', ',')}% nivel de agua de embalse
              </p>
            </div>
            <p className="text-blue-100 text-sm md:text-base ml-7">
              Última actualización: {formatLastUpdated()}
            </p>
          </div>
          
          {/* Info Text */}
          <div className="p-6 text-base md:text-lg text-gray-600 leading-relaxed">
            <p className="mb-3">
              Las termas de Bande están abiertas por temporada. A veces se encuentran inundadas 
              por el embalse cercano. Esta web monitoriza el nivel del agua para que sepas cuándo visitarlas. 
              El acceso a las termas es gratuito. La temperatura del agua varía entre 36 y 48 grados. 
              Los datos sobre el nivel del agua provienen de estaciones de monitorización locales.
            </p>
            <a 
              href="https://www.embalses.net/pantano-706-las-conchas.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              www.embalses.net
            </a>
          </div>
        </div>
      </div>

      {/* Location Link */}
      <div className="px-6 pb-6 text-center">
        <p className="text-base md:text-lg text-gray-500">
          Las termas romanas de Bande se encuentran en{' '}
          <a 
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-600"
          >
            está ubicación
          </a>.
        </p>
      </div>

      {/* Footer with Logo */}
      <footer className="px-6 py-10">
        <img 
          src={escudoBande} 
          alt="Escudo de Bande" 
          className="h-24 md:h-32 w-auto"
        />
      </footer>
    </div>
  );
};

export default Index;
