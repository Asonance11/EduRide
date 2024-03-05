'use client';

import { bookRide } from '@/actions/rides';
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
import { Input } from '@/components/ui/input';
import { bookRideFormSchema } from '@/types/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function BookRideForm() {
  const form = useForm<z.infer<typeof bookRideFormSchema>>({
    resolver: zodResolver(bookRideFormSchema),
    defaultValues: {
      pickupPoint: '',
      destination: '',
    },
  });

  async function onSubmit(values: z.infer<typeof bookRideFormSchema>) {
    console.log(values);
    const response = await bookRide(values);
    if (response?.error) {
      return toast.error(response.error);
    }

    return toast.success('Ride booked successfully');
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
              <FormControl>
                <Input placeholder="Nelson Mandela" {...field} required />
              </FormControl>
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
              <FormControl>
                <Input placeholder="SAT" {...field} required />
              </FormControl>
              <FormDescription>This is your destination</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Book Ride
        </Button>
      </form>
    </Form>
  );
}
