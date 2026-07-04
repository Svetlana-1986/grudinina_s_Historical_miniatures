import { API_URL } from '../lib/config';

export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append('image', file);

  const response = await fetch(`${API_URL}/upload/card-image`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(errorText);
  }

  return response.json();
};
