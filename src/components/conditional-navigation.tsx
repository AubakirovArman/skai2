'use client';

import { useSession } from 'next-auth/react';
import { Navigation } from './navigation';
import { useEffect } from 'react';

export function ConditionalNavigation() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      if (session) {
        mainElement.style.marginLeft = '0';
        mainElement.style.paddingTop = '4rem'; // 64px для высоты навигации
      } else {
        mainElement.style.marginLeft = '0';
        mainElement.style.paddingTop = '0';
      }
    }
  }, [session]);

  // Показываем навигацию только для авторизованных пользователей
  if (status === 'loading') {
    return null; // Не показываем навигацию во время загрузки
  }

  if (!session) {
    return null; // Не показываем навигацию для неавторизованных пользователей
  }

  return <Navigation />;
}