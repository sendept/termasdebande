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
  const isAccessible = percentage !== null && percentage < FLOOD_THRESHOLD;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-helvetica">
        <Loader2 className="w-12 h-12 animate-spin text-gray-400" />
        <p className="mt-4 text-gray-500">Consultando nivel del agua...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white font-helvetica p-8">
        <p className="text-gray-600 text-center">{error}</p>
        <a 
          href="https://www.embalses.net/pantano-706-las-conchas.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 text-blue-600 underline"
        >
          Ver en embalses.net
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-helvetica">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Status Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-black mb-2 tracking-tight">
          {isFlooded ? 'Cerradas' : 'Abiertas'}
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Termas de Bande
        </p>

        {/* Illustration */}
        <div className="w-full max-w-2xl mb-8">
          <img 
            src={isFlooded ? termasFlooded : termasOpen} 
            alt={isFlooded ? "Termas inundadas" : "Termas accesibles"}
            className="w-full h-auto"
          />
        </div>

        {/* Water Level */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">
            Nivel actual del embalse
          </p>
          <p className="text-4xl md:text-5xl font-light text-black">
            {percentage?.toFixed(1)}%
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-400 mt-2">
              Actualizado: {lastUpdated.toLocaleString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          )}
        </div>

        {/* Location Link */}
        <a 
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-500 hover:text-gray-700 underline mb-12 transition-colors"
        >
          📍 Ver ubicación en Google Maps
        </a>
      </main>

      {/* Footer */}
      <footer className="px-6 py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          {/* Info Text */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Las termas de Bande están abiertas por temporada. A veces se encuentran inundadas por el embalse cercano. Esta web monitoriza el nivel del agua para que sepas cuándo visitarlas. El acceso a las termas es gratuito. La temperatura del agua varía entre 36 y 48 grados. Los datos sobre el nivel del agua provienen de estaciones de monitorización locales.
          </p>
          
          {/* Source */}
          <a 
            href="https://www.embalses.net/pantano-706-las-conchas.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            www.embalses.net
          </a>

          {/* Bande Logo */}
          <div className="mt-8 flex justify-center">
            <img 
              src={escudoBande} 
              alt="Escudo de Bande" 
              className="h-20 w-auto opacity-70"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
