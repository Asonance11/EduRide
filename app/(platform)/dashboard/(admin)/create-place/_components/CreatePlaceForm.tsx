'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createPlaceFormSchema } from '@/types/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function CreatePlaceForm() {
  // testing places api
  const [value, setValue] = useState<any>(null);
  const form = useForm<z.infer<typeof createPlaceFormSchema>>({
    resolver: zodResolver(createPlaceFormSchema),
    defaultValues: {
      name: '',
      alias: '',
    },
  });

  function onSubmit(values: z.infer<typeof createPlaceFormSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Place</FormLabel>
              <FormControl>
                <Input placeholder="Nelson Mandela" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alias of Place</FormLabel>
              <FormControl>
                <Input placeholder="Mandela" {...field} required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <GooglePlacesAutocomplete
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
          selectProps={{
            value,
            onChange: setValue,
            isClearable: true,
            placeholder: 'Search for a place',
            className: 'w-full',
            components: {
              DropdownIndicator: () => null,
            },
            styles: {
              input: (provided) => ({
                ...provided,
                color: 'blue',
              }),
              option: (provided) => ({
                ...provided,
                color: 'blue',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'blue',
              }),
            },
          }}
        />
        <Button type="submit">Create Place</Button>
      </form>
    </Form>
  );
}

export default CreatePlaceForm;
