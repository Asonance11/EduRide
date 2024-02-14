import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type CardProps = {
  title: string;
  description: string;
};

export default function LandingCard({ title, description }: CardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
