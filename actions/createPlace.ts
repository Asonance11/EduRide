'use server';
import db from '@/lib/db';

export async function createPlace(name: string, lat: number, long: number) {
  await db.place.create({
    data: {
      name: name,
      latitude: lat,
      longitude: long,
    },
  });
}
