import React from 'react';
import SelectRoleForm from '../_components/SelectRoleForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Select Role',
};

export default function SelectRolePage() {
  return <SelectRoleForm />;
}
