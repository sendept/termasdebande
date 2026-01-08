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
        
        // Try multiple CORS proxies
        const proxies = [
          `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`,
        ];

        let html = null;
        
        for (const proxyUrl of proxies) {
          try {
            const response = await fetch(proxyUrl);
            if (response.ok) {
              const text = await response.text();
              // Check if we got actual HTML content
              if (text.includes('embalses') || text.includes('%')) {
                html = text;
                break;
              }
            }
          } catch {
            continue;
          }
        }

        if (html) {
          // Parse the HTML to find the percentage - look for agua embalsada percentage
          // The site shows something like "48,75 %" 
          const percentMatch = html.match(/(\d{1,3})[,.](\d{1,2})\s*%/g);
          
          if (percentMatch && percentMatch.length > 0) {
            // Get the first percentage match (usually the main one)
            const firstMatch = percentMatch[0].match(/(\d{1,3})[,.](\d{1,2})/);
            if (firstMatch) {
              const percentage = parseFloat(`${firstMatch[1]}.${firstMatch[2]}`);
              setData({
                percentage,
                loading: false,
                error: null,
                lastUpdated: new Date(),
              });
              return;
            }
          }
          
          setData({
            percentage: null,
            loading: false,
            error: "No se pudo leer el nivel",
            lastUpdated: null,
          });
        } else {
          setData({
            percentage: null,
            loading: false,
            error: "No se pudo conectar",
            lastUpdated: null,
          });
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
