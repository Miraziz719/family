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
      <DocumentPage category="Boshqa" categoryId="1" />
    </div>
  )
};

export default page;
