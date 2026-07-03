export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append('image', file);

  const response = await fetch(
    'https://miniaturenickbackend-production.up.railway.app/upload/card-image',
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(errorText);
  }

  return response.json();
};
