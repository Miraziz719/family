'use client'

import { FC, useState } from "react";
import { useDocumentStore, isImage, isPDF } from "@/store/documentStore";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import DocumentDialog from "@/components/dialogs/document"
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axiosInstance";

type Props = {
  category: string;
  categoryId: string;
};

const DocumentPage: FC<Props> = ({ category, categoryId }) => {
  const [open, setOpen] = useState(false);
  const { loading, getDocumentByCategory, fetchDocuments} = useDocumentStore()
  const documents = getDocumentByCategory(categoryId)

  async function deleteDocument(id: string) {
    try {
      await axiosInstance.delete(`/profiles/documents/${id}/`);
      toast.success("Muvaffaqiyatli o'chirildi!");
      fetchDocuments()
    } catch (err: any) {
      const key = Object.keys(err.response.data)[0]
      toast.error(err.response.data[key]?.[0] || err.message)
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">{category} hujjatlar</h1>
      {
        loading 
        ? <p className="mb-4">Loading.</p>
        : documents.length === 0 && (
          <p className="mb-4">Bu kategoriyada hozircha hujjatlar yo‘q.</p>
        )
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border rounded-lg p-4 h-full shadow-sm bg-secondary hover:shadow-md transition relative"
          >
            {isImage(doc.file) ? (
              <img
                src={doc.file}
                alt={doc.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
            ) : isPDF(doc.file) ? (
              <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500 border border-dashed border-gray-300 rounded mb-3">
                <span className="text-5xl">📄</span>
                <p className="mt-2">PDF fayl</p>
              </div>
            ) : (
              <p className="text-sm text-red-500">Noma'lum fayl turi</p>
            )}
            <p className="text-sm truncate">{doc.name}</p>
            <p className="text-[12px] italic text-gray-600">{doc.description}</p>
            <div className="flex justify-between items-center">
              <a
                href={doc.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline mt-2 inline-block"
              >
                Yuklab olish / Ko‘rish
              </a>
              <button
                onClick={() => deleteDocument(doc.id)}
                className="text-red-500 hover:text-red-700 text-sm mt-2"
              >
                O'chirish
              </button>
            </div>
        
          </div>
        ))}
        <div onClick={() => setOpen(true)} className="border-dashed border-2 rounded-lg min-h-48 h-full flex items-center justify-center text-center text-gray-500 cursor-pointer hover:bg-secondary transition">
          <span className="text-3xl">➕</span>
        </div>

        <DocumentDialog open={open} onOpenChange={setOpen} categoryId={categoryId} />
      </div>
    </div>
  );
};

export default DocumentPage;
