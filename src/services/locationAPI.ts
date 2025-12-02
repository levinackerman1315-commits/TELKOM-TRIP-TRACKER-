
// // src/services/locationAPI.ts
// import axios from 'axios';
// import { LocationSuggestion, RouteResult } from '@/types';

// // ✅ CACHE untuk mengurangi API calls
// const searchCache = new Map<string, [LocationSuggestion[], number]>();
// const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

// // ✅ Retry mechanism untuk API yang unstable
// const retryRequest = async <T>(fn: () => Promise<T>, retries = 2): Promise<T> => {
//   try {
//     return await fn();
//   } catch (error) {
//     if (retries > 0) {
//       console.log(`Retrying request... ${retries} attempts left`);
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       return retryRequest(fn, retries - 1);
//     }
//     throw error;
//   }
// };

// export const searchLocations = async (query: string): Promise<LocationSuggestion[]> => {
//   const normalizedQuery = query.trim().toLowerCase();
  
//   if (!normalizedQuery || normalizedQuery.length < 3) {
//     return [];
//   }

//   // ✅ Cek cache dulu
//   const cacheKey = normalizedQuery;
//   const cached = searchCache.get(cacheKey);
//   if (cached) {
//     const [data, timestamp] = cached;
//     if (typeof timestamp === 'number' && Date.now() - timestamp < CACHE_DURATION) {
//       return data;
//     }
//     searchCache.delete(cacheKey); // Cache expired
//   }

//   try {
//     const results = await retryRequest(async () => {
//       const response = await axios.get('https://nominatim.openstreetmap.org/search', {
//         params: {
//           q: normalizedQuery,
//           format: 'json',
//           addressdetails: 1,
//           limit: 8,
//           countrycodes: 'id',
//           'accept-language': 'id',
//           namedetails: 1,
//           featuretype: 'street,city,county,state',
//         },
//         headers: {
//           'User-Agent': 'TripTrackerApp/1.0 (your-email@domain.com)',
//         },
//         timeout: 8000, // Timeout lebih pendek
//       });
//       return response.data;
//     });

//     // ✅ FILTER & SORT yang lebih baik
//     const filteredResults = results
//       .filter((location: any) => {
//         const address = location.address;
//         if (address.country_code !== 'id') return false;
        
//         // Prioritaskan yang punya detail address lengkap
//         const hasGoodAddress = address.road || address.city || address.town || address.village;
//         const isSpecificEnough = normalizedQuery.length > 5 || 
//                                 (address.road && address.city) || 
//                                 address.town || 
//                                 address.village;
        
//         return hasGoodAddress && isSpecificEnough;
//       })
//       .sort((a: any, b: any) => {
//         // Scoring system untuk ranking hasil
//         const getScore = (location: any) => {
//           const addr = location.address;
//           let score = 0;
//           if (addr.road) score += 10;
//           if (addr.city) score += 8;
//           if (addr.town) score += 6;
//           if (addr.village) score += 4;
//           if (addr.county) score += 2;
//           // Bonus untuk yang lebih spesifik
//           if (location.display_name.toLowerCase().includes(normalizedQuery)) score += 5;
//           return score;
//         };

//         return getScore(b) - getScore(a);
//       })
//       .slice(0, 5); // Max 5 results

//     // ✅ Simpan ke cache
//     searchCache.set(cacheKey, [filteredResults, Date.now()]);
    
//     return filteredResults;
//   } catch (error) {
//     console.error('Failed to search locations:', error);
    
//     // ✅ Fallback ke cache yang ada meskipun expired
//     if (cached) {
//       console.log('Using expired cache as fallback');
//       return cached[0] as LocationSuggestion[];
//     }
    
//     return [];
//   }
// };

// // ✅ OSRM API dengan error handling lebih baik
// export const calculateDistance = async (
//   startLat: number,
//   startLon: number,
//   endLat: number,
//   endLon: number
// ): Promise<RouteResult | null> => {
//   // ✅ Validasi koordinat
//   if (!isValidCoordinate(startLat, startLon) || !isValidCoordinate(endLat, endLon)) {
//     console.error('Invalid coordinates provided');
//     return null;
//   }

//   try {
//     const response = await retryRequest(async () => {
//       return await axios.get(
//         `http://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}`,
//         {
//           params: {
//             overview: 'false',
//             alternatives: 'false',
//             steps: 'false',
//           },
//           timeout: 10000,
//         }
//       );
//     });

//     if (response.data.routes && response.data.routes.length > 0) {
//       const route = response.data.routes[0];
      
//       // ✅ Validasi response OSRM
//       if (route.distance > 0 && route.duration > 0) {
//         return {
//           distance: route.distance,
//           duration: route.duration,
//         };
//       }
//     }
    
//     console.warn('OSRM returned invalid route data');
//     return null;
//   } catch (error) {
//     console.error('Failed to calculate distance:', error);
//     return null;
//   }
// };

// // ✅ Helper: Validasi koordinat
// const isValidCoordinate = (lat: number, lon: number): boolean => {
//   return !isNaN(lat) && !isNaN(lon) && 
//          lat >= -90 && lat <= 90 && 
//          lon >= -180 && lon <= 180;
// };

// // Helper functions lainnya tetap sama...
// export const metersToKm = (meters: number): number => {
//   return Math.round(meters / 1000);
// };

// export const secondsToHours = (seconds: number): string => {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);

//   if (hours > 0) {
//     return `${hours}h ${minutes}m`;
//   }
//   return `${minutes}m`;
// };

// const COST_PER_KM = 5000;

// export const estimateBudget = (distanceInKm: number): number => {
//   return distanceInKm * COST_PER_KM;
// };

// export const formatCurrency = (amount: number): string => {
//   return new Intl.NumberFormat('id-ID', {
//     style: 'currency',
//     currency: 'IDR',
//     minimumFractionDigits: 0,
//   }).format(amount);
// };




// src/services/locationAPI.ts
import axios from 'axios';
import { LocationSuggestion, RouteResult } from '@/types';

// ✅ CACHE untuk mengurangi API calls
const searchCache = new Map<string, [LocationSuggestion[], number]>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

// ✅ Retry mechanism untuk API yang unstable
const retryRequest = async <T>(fn: () => Promise<T>, retries = 2): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying request... ${retries} attempts left`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryRequest(fn, retries - 1);
    }
    throw error;
  }
};

export const searchLocations = async (query: string): Promise<LocationSuggestion[]> => {
  const normalizedQuery = query.trim().toLowerCase();
  
  if (!normalizedQuery || normalizedQuery.length < 3) {
    return [];
  }

  // ✅ Cek cache dulu
  const cacheKey = normalizedQuery;
  const cached = searchCache.get(cacheKey);
  if (cached) {
    const [data, timestamp] = cached;
    if (typeof timestamp === 'number' && Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
    searchCache.delete(cacheKey); // Cache expired
  }

  try {
    const results = await retryRequest(async () => {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: normalizedQuery,
          format: 'json',
          addressdetails: 1,
          limit: 10, // ✅ Naikkan limit karena kita akan filter
          countrycodes: 'id',
          'accept-language': 'id',
          namedetails: 1,
          // ✅ HAPUS featuretype agar bisa detect semua jenis tempat
          // Termasuk amenity (kantor), building, dll
        },
        headers: {
          'User-Agent': 'TripTrackerApp/1.0 (your-email@domain.com)',
        },
        timeout: 8000,
      });
      return response.data;
    });

    // ✅ FILTER & SORT yang lebih baik
    const filteredResults = results
      .filter((location: any) => {
        const address = location.address;
        if (address.country_code !== 'id') return false;
        
        // ✅ PERBAIKAN: Accept lebih banyak jenis lokasi
        const hasGoodAddress = 
          address.road || 
          address.city || 
          address.town || 
          address.village || 
          address.amenity ||  // ✅ Kantor, gedung publik
          address.building ||  // ✅ Gedung komersial
          address.office;      // ✅ Kantor

        // ✅ Untuk tempat spesifik (seperti "Telkom Akses"), check nama
        const hasSpecificName = location.name || location.display_name;
        
        const isSpecificEnough = 
          normalizedQuery.length > 5 || 
          (address.road && address.city) || 
          address.town || 
          address.village ||
          hasSpecificName; // ✅ Accept tempat dengan nama spesifik
        
        return hasGoodAddress && isSpecificEnough;
      })
      .sort((a: any, b: any) => {
        // ✅ IMPROVED: Scoring system untuk ranking hasil
        const getScore = (location: any) => {
          const addr = location.address;
          const name = location.name?.toLowerCase() || '';
          const displayName = location.display_name.toLowerCase();
          
          let score = 0;
          
          // ✅ Bonus besar kalau nama persis match
          if (name === normalizedQuery) score += 50;
          if (displayName.includes(normalizedQuery)) score += 20;
          
          // Score untuk detail address
          if (addr.amenity) score += 15; // Kantor, gedung publik
          if (addr.building) score += 12; // Gedung komersial
          if (addr.office) score += 10;   // Kantor spesifik
          if (addr.road) score += 10;
          if (addr.city) score += 8;
          if (addr.town) score += 6;
          if (addr.village) score += 4;
          if (addr.county) score += 2;
          
          return score;
        };

        return getScore(b) - getScore(a);
      })
      .slice(0, 5); // Max 5 results

    // ✅ Simpan ke cache
    searchCache.set(cacheKey, [filteredResults, Date.now()]);
    
    return filteredResults;
  } catch (error) {
    console.error('Failed to search locations:', error);
    
    // ✅ Fallback ke cache yang ada meskipun expired
    if (cached) {
      console.log('Using expired cache as fallback');
      return cached[0] as LocationSuggestion[];
    }
    
    return [];
  }
};

// ✅ OSRM API dengan error handling lebih baik
export const calculateDistance = async (
  startLat: number,
  startLon: number,
  endLat: number,
  endLon: number
): Promise<RouteResult | null> => {
  // ✅ Validasi koordinat
  if (!isValidCoordinate(startLat, startLon) || !isValidCoordinate(endLat, endLon)) {
    console.error('Invalid coordinates provided');
    return null;
  }

  try {
    const response = await retryRequest(async () => {
      return await axios.get(
        `http://router.project-osrm.org/route/v1/driving/${startLon},${startLat};${endLon},${endLat}`,
        {
          params: {
            overview: 'false',
            alternatives: 'false',
            steps: 'false',
          },
          timeout: 10000,
        }
      );
    });

    if (response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      
      // ✅ Validasi response OSRM
      if (route.distance > 0 && route.duration > 0) {
        return {
          distance: route.distance,
          duration: route.duration,
        };
      }
    }
    
    console.warn('OSRM returned invalid route data');
    return null;
  } catch (error) {
    console.error('Failed to calculate distance:', error);
    return null;
  }
};

// ✅ Helper: Validasi koordinat
const isValidCoordinate = (lat: number, lon: number): boolean => {
  return !isNaN(lat) && !isNaN(lon) && 
         lat >= -90 && lat <= 90 && 
         lon >= -180 && lon <= 180;
};

export const metersToKm = (meters: number): number => {
  return Math.round(meters / 1000);
};

export const secondsToHours = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

const COST_PER_KM = 5000;

export const estimateBudget = (distanceInKm: number): number => {
  return distanceInKm * COST_PER_KM;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};