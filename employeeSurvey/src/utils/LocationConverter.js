// Create a mapping system for locations, functions, and subfunctions
export const createOrganizationMappings = (organizationStructure) => {
  const locationMap = {};
  const functionMap = {};
  const subFunctionMap = {};
  
  // Reverse maps (ID to value)
  const locationsById = {};
  const functionsById = {};
  const subFunctionsById = {};
  
  let locationId = 1;
  let functionId = 1;
  let subFunctionId = 1;
  
  // Create mappings for all locations, functions, and subfunctions
  Object.keys(organizationStructure).forEach(location => {
    // Map location to ID
    locationMap[location] = locationId;
    locationsById[locationId] = location;
    locationId++;
    
    // Process functions for this location
    Object.keys(organizationStructure[location]).forEach(functionName => {
      // Create unique function ID
      functionMap[`${location}|${functionName}`] = functionId;
      functionsById[functionId] = {
        locationId: locationMap[location],
        name: functionName
      };
      functionId++;
      
      // Process subfunctions for this function
      organizationStructure[location][functionName].forEach(subFunction => {
        // Create unique subfunction ID
        subFunctionMap[`${location}|${functionName}|${subFunction}`] = subFunctionId;
        subFunctionsById[subFunctionId] = {
          locationId: locationMap[location],
          functionId: functionMap[`${location}|${functionName}`],
          name: subFunction
        };
        subFunctionId++;
      });
    });
  });
  
  return {
    // Maps for converting string values to IDs
    locationMap,
    functionMap,
    subFunctionMap,
    
    // Maps for converting IDs back to string values
    locationsById,
    functionsById,
    subFunctionsById,
    
    // Helper functions to get IDs from strings
    getLocationId: (location) => locationMap[location] || null,
    
    getFunctionId: (location, functionName) => {
      const key = `${location}|${functionName}`;
      return functionMap[key] || null;
    },
    
    getSubFunctionId: (location, functionName, subFunction) => {
      const key = `${location}|${functionName}|${subFunction}`;
      return subFunctionMap[key] || null;
    },
    
    // Helper functions to convert IDs back to strings
    getLocationById: (id) => locationsById[id] || null,
    
    getFunctionById: (id) => {
      const funcInfo = functionsById[id] || null;
      return funcInfo ? funcInfo.name : null;
    },
    
    getSubFunctionById: (id) => {
      const subFuncInfo = subFunctionsById[id] || null;
      return subFuncInfo ? subFuncInfo.name : null;
    },
    
    // Helper to get location by function ID
    getLocationByFunctionId: (functionId) => {
      const funcInfo = functionsById[functionId];
      return funcInfo ? locationsById[funcInfo.locationId] : null;
    },
    
    // Helper to get location and function by subfunction ID
    getParentsBySubFunctionId: (subFunctionId) => {
      const subFuncInfo = subFunctionsById[subFunctionId];
      if (!subFuncInfo) return null;
      
      return {
        location: locationsById[subFuncInfo.locationId],
        function: functionsById[subFuncInfo.functionId].name
      };
    },
    
    // Convert data from database (with IDs) to display format (with strings)
    convertFromDatabase: (data) => {
      if (!data) return null;
      
      const result = { ...data };
      
      // Process employment addresses
      if (Array.isArray(result.employmentAddresses)) {
        result.employmentAddresses = result.employmentAddresses.map(address => {
          const location = locationsById[address.locationId] || "";
          const functionName = address.functionId ? functionsById[address.functionId]?.name || "" : "";
          const subFunction = address.subFunctionId ? subFunctionsById[address.subFunctionId]?.name || "" : "";
          
          return {
            ...address,
            location,
            function: functionName,
            subFunction
          };
        });
      }
      
      // Process promotions
      if (Array.isArray(result.promotions)) {
        result.promotions = result.promotions.map(promotion => {
          const location = locationsById[promotion.locationId] || "";
          const functionName = promotion.functionId ? functionsById[promotion.functionId]?.name || "" : "";
          const subFunction = promotion.subFunctionId ? subFunctionsById[promotion.subFunctionId]?.name || "" : "";
          
          return {
            ...promotion,
            location,
            function: functionName,
            subFunction
          };
        });
      }
      
      return result;
    },
    
    // Convert data for database (with string values to IDs)
    convertForDatabase: (data) => {
      if (!data) return null;
      
      const result = { ...data };
      
      // Process employment addresses
      if (Array.isArray(result.employmentAddresses)) {
        result.employmentAddresses = result.employmentAddresses.map(address => {
          const locationId = locationMap[address.location] || null;
          const functionId = functionMap[`${address.location}|${address.function}`] || null;
          const subFunctionId = subFunctionMap[`${address.location}|${address.function}|${address.subFunction}`] || null;
          
          return {
            ...address,
            locationId,
            functionId,
            subFunctionId
          };
        });
      }
      
      // Process promotions
      if (Array.isArray(result.promotions)) {
        result.promotions = result.promotions.map(promotion => {
          const locationId = locationMap[promotion.location] || null;
          const functionId = functionMap[`${promotion.location}|${promotion.function}`] || null;
          const subFunctionId = subFunctionMap[`${promotion.location}|${promotion.function}|${promotion.subFunction}`] || null;
          
          return {
            ...promotion,
            locationId,
            functionId,
            subFunctionId
          };
        });
      }
      
      return result;
    }
  };
};