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
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
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

  const waterLevelPercentage = percentage || 0;
  const progressWidth = Math.min(waterLevelPercentage, 100);

  return (
    <div className="min-h-screen flex flex-col bg-white font-helvetica">
      {/* Language Switcher */}
      <div className="flex justify-end p-4 gap-2 text-sm">
        <span className="text-blue-600 cursor-pointer hover:underline">GL</span>
        <span className="text-blue-600 cursor-pointer hover:underline">ES</span>
        <span className="text-blue-600 cursor-pointer hover:underline">PT</span>
        <span className="text-blue-600 cursor-pointer hover:underline">EN</span>
      </div>

      {/* Header */}
      <header className="text-center px-6 pt-4 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-3">
          Termas de Bande
        </h1>
        <p className="text-sm text-gray-500">
          Comprueba si termas estan abiertas<br />
          para poder visitarlas
        </p>
      </header>

      {/* Status Card */}
      <div className="px-6 mb-6">
        <div className="border border-gray-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-3 h-3 rounded-full ${isFlooded ? 'bg-red-500' : 'bg-green-500'}`}></span>
            <span className={`text-xl font-semibold ${isFlooded ? 'text-red-600' : 'text-green-600'}`}>
              {isFlooded ? 'Cerradas' : 'Abiertas'}
            </span>
          </div>
          {/* Progress bar showing how close to flood threshold */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${isFlooded ? 'bg-red-500' : 'bg-blue-500'}`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
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
      <div className="px-6 py-8">
        <div className="border border-gray-200 rounded-lg overflow-hidden max-w-lg mx-auto">
          {/* Blue Header */}
          <div className="bg-blue-600 text-white p-4">
            <p className="text-2xl font-bold mb-1">
              {waterLevelPercentage.toFixed(1).replace('.', ',')}% nivel de agua de embalse
            </p>
            {/* Progress bar */}
            <div className="w-full bg-blue-400 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-1000"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
          
          {/* Info Text */}
          <div className="p-4 text-sm text-gray-600 leading-relaxed">
            <p>
              Las termas de Bande están abiertas por temporada. A veces se encuentran inundadas 
              por el embalse cercano. Esta web monitoriza el nivel del agua para que sepas cuándo visitarlas. 
              El acceso a las termas es gratuito. La temperatura del agua varía entre 36 y 48 grados. 
              Los datos sobre el nivel del agua provienen de estaciones de monitorización locales.
            </p>
            <a 
              href="https://www.embalses.net/pantano-706-las-conchas.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              www.embalses.net
            </a>
          </div>
        </div>
      </div>

      {/* Location Link */}
      <div className="px-6 pb-4 text-center">
        <p className="text-sm text-gray-500">
          Las termas romanas de Bande se encuentran en{' '}
          <a 
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-700"
          >
            está ubicación
          </a>.
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

      {/* Footer with Logo */}
      <footer className="px-6 py-8">
        <img 
          src={escudoBande} 
          alt="Escudo de Bande" 
          className="h-16 w-auto"
        />
      </footer>
    </div>
  );
};

export default Index;
