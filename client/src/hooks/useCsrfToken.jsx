const getCsrfToken = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/csrf-token`, {
      credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

export default getCsrfToken;
