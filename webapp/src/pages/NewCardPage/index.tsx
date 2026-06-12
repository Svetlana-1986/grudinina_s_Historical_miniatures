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

export const NewCardPage = () => {
  const { isAuthorized, isLoading } = useAuth();

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const createCard = trpc.createCard.useMutation();

  const formik = useFormik<CreateCardInput>({
    initialValues: {
      title: '',
      historicalPeriod: HistoricalPeriod.ANCIENT,
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
