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

                    // codetabs is the reliable free proxy (corsproxy.io no longer works in production)
                    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;

                    const response = await fetch(proxyUrl);

                    if (!response.ok) {
                                throw new Error("Proxy error");
                    }

                    const html = await response.text();

                    if (!html.includes('embalses')) {
                                throw new Error("Unexpected response");
                    }

                    // Strategy 1: find today's row in the data table (most accurate — live reading)
                    const today = new Date();
                            const day = String(today.getDate()).padStart(2, '0');
                            const month = String(today.getMonth() + 1).padStart(2, '0');
                            const year = today.getFullYear();
                            const dateStr = `${day}-${month}-${year}`;

                    const dateIdx = html.indexOf(dateStr);
                            if (dateIdx > -1) {
                                        const snippet = html.substring(dateIdx, dateIdx + 300);
                                        const pctMatch = snippet.match(/(\d{1,3})[,.](\d{1,2})%/);
                                        if (pctMatch) {
                                                      const percentage = parseFloat(`${pctMatch[1]}.${pctMatch[2]}`);
                                                      setData({ percentage, loading: false, error: null, lastUpdated: new Date() });
                                                      return;
                                        }
                            }

                    // Strategy 2: fallback — og:description meta tag (weekly figure, still useful)
                    const ogMatch = html.match(/og:description[^>]+content="[^"]*?(\d{1,3})[.,](\d{1,2})%/);
                            if (ogMatch) {
                                        const percentage = parseFloat(`${ogMatch[1]}.${ogMatch[2]}`);
                                        setData({ percentage, loading: false, error: null, lastUpdated: new Date() });
                                        return;
                            }

                    setData({
                                percentage: null,
                                loading: false,
                                error: "No se pudo leer el nivel",
                                lastUpdated: null,
                    });

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

                  // Refresh every 30 minutes
                  const interval = setInterval(fetchWaterLevel, 30 * 60 * 1000);
          return () => clearInterval(interval);
    }, []);

    return data;
};
