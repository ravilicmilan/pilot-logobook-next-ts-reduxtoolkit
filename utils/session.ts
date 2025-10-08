'use client';

export default function getSession(): string | boolean | undefined {
  if (document && !document.cookie.includes('session')) {
    return false;
  }

  let cookieValue;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.includes('session')) {
      cookieValue = cookie.split('session=')[1];
    }
  }

  return cookieValue;
}
