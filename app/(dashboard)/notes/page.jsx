'use client';

import SectionHead from '@/components/common/SectionHead';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import NoteSection from '@/components/dashboard/NoteSection';
import { useNotes } from '@/hooks/useNotes';

export default function NotesPage() {
  const { books, isLoading, error } = useNotes();

  return (
    <>
      <SectionHead zh="笔墨留痕" en="NOTES · HIGHLIGHTS" />

      {isLoading && <LoadingSpinner text="正在摘录笔墨…" />}

      {error && (
        <p className="text-center py-16 text-[var(--rust)] tracking-widest">
          加载失败：{error}
        </p>
      )}

      {books && !isLoading && <NoteSection books={books} />}
    </>
  );
}
