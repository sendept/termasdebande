import { ExternalLink, Droplets, ThermometerSun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex justify-center">
            <ThermometerSun className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-3xl font-light text-stone-800 tracking-tight">
            Termas de Bande
          </h1>
          <p className="text-stone-500 text-sm">
            Embalse Las Conchas, Galicia
          </p>
        </div>

        {/* Info Card */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-8 space-y-6">
            <div className="flex items-center justify-center gap-2 text-stone-600">
              <Droplets className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Estado del agua</span>
            </div>
            
            <div className="space-y-4 text-left bg-stone-50 rounded-lg p-4">
              <p className="text-stone-700 text-sm leading-relaxed">
                Las aguas termales naturales se encuentran cerca del embalse. 
                Cuando el nivel del agua supera el <strong>70%</strong>, 
                las termas quedan sumergidas.
              </p>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-stone-600">Bajo 70% → Termas accesibles</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-stone-600">Sobre 70% → Termas inundadas</span>
              </div>
            </div>

            <Button 
              asChild
              className="w-full bg-stone-800 hover:bg-stone-700 text-white"
            >
              <a 
                href="https://www.embalses.net/pantano-706-las-conchas.html" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Ver nivel actual
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-xs text-stone-400">
          Datos: embalses.net
        </p>
      </div>
    </div>
  );
};

export default Index;
