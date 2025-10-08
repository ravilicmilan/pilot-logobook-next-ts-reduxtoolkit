'use client';
import { useEffect } from 'react';
import classes from './Modal.module.css';
import { ModalType } from '@/types/components';

export default function Modal(props: ModalType) {
  useEffect(() => {
    // Apply overflow: hidden to the body when the component mounts
    document.body.style.overflow = 'hidden';

    // Revert overflow to its default (or desired) state when the component unmounts
    return () => {
      document.body.style.overflow = 'visible'; // Or 'auto', depending on your needs
    };
  }, []);
  return (
    <div className={['flex-column', 'flex-center', classes.Modal].join(' ')}>
      <div
        className={['flex-column', 'flex-center', classes.ModalBackdrop].join(
          ' '
        )}
      ></div>
      <div
        className={['flex-column', 'flex-center', classes.ModalOuter].join(' ')}
      >
        <div
          className={['flex-column', 'flex-center', classes.ModalInner].join(
            ' '
          )}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}
