import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog.jsx';
import { router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

type DeleteConfirmationProps = {
  url: string;
  open: boolean;
  handleClose: () => void;
  onConfirm?: () => void; // ✅ Tambahkan
  title?: string;
  description?: string;
};

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ url, open, handleClose, onConfirm, title, description }) => {
  const [canDelete, setCanDelete] = useState(false);
  const [countDown, setCountDown] = useState(5);

  const handleDelete = () => {
    const deleteQuery = () =>
      new Promise((resolve, reject) => {
        router.delete(url, {
          preserveScroll: true,
          onSuccess: (props) => {
            resolve(props);
            handleClose();
            onConfirm?.(); 
          },
          onError: (errors) => {
            handleClose();
            reject(errors);
          },
        });
      });

    toast.promise(deleteQuery(), {
      loading: 'Sedang Menghapus',
      success: 'Data berhasil dihapus',
      error: 'Kesalahan saat menghapus data',
    });
  };

  const handleConfirmClose = () => {
    handleClose();
    setCanDelete(false);
    setTimeout(() => setCountDown(5), 500);
  };

  useEffect(() => {
    if (open && countDown >= 1) {
      const countdownInterval = setInterval(() => {
        setCountDown((prevCount) => {
          if (prevCount <= 1) {
            setCanDelete(true);
            clearInterval(countdownInterval);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [countDown, open]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className={'top-[85%] md:top-[20%]'}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? 'Kamu yakin ingin hapus data ini?'}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? 'Proses ini tidak dapat dibatalkan, data yang dihapus tidak akan dapat dikembalikan dari server.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={'flex flex-col gap-1 md:flex-row md:gap-1'}>
          <AlertDialogAction
            className={'bg-red-500 hover:bg-red-600'}
            onClick={handleDelete}
            disabled={!canDelete}
          >
            {canDelete ? 'Ya, Hapus' : `Tunggu ${countDown}s`}
          </AlertDialogAction>
          <AlertDialogCancel onClick={handleConfirmClose}>Batal</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;