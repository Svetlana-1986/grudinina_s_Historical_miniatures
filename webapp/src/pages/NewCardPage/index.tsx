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

export const NewCardPage = () => {
  // для формы -успех
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  // для формы с ошибкой
  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const createCard = trpc.createCard.useMutation();
  const formik = useFormik<CreateCardInput>({
    initialValues: {
      title: '',
      historicalPeriod: '',
      description: '',
    },

    validate: withZodSchema(zCreateCardTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);
        await createCard.mutateAsync(values);
        // сброс данных из формы до начального
        formik.resetForm();
        // делаем сообщение видимым
        setSuccessMessageVisible(true);
        // через 3 сек скрываем сообщение
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

  return (
    <Segment title="Создать карточку">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input<CreateCardInput>
            name="title"
            label="Название"
            formik={formik}
          />

          <Input<CreateCardInput>
            name="historicalPeriod"
            label="Период"
            formik={formik}
          />

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
