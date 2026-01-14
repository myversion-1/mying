/**
 * Third-Party SEO API Integration
 * Supports SEMrush, Ahrefs, and Moz APIs
 */

export interface SEMrushConfig {
  apiKey: string;
  apiSecret?: string;
}

export interface AhrefsConfig {
  apiKey: string;
  apiSecret?: string;
}

export interface MozConfig {
  accessId: string;
  secretKey: string;
}

export interface ThirdPartyAPIConfig {
  semrush?: SEMrushConfig;
  ahrefs?: AhrefsConfig;
  moz?: MozConfig;
}

/**
 * Get API configuration from environment variables
 */
export function getThirdPartyAPIConfig(): ThirdPartyAPIConfig {
  return {
    semrush: process.env.SEMRUSH_API_KEY
      ? {
          apiKey: process.env.SEMRUSH_API_KEY,
          apiSecret: process.env.SEMRUSH_API_SECRET,
        }
      : undefined,
    ahrefs: process.env.AHREFS_API_KEY
      ? {
          apiKey: process.env.AHREFS_API_KEY,
          apiSecret: process.env.AHREFS_API_SECRET,
        }
      : undefined,
    moz: process.env.MOZ_ACCESS_ID && process.env.MOZ_SECRET_KEY
      ? {
          accessId: process.env.MOZ_ACCESS_ID,
          secretKey: process.env.MOZ_SECRET_KEY,
        }
      : undefined,
  };
}

/**
 * SEMrush API Integration
 * Documentation: https://www.semrush.com/api/
 */
export async function fetchSEMrushData(
  domain: string,
  config: SEMrushConfig
): Promise<{
  domainAuthority?: number;
  organicKeywords?: number;
  organicTraffic?: number;
  backlinks?: number;
  referringDomains?: number;
  lastUpdated?: string;
} | null> {
  try {
    // Domain Overview API
    const url = `https://api.semrush.com/?key=${config.apiKey}&type=domain_ranks&domain=${domain}&export_columns=Db,Dn,Rk,Or,Ot,Oc,Ad,At,Ac,FKn,FP`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`SEMrush API error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const text = await response.text();
    const lines = text.trim().split("\n");
    
    if (lines.length < 2) {
      return null;
    }
    
    // Parse CSV response
    const headers = lines[0].split(";");
    const data = lines[1].split(";");
    
    const result: Record<string, string> = {};
    headers.forEach((header, index) => {
      result[header] = data[index];
    });
    
    return {
      domainAuthority: result.Dn ? parseFloat(result.Dn) : undefined,
      organicKeywords: result.Or ? parseInt(result.Or, 10) : undefined,
      organicTraffic: result.Ot ? parseInt(result.Ot, 10) : undefined,
      backlinks: result.FKn ? parseInt(result.FKn, 10) : undefined,
      referringDomains: result.FP ? parseInt(result.FP, 10) : undefined,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("SEMrush API error:", error);
    return null;
  }
}

/**
 * Ahrefs API Integration
 * Documentation: https://ahrefs.com/api/documentation
 */
export async function fetchAhrefsData(
  domain: string,
  config: AhrefsConfig
): Promise<{
  domainRating?: number;
  organicKeywords?: number;
  organicTraffic?: number;
  backlinks?: number;
  referringDomains?: number;
  lastUpdated?: string;
} | null> {
  try {
    // Ahrefs Site Explorer API
    const url = `https://api.ahrefs.com/v3/site-explorer/domain-rating?target=${domain}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      console.error(`Ahrefs API error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    
    return {
      domainRating: data.domain_rating,
      organicKeywords: data.organic_keywords,
      organicTraffic: data.organic_traffic,
      backlinks: data.backlinks,
      referringDomains: data.referring_domains,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Ahrefs API error:", error);
    return null;
  }
}

/**
 * Moz API Integration
 * Documentation: https://moz.com/products/moz-api
 */
export async function fetchMozData(
  domain: string,
  config: MozConfig
): Promise<{
  domainAuthority?: number;
  pageAuthority?: number;
  linkingRootDomains?: number;
  lastUpdated?: string;
} | null> {
  try {
    // Generate Moz API signature
    const expires = Math.floor(Date.now() / 1000) + 300; // 5 minutes
    const stringToSign = `${config.accessId}\n${expires}`;
    
    // Note: In production, use crypto library to generate HMAC signature
    // This is a simplified version
    const url = `https://lsapi.seomoz.com/v2/url_metrics?targets=${encodeURIComponent(domain)}&col=103079215108`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.accessId}:${config.secretKey}`,
      },
    });
    
    if (!response.ok) {
      console.error(`Moz API error: ${response.status} ${response.statusText}`);
      return null;
    }
    
    const data = await response.json();
    
    return {
      domainAuthority: data.domain_authority,
      pageAuthority: data.page_authority,
      linkingRootDomains: data.linking_root_domains,
      lastUpdated: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Moz API error:", error);
    return null;
  }
}

/**
 * Fetch data from all configured third-party APIs
 */
export async function fetchAllThirdPartyData(
  domain: string
): Promise<{
  semrush?: any;
  ahrefs?: any;
  moz?: any;
}> {
  const config = getThirdPartyAPIConfig();
  const results: any = {};
  
  if (config.semrush) {
    results.semrush = await fetchSEMrushData(domain, config.semrush);
  }
  
  if (config.ahrefs) {
    results.ahrefs = await fetchAhrefsData(domain, config.ahrefs);
  }
  
  if (config.moz) {
    results.moz = await fetchMozData(domain, config.moz);
  }
  
  return results;
}

