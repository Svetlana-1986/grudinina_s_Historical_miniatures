import { uploadImage } from '../../api/uploadImage';
import { useFormik } from 'formik';
import { Segment } from '../../components/Segment';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { Alert } from '../../components/Alert';
import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc';
import {
  zCreateCardTrpcInput,
  type CreateCardInput,
} from '@miniaturenick/backend/createCard/input';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { HistoricalPeriod } from '@prisma/client';
import { historicalPeriodOptions } from '../../lib/historicalPeriods';
import { Select } from '../../components/Select';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useRef } from 'react';
import css from './index.module.scss';

export const NewCardPage = () => {
  const { isAuthorized, isLoading } = useAuth();

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const [coverFile, setCoverFile] = useState<File | null>(null);

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const coverInputRef = useRef<HTMLInputElement>(null);

  const galleryInputRef = useRef<HTMLInputElement>(null);

  const createCard = trpc.createCard.useMutation();

  const formik = useFormik<CreateCardInput>({
    initialValues: {
      title: '',
      historicalPeriod: HistoricalPeriod.ANCIENT,
      description: '',
      coverImage: undefined,
      coverImagePreview: undefined,
      coverImageHero: undefined,
      images: [],
    },

    validate: withZodSchema(zCreateCardTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);

        let coverImage: string | undefined;
        let coverImagePreview: string | undefined;
        let coverImageHero: string | undefined;

        if (coverFile) {
          const uploadedCover = await uploadImage(coverFile);

          coverImage = uploadedCover.originalUrl;

          coverImagePreview = uploadedCover.previewUrl;

          coverImageHero = uploadedCover.heroUrl;
        }

        const galleryUrls: string[] = [];

        for (const file of galleryFiles) {
          const uploadedImage = await uploadImage(file);

          galleryUrls.push(uploadedImage.originalUrl);
        }

        await createCard.mutateAsync({
          ...values,

          coverImage,

          coverImagePreview,

          coverImageHero,

          images: galleryUrls,
        });

        formik.resetForm();

        setCoverFile(null);

        setGalleryFiles([]);

        if (coverInputRef.current) {
          coverInputRef.current.value = '';
        }

        if (galleryInputRef.current) {
          galleryInputRef.current.value = '';
        }

        setSuccessMessageVisible(true);

        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error) {
        setSubmittingError(
          error instanceof Error ? error.message : 'Произошла ошибка',
        );
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
  });
  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <Segment title="Новая миниатюра">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input<CreateCardInput>
            name="title"
            label="Название"
            formik={formik}
          />
          <Select
            label="Период"
            name="historicalPeriod"
            value={formik.values.historicalPeriod}
            options={historicalPeriodOptions}
            onChange={formik.handleChange}
          />
          <div className={css.uploadRow}>
            <label className={css.fileButton} htmlFor="cover-upload">
              Выбрать главное фото
            </label>

            <input
              id="cover-upload"
              ref={coverInputRef}
              className={css.hiddenInput}
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];

                setCoverFile(file ?? null);
              }}
            />

            <div className={css.fileInfo}>
              {coverFile
                ? `Главное фото: ${coverFile.name}`
                : 'Главное фото не выбрано'}
            </div>
          </div>
          <div className={css.uploadRow}>
            <label className={css.fileButton} htmlFor="gallery-upload">
              Добавить фотографии
            </label>

            <input
              id="gallery-upload"
              ref={galleryInputRef}
              className={css.hiddenInput}
              type="file"
              multiple
              accept="image/*"
              onChange={(event) => {
                const files = Array.from(event.currentTarget.files ?? []);

                setGalleryFiles((prev) => [...prev, ...files]);
              }}
            />

            <div className={css.fileInfo}>
              {galleryFiles.length > 0
                ? `Загружено фотографий: ${galleryFiles.length}`
                : 'Фотографии не выбраны'}
            </div>
          </div>

          <TextArea<CreateCardInput>
            name="description"
            label="Описание миниатюры"
            formik={formik}
          />
          {!!submittingError && <Alert type="error">{submittingError}</Alert>}
          {successMessageVisible && (
            <Alert type="success">Карточка создана!</Alert>
          )}
          <Button type="submit" loading={formik.isSubmitting}>
            Создать карточку
          </Button>
        </FormItems>
      </form>
    </Segment>
  );
};
