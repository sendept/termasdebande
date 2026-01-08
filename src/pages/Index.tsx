import { ExternalLink, Droplets, ThermometerSun, Loader2, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWaterLevel } from "@/hooks/useWaterLevel";

const FLOOD_THRESHOLD = 70;
const MAPS_URL = "https://www.google.com/maps/place/Roman+Caldaria+of+Bande+(Hotsprings)/@41.9793225,-7.9818843,130m/data=!3m1!1e3!4m14!1m7!3m6!1s0xd2547bff013a7c7:0xe8fceefffe603cf5!2sRoman+Caldaria+of+Bande+(Hotsprings)!8m2!3d41.9793225!4d-7.9818843!16s%2Fg%2F11b6v6mh3k!3m5!1s0xd2547bff013a7c7:0xe8fceefffe603cf5!8m2!3d41.9793225!4d-7.9818843!16s%2Fg%2F11b6v6mh3k?hl=en&entry=ttu";

const Index = () => {
  const { percentage, loading, error, lastUpdated } = useWaterLevel();
  
  const isFlooded = percentage !== null && percentage >= FLOOD_THRESHOLD;
  const isAccessible = percentage !== null && percentage < FLOOD_THRESHOLD;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-700 ${
      isFlooded ? 'bg-gradient-to-b from-amber-50 to-amber-100' : 
      isAccessible ? 'bg-gradient-to-b from-emerald-50 to-stone-100' : 
      'bg-gradient-to-b from-stone-50 to-stone-100'
    }`}>
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex justify-center">
            <ThermometerSun className={`w-12 h-12 ${isFlooded ? 'text-amber-600' : isAccessible ? 'text-emerald-600' : 'text-stone-600'}`} />
          </div>
          <h1 className="text-3xl font-light text-stone-800 tracking-tight">
            Termas de Bande
          </h1>
          <a 
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-700 text-sm transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Embalse Las Conchas, Galicia
          </a>
        </div>

        {/* Status Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-8 space-y-6">
            {loading ? (
              <div className="flex flex-col items-center gap-3 py-8">
                <Loader2 className="w-8 h-8 animate-spin text-stone-400" />
                <p className="text-stone-500 text-sm">Consultando nivel del agua...</p>
              </div>
            ) : error ? (
              <div className="space-y-4">
                <p className="text-stone-600">{error}</p>
                <Button asChild variant="outline">
                  <a 
                    href="https://www.embalses.net/pantano-706-las-conchas.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Ver en embalses.net
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ) : (
              <>
                {/* Status */}
                <div className={`rounded-xl p-6 ${
                  isFlooded ? 'bg-amber-100' : 'bg-emerald-100'
                }`}>
                  <p className={`text-2xl font-medium ${
                    isFlooded ? 'text-amber-800' : 'text-emerald-800'
                  }`}>
                    {isFlooded ? '🌊 Termas inundadas' : '✨ Termas accesibles'}
                  </p>
                  <p className={`text-sm mt-2 ${
                    isFlooded ? 'text-amber-700' : 'text-emerald-700'
                  }`}>
                    {isFlooded 
                      ? 'Vuelve a consultar en unos días' 
                      : '¡Buen momento para visitarlas!'}
                  </p>
                </div>

                {/* Water Level */}
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-stone-600">
                    <Droplets className="w-4 h-4" />
                    <span className="text-sm">Nivel actual del embalse</span>
                  </div>
                  <p className="text-4xl font-light text-stone-800">
                    {percentage?.toFixed(1)}%
                  </p>
                  <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        isFlooded ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(percentage || 0, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-stone-400">
                    Umbral de inundación: {FLOOD_THRESHOLD}%
                  </p>
                </div>

                {/* Last updated */}
                {lastUpdated && (
                  <p className="text-xs text-stone-400">
                    Última actualización: {lastUpdated.toLocaleString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        <div className="text-left bg-white/60 backdrop-blur rounded-xl p-6 space-y-4">
          <p className="text-sm text-stone-600 leading-relaxed">
            Las Termas de Bande se encuentran inundadas en algunas épocas del año debido a la presa cercana, lo que significa que no se puede acceder a ellas. Esta web monitoriza el nivel del agua para que sepas cuándo visitarlas. Los datos provienen de estaciones de monitorización locales.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            El acceso a las termas es gratuito, pero por favor mantenlo limpio y no enciendas fuego.
          </p>
        </div>

        {/* Footer */}
        <a 
          href="https://www.embalses.net/pantano-706-las-conchas.html"
          target="_blank"
          rel="noopener noreferrer" 
          className="block text-xs text-stone-400 hover:text-stone-600 transition-colors uppercase tracking-wider"
        >
          Fuente: embalses.net
        </a>
      </div>
    </div>
  );
};

export default Index;
