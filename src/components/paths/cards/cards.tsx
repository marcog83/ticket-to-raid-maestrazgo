import { FC, useState } from 'react';
import { Card } from './card';
import styles from './cards.module.css';

export const Cards:FC<{ cards:any[] }> = ({ cards }) => {
  const [ isOpen, setOpen ] = useState(false);

  return (
    <>
      <button
        popovertarget="my-popover"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        CARDS
      </button>
      {isOpen ? (
        <div popover="true" id="my-popover" style={{ position: 'relative', width: '100%', height: '100%' }}>
          <button
            onClick={() => setOpen(false)}
            type="button"
          >
            CLOSE
          </button>
          <div className={styles.cards}>
            {cards.map((card) => <Card card={card} />)}
          </div>

        </div>
      ) : null}
    </>
  );
};
