'use client';

import React from 'react';
import { Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { useDeleteProperty, Property } from '@/hooks/useProperties';

interface DeleteConfirmModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function DeleteConfirmModal({ property, onClose }: DeleteConfirmModalProps) {
  const deleteMutation = useDeleteProperty();

  const handleDelete = async () => {
    if (!property) return;
    try {
      await deleteMutation.mutateAsync(property.id);
      onClose();
    } catch {
      // error handled by mutation
    }
  };

  if (!property) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black-pure/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm bg-white-pure rounded-[2rem] shadow-2xl border border-border-line/20 p-8 animate-in fade-in zoom-in-95 duration-300 text-center"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-red-500" />
        </div>
        <h3 className="text-lg font-display font-semibold text-text-dark mb-2">Hapus Properti?</h3>
        <p className="text-sm text-text-gray/60 leading-relaxed mb-1">
          Tindakan ini akan menghapus
        </p>
        <p className="text-sm font-semibold text-text-dark mb-5">
          &ldquo;{property.title}&rdquo;
        </p>
        <p className="text-xs text-red-400 bg-red-50/60 px-4 py-2.5 rounded-2xl mb-7">
          Data tidak dapat dipulihkan setelah dihapus.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="flex-1 py-3 rounded-2xl text-sm font-medium text-text-gray/70 bg-surface-gray/50 hover:bg-surface-gray transition-all"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white-pure bg-red-500 hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 flex items-center justify-center gap-2 active:scale-95"
          >
            {deleteMutation.isPending
              ? <><Loader2 size={16} className="animate-spin" /> Menghapus...</>
              : <><Trash2 size={16} /> Hapus</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
