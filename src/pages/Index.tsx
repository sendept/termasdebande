import { ExternalLink, Droplets, ThermometerSun, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWaterLevel } from "@/hooks/useWaterLevel";

const FLOOD_THRESHOLD = 70;

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
        <div className="space-y-2">
          <div className="flex justify-center">
            <ThermometerSun className={`w-12 h-12 ${isFlooded ? 'text-amber-600' : 'text-emerald-600'}`} />
          </div>
          <h1 className="text-3xl font-light text-stone-800 tracking-tight">
            Termas de Bande
          </h1>
          <p className="text-stone-500 text-sm">
            Embalse Las Conchas, Galicia
          </p>
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
                    Actualizado: {lastUpdated.toLocaleTimeString('es-ES')}
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <a 
          href="https://www.embalses.net/pantano-706-las-conchas.html"
          target="_blank"
          rel="noopener noreferrer" 
          className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          Fuente: embalses.net
        </a>
      </div>
    </div>
  );
};

export default Index;
