'use client'

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDocumentStore, isImage, isPDF } from "@/store/documentStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "@/lib/axiosInstance";
import { toast } from "react-toastify";

const DocumentDialog = ({ 
  open, 
  categoryId,
  onOpenChange 
}: { 
  open: boolean, 
  categoryId: string,
  onOpenChange: (val: boolean) => void 
}) => {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categoryId);

  const { fetchDocuments } = useDocumentStore()

  async function onsubmit() {
    if (!file || !name || !category) return;
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("category_id", category);
  
    setLoading(true)
    try {
      await axios.post("/profiles/documents/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      onOpenChange(false)
      toast.success("Muvaffaqiyatli qo'shildi!");
      fetchDocuments()
    } catch (err: any) {
      const key = Object.keys(err.response.data)[0]
      toast.error(err.response.data[key]?.[0] || err.message)
    }
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yangi hujjat qo‘shish</DialogTitle>
          <DialogDescription>PDF yoki rasim yuklang, nom va tavsif kiriting</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-2">Fayl (PDF yoki rasm)</Label>
            <Input type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>

          <div>
            <Label className="mb-2">Nomi</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Hujjat nomi" />
          </div>

          <div>
            <Label className="mb-2">Tavsif</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Izoh..." />
          </div>

          <div>
            <Label className="mb-2">Kategoriya</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategoriya tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">Shaxsiy</SelectItem>
                <SelectItem value="3">Tibbiy</SelectItem>
                <SelectItem value="1">Boshqa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button loading={loading} disabled={!file || !name} onClick={() => onsubmit()}>
            Qo‘shish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDialog;
