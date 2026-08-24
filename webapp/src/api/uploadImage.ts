import { API_URL } from '../lib/config';

export interface UploadedImageResponse {
  original: {
    path: string;
    url: string;
  };

  preview: {
    path: string;
    url: string;
  };

  hero: {
    path: string;
    url: string;
  };
}

const makeAbsoluteUrl = (url: string): string => {
  return new URL(url, API_URL).toString();
};

export const uploadImage = async (
  file: File,
): Promise<UploadedImageResponse> => {
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

  const data = (await response.json()) as UploadedImageResponse;

  return {
    original: {
      path: data.original.path,
      url: makeAbsoluteUrl(data.original.url),
    },

    preview: {
      path: data.preview.path,
      url: makeAbsoluteUrl(data.preview.url),
    },

    hero: {
      path: data.hero.path,
      url: makeAbsoluteUrl(data.hero.url),
    },
  };
};
