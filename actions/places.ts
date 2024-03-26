'use server';

import db from '@/lib/db';

export async function getAllPlaces() {
  const places = await db.place.findMany();

  return places;
}

export async function getPlaceById(id: string) {
  const place = await db.place.findUnique({
    where: {
      id,
    },
  });

  return place;
}

export async function getPlaceByName(name: string) {
  const place = await db.place.findUnique({
    where: {
      name,
    },
  });

  return place;
}
