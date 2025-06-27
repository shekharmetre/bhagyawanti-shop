// app/(auth)/login/page.tsx
import { Suspense } from 'react';
import LoginPage from './LoginPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginPage />
    </Suspense>
  );
}
