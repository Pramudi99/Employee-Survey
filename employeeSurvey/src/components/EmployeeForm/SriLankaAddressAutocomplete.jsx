import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';

const SriLankaAddressAutocomplete = ({ apiKey }) => {
  // State for all address fields
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [gramaSewakaDivision, setGramaSewakaDivision] = useState('');
  const [policeDivision, setPoliceDivision] = useState('');
  const [agaDivision, setAgaDivision] = useState('');
  const [electoralDivision, setElectoralDivision] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reference to the autocomplete input
  const autocompleteInputRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Load Google Maps API script
  useEffect(() => {
    if (!apiKey) {
      setError('API key is required');
      return;
    }

    const loadGoogleMapsScript = () => {
      if (window.google) return;
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initAutocomplete;
      script.onerror = () => setError('Failed to load Google Maps API');
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();

    return () => {
      // Cleanup if needed
    };
  }, [apiKey]);

  // Initialize Google Places Autocomplete
  const initAutocomplete = () => {
    if (!window.google || !autocompleteInputRef.current) return;

    // Bias the search to Sri Lanka
    const options = {
      componentRestrictions: { country: 'lk' },
      fields: ['address_components', 'geometry', 'formatted_address']
    };

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      autocompleteInputRef.current,
      options
    );

    // Add listener for place selection
    autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
  };

  // Handle place selection
  const handlePlaceSelect = () => {
    setLoading(true);
    setError(null);

    try {
      const place = autocompleteRef.current.getPlace();
      
      if (!place || !place.address_components) {
        setError('No address details found');
        setLoading(false);
        return;
      }

      setAddress(place.formatted_address || '');

      // Extract address components
      const addressComponents = place.address_components;
      
      // Reset all fields
      setPostalCode('');
      setProvince('');
      setDistrict('');
      setGramaSewakaDivision('');
      setPoliceDivision('');
      setAgaDivision('');
      setElectoralDivision('');

      // Map address components to our fields
      for (const component of addressComponents) {
        const types = component.types;

        // Postal code
        if (types.includes('postal_code')) {
          setPostalCode(component.long_name);
        }
        
        // Province
        if (types.includes('administrative_area_level_1')) {
          setProvince(component.long_name);
        }
        
        // District
        if (types.includes('administrative_area_level_2')) {
          setDistrict(component.long_name);
        }

        // Try to determine other Sri Lankan specific divisions
        // These aren't standard Google types, so we need to make educated guesses
        if (types.includes('sublocality_level_1') || types.includes('sublocality')) {
          // This might be AGA Division or DS Division in Sri Lanka
          setAgaDivision(component.long_name);
        }

        if (types.includes('sublocality_level_2')) {
          // This might correspond to Grama Sewaka Division
          setGramaSewakaDivision(component.long_name);
        }

        if (types.includes('locality')) {
          // This might help with Electoral Division or Police Division
          // Often Police Divisions align with major localities
          setPoliceDivision(component.long_name);
          setElectoralDivision(component.long_name);
        }
      }

      // For Sri Lanka specific divisions, we might need to make additional API calls
      // or use a custom database/mapping since Google doesn't provide these directly
      supplementWithSriLankaSpecificData(place.geometry.location.lat(), place.geometry.location.lng());
      
    } catch (err) {
      setError('Error processing address: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // This function would ideally call your backend API that has Sri Lanka specific mapping data
  // For now, it's a placeholder that would need to be implemented with real data
  const supplementWithSriLankaSpecificData = (lat, lng) => {
    // In a real implementation, you would:
    // 1. Call your backend API with the lat/lng
    // 2. Your backend would look up the specific Sri Lankan administrative divisions
    // 3. Return the data to be displayed
    
    console.log(`Would look up specific Sri Lankan divisions for coordinates: ${lat}, ${lng}`);
    
    // For demonstration, you might want to add some sample mappings here
    // but for a real implementation, this would come from your backend
    // This is just a placeholder
    /*
    if (district === 'Colombo') {
      setPoliceDivision('Colombo Central Police Division');
      setElectoralDivision('Colombo Electoral District');
      // etc.
    }
    */
  };

  return (
    <Paper elevation={3} sx={{ p: 3, my: 2 }}>
      <Typography variant="h5" gutterBottom>
        Sri Lanka Address Finder
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Enter your address in Sri Lanka"
            variant="outlined"
            inputRef={autocompleteInputRef}
            placeholder="Start typing your address..."
            helperText="Type your address to get details automatically filled"
          />
        </Grid>

        {loading && (
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <CircularProgress size={24} />
          </Grid>
        )}

        {error && (
          <Grid item xs={12}>
            <Box sx={{ color: 'error.main', mt: 1 }}>
              {error}
            </Box>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Postal Code"
            variant="outlined"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Province"
            variant="outlined"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="District"
            variant="outlined"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            InputProps={{ readOnly: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Grama Sewaka Division"
            variant="outlined"
            value={gramaSewakaDivision}
            onChange={(e) => setGramaSewakaDivision(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Police Division"
            variant="outlined"
            value={policeDivision}
            onChange={(e) => setPoliceDivision(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="A.G.A Division"
            variant="outlined"
            value={agaDivision}
            onChange={(e) => setAgaDivision(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Electoral Division"
            variant="outlined"
            value={electoralDivision}
            onChange={(e) => setElectoralDivision(e.target.value)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SriLankaAddressAutocomplete;



