import { Modal, Button } from "@heroui/react";
import { ReactNode } from "react";

type PriceFilterModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  onConfirm: () => void;
  onReset: () => void;
  confirmLabel?: string;
};

export default function MyModal({
  isOpen,
  onOpenChange,
  children,
  onConfirm,
  onReset,

  confirmLabel = "Open Modal",
}: PriceFilterModalProps) {
  return (
    <Modal>
      <Button
        variant="secondary"
        onPress={() => onOpenChange(true)}
        className="text-text-primary bg-surface"
      >
        {confirmLabel}
      </Button>
      <Modal.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="h-full"
      >
        <Modal.Container className="h-fit">
          <Modal.Dialog className="mt-80 sm:max-w-90 lg:mt-auto">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Price Range</Modal.Heading>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer className="">
              <Button
                variant="secondary"
                onPress={onReset}
                className="bg-brand-100 text-text-secondary flex-1"
              >
                Reset
              </Button>
              <Button
                className="bg-brand-600 text-surface flex-1"
                onPress={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
              >
                Confirm
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
