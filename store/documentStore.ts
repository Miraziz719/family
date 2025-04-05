import { create } from "zustand";
import axios from "@/lib/axiosInstance";

type document = {
  id: string;
  name: string;
  description: string;
  image: string;
  imageFile: File | null;
  category_id: string;
  user: string;
};

type DocumentStore = {
  loading: boolean;
  documents: document[];
  getDocumentByCategory: (category: string) => document[];
  fetchDocuments: () => Promise<void>;
};

export const useDocumentStore = create<DocumentStore>((set, get) => ({
  loading: false,
  documents: [],

  getDocumentByCategory: (category) => {
    return get().documents.filter((doc) => doc.category_id == category)
  },

  fetchDocuments: async () => {
    const { documents } = get();
    if (documents.length) return;

    set({ loading: true })
    axios.get(`/profiles/documents/`)
      .then(res => {
        set({ documents: res.data.results });
      })
      .finally(() => {
        set({ loading: false })
      })

  },
}));

export const isImage = (filename: string) =>
  /\.(jpg|jpeg|png|gif)$/i.test(filename);
export const isPDF = (filename: string) => /\.pdf$/i.test(filename);