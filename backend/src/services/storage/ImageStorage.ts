export interface StoredImage {
  path: string;
  url: string;
}

export interface ImageStorage {
  save(path: string, buffer: Buffer, contentType: string): Promise<StoredImage>;

  delete(paths: string[]): Promise<void>;
}
