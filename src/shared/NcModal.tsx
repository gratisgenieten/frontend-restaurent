'use client';

import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { FC, Fragment, ReactNode, useEffect, useState } from 'react';
import ButtonClose from '@/shared/ButtonClose';
import Button from '@/shared/Button';

export interface NcModalProps {
  renderContent: () => ReactNode;
  renderTrigger?: (openModal: () => void) => ReactNode;
  contentExtraClass?: string;
  contentPaddingClass?: string;
  triggerText?: ReactNode;
  modalTitle?: ReactNode;
  isOpenProp?: boolean;
  onCloseModal?: () => void;
}

const NcModal: FC<NcModalProps> = ({
  renderTrigger,
  renderContent,
  contentExtraClass = 'max-w-5xl', // ✅ Bigger by default
  contentPaddingClass = 'px-6 py-8 sm:px-10 sm:py-10',
  triggerText = 'Open Modal',
  modalTitle = 'Modal Title',
  isOpenProp,
  onCloseModal,
}) => {
  const [isOpen, setIsOpen] = useState(!!isOpenProp);

  function closeModal() {
    if (typeof isOpenProp !== 'boolean') {
      setIsOpen(false);
    }
    onCloseModal && onCloseModal();
  }

  function openModal() {
    if (typeof isOpenProp !== 'boolean') {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    setIsOpen(!!isOpenProp);
  }, [isOpenProp]);

  return (
    <div className="nc-NcModal">
      {renderTrigger ? (
        renderTrigger(openModal)
      ) : (
        <Button onClick={openModal}>{triggerText}</Button>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-2 text-center md:px-4">
            {/* Overlay */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />
            </TransitionChild>

            {/* Centering hack */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* Modal */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-75"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className={`relative z-10 inline-block w-full transform overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-sky-50 text-left align-middle text-neutral-800 shadow-2xl transition-all dark:border-neutral-700 dark:from-neutral-900 dark:to-neutral-800 dark:text-neutral-100 ${contentExtraClass}`}
              >
                {/* Header */}
                <div className="relative border-b border-neutral-200 dark:border-neutral-700 px-6 py-5 text-center">
                  <ButtonClose
                    onClick={closeModal}
                    className="absolute left-4 top-1/2 -translate-y-1/2 transform"
                  />
                  {modalTitle && (
                    <DialogTitle
                      as="h3"
                      className="text-xl font-semibold text-neutral-900 dark:text-white"
                    >
                      {modalTitle}
                    </DialogTitle>
                  )}
                </div>

                {/* Content */}
                <div className={contentPaddingClass}>{renderContent()}</div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NcModal;
