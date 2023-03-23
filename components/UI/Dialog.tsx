import React, { Children, cloneElement } from 'react';
import { useState, useRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { HamburgerMenuIcon, Cross2Icon } from '@radix-ui/react-icons';

interface DialogProps {
  className?: string;
  children: React.ReactElement;
}

const Dialog = ({ className, children }: DialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const dialogCloseButton = useRef<HTMLButtonElement>(null);
  const anchorElementRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <button className="xs:hover:text-base-semiMd">
            <HamburgerMenuIcon aria-hidden />
          </button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            className={`xs:fixed xs:inset-0 backdrop-blur-sm xs:bg-base/20 ${
              open ? 'animate-overlayShow' : 'animate-overlayHide'
            }`}
          />
          <DialogPrimitive.Content
            onOpenAutoFocus={(event) => {
              //   dialogCloseButton.current?.focus();
              anchorElementRef.current?.focus();
              event.preventDefault();
            }}
            className={`xs:fixed xs:bg-white xs:rounded-lg top-4 right-4 p-4 w-full max-w-xs ${
              open ? 'animate-contentShow' : 'animate-contentHide'
            }`}
          >
            {React.cloneElement(children, { ref: anchorElementRef })}
            <DialogPrimitive.Close ref={dialogCloseButton} asChild>
              <button className="xs:flex xs:justify-center xs:items-center xs:hover:text-base-semiMd absolute w-6 h-6 top-4 right-4">
                <Cross2Icon />
              </button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};

export default Dialog;
