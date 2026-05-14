import { useState } from 'react';
import { Segment } from '../../components/Segment';

export const NewCardPage = () => {
  const [state, setState] = useState({
    title: '',
    historicalPeriod: '',
    author: '',
    description: '',
    text: '',
  });

  return (
    <Segment title="Создать карточку">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.info('Submitted', state);
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="title">Название</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setState({ ...state, title: e.target.value });
            }}
            value={state.title}
            name="title"
            id="title"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="historicalPeriod">Период</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setState({ ...state, historicalPeriod: e.target.value });
            }}
            value={state.historicalPeriod}
            name="historicalPeriod"
            id="historicalPeriod"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="author">Автор</label>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setState({ ...state, author: e.target.value });
            }}
            value={state.author}
            name="author"
            id="author"
          />
        </div>

        <div style={{ marginBottom: 10 }}>
          <label htmlFor="description">Описание</label>
          <br />
          <textarea
            onChange={(e) => {
              setState({ ...state, description: e.target.value });
            }}
            value={state.description}
            name="description"
            id="description"
          />
        </div>

        {/* <div style={{ marginBottom: 10 }}>
          <label htmlFor="text">Text</label>
          <br />
          <textarea
            onChange={(e) => {
              setState({ ...state, text: e.target.value });
            }}
            value={state.text}
            name="text"
            id="text"
          />
        </div> */}

        <button type="submit">Создать карточку</button>
      </form>
    </Segment>
  );
};
