import * as React from 'react';
import dynamic from 'next/dynamic'
const MiniDrawer = dynamic(() => import('../src/menu'), {
  ssr: false,
})
import Portal from './portal';
import DefaultLayout from '../src/components/DefaultLayout';
export default function Index() {
  return (
    <DefaultLayout title="ComuDEV - Início">
      <Portal />

    </DefaultLayout>
  );
}
