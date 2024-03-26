'use client';

import { createPlace } from '@/actions/createPlace';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { toast } from 'sonner';

function CreatePlaceForm() {
  // testing places api
  const [value, setValue] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [long, setLong] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      getlatandlng(value);
      await createPlace(name, lat, long);
      toast.success('Place created');
    } catch (error) {
      toast.error('Failed to create place');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function getlatandlng(place: any) {
    const placeId = place.value.place_id;
    const service = new google.maps.places.PlacesService(
      document.createElement('div'),
    );
    service.getDetails({ placeId }, (place, status) => {
      if (status == 'OK' && place?.geometry && place.geometry.location) {
        const { lat, lng } = place.geometry.location;
        if (!place.name) return console.log('no name');
        const name = place.name;
        setName(name);
        setLat(lat());
        setLong(lng());
      }
    });
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        onSubmit(e);
      }}
    >
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        selectProps={{
          name: 'location',
          value,
          onChange: (place) => {
            getlatandlng(place);
            setValue(place);
          },
          isClearable: true,
          placeholder: 'Search for a place',
          className: 'w-full',
          components: {
            DropdownIndicator: () => null,
          },
          styles: {
            input: (provided) => ({
              ...provided,
              color: 'black',
            }),
            option: (provided) => ({
              ...provided,
              color: 'black',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black',
            }),
          },
        }}
      />
      <Button type="submit">{loading ? <Loader /> : 'Create Place'}</Button>
    </form>
  );
}

export default CreatePlaceForm;
