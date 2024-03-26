'use client';

import { getPlaceByName } from '@/actions/places';
import { bookRide } from '@/actions/rides';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DestinationContext } from '@/context/DestinationContext';
import { SourceContext } from '@/context/SourceContext';
import { useSourceStore } from '@/stores/pickupStore';
import { bookRideFormSchema } from '@/types/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Place } from '@prisma/client';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

interface BookRideFormProps {
  places: Place[];
}

export default function BookRideForm({ places }: BookRideFormProps) {
  const { pickup, setPickup } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const form = useForm<z.infer<typeof bookRideFormSchema>>({
    resolver: zodResolver(bookRideFormSchema),
    defaultValues: {
      pickupPoint: '',
      destination: '',
    },
  });

  async function onSubmit(values: z.infer<typeof bookRideFormSchema>) {
    console.log(values);
    const sourcePlace = await getPlaceByName(values.pickupPoint);
    const destinationPlace = await getPlaceByName(values.destination);
    setPickup({
      name: sourcePlace?.name,
      lat: sourcePlace?.latitude,
      lng: sourcePlace?.longitude,
    });
    setDestination({
      name: destinationPlace?.name,
      lat: destinationPlace?.latitude,
      lng: destinationPlace?.longitude,
    });
    // const response = await bookRide(values);
    // if (response?.error) {
    //   return toast.error(response.error);
    // }
    //
    // return toast.success('Ride booked successfully');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="pickupPoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Point</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pickup point" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {places.map((place) => (
                    <SelectItem key={place.id} value={place.name}>
                      {place.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>This is your pickup point</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Point</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {places.map((place) => (
                    <SelectItem key={place.id} value={place.name}>
                      {place.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>This is your destination</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {form.formState.isSubmitting ? <Loader /> : 'Book Ride'}
        </Button>
      </form>
    </Form>
  );
}
