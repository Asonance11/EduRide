import React from 'react';

export default async function RidePage({ params }: { params: { id: string } }) {
  const id = params.id;
  return <div>This is a page with id {id}</div>;
}
