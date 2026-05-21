import { useFormik } from 'formik';
import { Segment } from '../../components/Segment';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc';
import {
  zCreateCardTrpcInput,
  type CreateCardInput,
} from '@miniaturenick/backend/createCard/input';
import { useState } from 'react';

export const NewCardPage = () => {
  // для формы -успех
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  // для формы с ошибкой
  const [submittingError, setsubmittingError] = useState<string | null>(null);

  const createCard = trpc.createCard.useMutation();
  const formik = useFormik<CreateCardInput>({
    initialValues: {
      title: '',
      historicalPeriod: '',
      authorNick: '',
      authorName: '',
      description: '',
    },

    validate: withZodSchema(zCreateCardTrpcInput),
    onSubmit: async (values) => {
      try {
        await createCard.mutateAsync(values);
        // сброс данных из формы до начального
        formik.resetForm();
        // делаем сообщение видимым
        setSuccessMessageVisible(true);
        // через 3 сек скрываем сообщение
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (error: any) {
        setsubmittingError(error.message);
        setTimeout(() => {
          setsubmittingError(null);
        }, 3000);
      }
    },
  });

  return (
    <Segment title="Создать карточку">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <Input name="title" label="Название" formik={formik} />

        <Input name="historicalPeriod" label="Период" formik={formik} />

        <Input name="authorNick" label="Nick автора" formik={formik} />

        <Input name="authorName" label="Имя автора" formik={formik} />

        <TextArea
          name="description"
          label="Описание миниатюры"
          formik={formik}
        />

        {!formik.isValid && !!formik.submitCount && (
          <div style={{ color: 'red' }}>
            Некоторые поля заполнены некорректно
          </div>
        )}

        {!!submittingError && (
          <div style={{ color: 'red' }}>{submittingError}</div>
        )}

        {successMessageVisible && (
          <div style={{ color: 'white' }}>Карточка создана!</div>
        )}

        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Загрузка...' : 'Создать карточку'}
        </button>
      </form>
    </Segment>
  );
};
