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


type Props = {
  category: string;
  categoryId: string;
};

const DocumentDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (val: boolean) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category1, setCategory] = useState("");


  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="border-dashed border-2 rounded-lg min-h-48 h-full flex items-center justify-center text-center text-gray-500 cursor-pointer hover:bg-gray-50 transition">
          <span className="text-3xl">➕</span>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Yangi hujjat qo‘shish</DialogTitle>
          <DialogDescription>PDF yoki rasim yuklang, nom va tavsif kiriting</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Fayl (PDF yoki rasm)</Label>
            <Input type="file" accept=".pdf,image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </div>

          <div>
            <Label>Nomi</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Hujjat nomi" />
          </div>

          <div>
            <Label>Tavsif</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Izoh..." />
          </div>

          <div>
            <Label>Kategoriya</Label>
            <Select value={category1} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Kategoriya tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shaxsiy">Shaxsiy</SelectItem>
                <SelectItem value="tibbiy">Tibbiy</SelectItem>
                <SelectItem value="boshqa">Boshqa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button disabled={!file || !name}>
            Qo‘shish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDialog;
