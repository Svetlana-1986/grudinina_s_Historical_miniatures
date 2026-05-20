import { useFormik } from 'formik';
import { Segment } from '../../components/Segment';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';
import { withZodSchema } from 'formik-validator-zod';
import { trpc } from '../../lib/trpc';
import {
  zCreateCardTrpcInput,
  type CreateCardInput,
} from '@miniaturenick/backend/src/router/createCard/input';
export const NewCardPage = () => {
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
      await createCard.mutateAsync(values);
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

        <button type="submit">Создать карточку</button>
      </form>
    </Segment>
  );
};
