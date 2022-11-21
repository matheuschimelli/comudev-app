import * as React from 'react';
import dynamic from 'next/dynamic'
const MiniDrawer = dynamic(() => import('../src/menu'), {
  ssr:false,
})
import Portal from './portal';
export default function Index() {
  return (
    <>
    <Portal/>
    </>
  );
}
