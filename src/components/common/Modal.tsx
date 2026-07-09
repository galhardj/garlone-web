"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/src/components/common/Button";

const ModalSection = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  const setModal = () => setModalOpen(!modalOpen);

  // useEffect for focus
  useEffect(() => {
    if (!modalOpen) {
      triggerRef.current?.focus();
      document.body.style.overflow = "unset";
    } else {
      confirmRef.current?.focus();
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  // useEffect for Escape event listener
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && modalOpen) {
        setModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [modalOpen]);

  return (
    <>
      <Button ref={triggerRef} onClick={setModal}>
        Trigger modal
      </Button>
      {modalOpen && (
        <div className="fixed inset-0 z-30 bg-black/50">
          <div
            onClick={setModal}
            className="fixed inset-0 z-40 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex max-w-md flex-col gap-4 rounded-lg border bg-white px-8 py-4"
            >
              <h2>Modal Title</h2>
              <p>
                This modal automatically receives focus when opened. Press the
                Escape key to close it and return focus to the button.
              </p>
              <div className="flex justify-end gap-4">
                {/* Cancel; className="bg-gray-50 text-gray-700" */}
                <Button onClick={setModal}>Cancel</Button>{" "}
                <Button ref={confirmRef} onClick={setModal}>
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalSection;
