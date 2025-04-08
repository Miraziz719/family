'use client'

import { FC, useState } from "react";
import { useDocumentStore, isImage, isPDF } from "@/store/documentStore";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import DocumentDialog from "@/components/dialogs/document"

type Props = {
  category: string;
  categoryId: string;
};

const DocumentPage: FC<Props> = ({ category, categoryId }) => {
  const [open, setOpen] = useState(false);
  const { loading, getDocumentByCategory} = useDocumentStore()
  const documents = getDocumentByCategory(categoryId)

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
            className="border rounded-lg p-4 h-full shadow-sm bg-white hover:shadow-md transition relative"
          >
            {isImage(doc.image) ? (
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
            ) : isPDF(doc.image) ? (
              <div className="flex flex-col items-center justify-center h-48 text-center text-gray-500 border border-dashed border-gray-300 rounded mb-3">
                <span className="text-5xl">📄</span>
                <p className="mt-2">PDF fayl</p>
              </div>
            ) : (
              <p className="text-sm text-red-500">Noma'lum fayl turi</p>
            )}
            <p className="text-sm truncate">{doc.name}</p>
            <p className="text-sm italic text-gray-600">{doc.description}</p>
            <div className="flex justify-between items-center">
              <a
                href={doc.image}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm hover:underline mt-2 inline-block"
              >
                Yuklab olish / Ko‘rish
              </a>
              <button
                onClick={() => {}}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                O'chirish
              </button>
            </div>
        
          </div>
        ))}
        {/* <div onClick={() => setOpen(true)} className="border-dashed border-2 rounded-lg min-h-48 h-full flex items-center justify-center text-center text-gray-500 cursor-pointer hover:bg-gray-50 transition">
          <span className="text-3xl">➕</span>
        </div> */}

        <DocumentDialog open={open} onOpenChange={setOpen} />
      </div>
    </div>
  );
};

export default DocumentPage;
