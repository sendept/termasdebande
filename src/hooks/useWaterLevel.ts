import { useState, useEffect } from "react";

interface WaterLevelData {
  percentage: number | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export const useWaterLevel = () => {
  const [data, setData] = useState<WaterLevelData>({
    percentage: null,
    loading: true,
    error: null,
    lastUpdated: null,
  });

  useEffect(() => {
    const fetchWaterLevel = async () => {
      try {
        const targetUrl = "https://www.embalses.net/pantano-706-las-conchas.html";
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(targetUrl)}`;
        
        const response = await fetch(proxyUrl);
        const result = await response.json();
        
        if (result.contents) {
          // Parse the HTML to find the percentage
          // Looking for pattern like "48,75%" or similar in the agua embalsada section
          const percentMatch = result.contents.match(/(\d{1,3})[,.](\d{1,2})\s*%/);
          
          if (percentMatch) {
            const percentage = parseFloat(`${percentMatch[1]}.${percentMatch[2]}`);
            setData({
              percentage,
              loading: false,
              error: null,
              lastUpdated: new Date(),
            });
          } else {
            setData({
              percentage: null,
              loading: false,
              error: "No se pudo leer el nivel",
              lastUpdated: null,
            });
          }
        }
      } catch (err) {
        setData({
          percentage: null,
          loading: false,
          error: "Error de conexión",
          lastUpdated: null,
        });
      }
    };

    fetchWaterLevel();
  }, []);

  return data;
};
