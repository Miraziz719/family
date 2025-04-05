"use client";
import { useEffect } from "react";
import DocumentPage from "@/components/DocumentPage";
import { useDocumentStore } from "@/store/documentStore";

const page = () => {
  const { fetchDocuments } = useDocumentStore()

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div>
      <DocumentPage category="Tibbiy" categoryId="3" />
    </div>
  )
};

export default page;
