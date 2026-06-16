export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append('image', file);

  const response = await fetch('http://localhost:3000/upload/card-image', {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  return response.json();
};
