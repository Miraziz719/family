"use client";
import { useSession } from "next-auth/react"
import axios from "@/lib/axiosInstance"
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-toastify";


const userTypes = [
  {value: "guest", label: 'Foydalanuvchi'},
  {value: "mother", label: 'Ona'},
  {value: "bride", label: 'Kelin'},
  {value: "girl", label: 'Qiz'},
  {value: "doctor", label: 'Shifokor'},
  {value: "admin", label: 'Admin'},
]

const defaultProfile = {
  profileId: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  avatar: "",
  avatarFile: null,
  bio: "",
  birthday: "",
  userType: "user",
};

function mergeAndSanitize(user: any, profile: any) {
  return {
    email: user?.email ?? "",
    firstName: user?.first_name ?? "",
    lastName: user?.last_name ?? "",
    profileId: profile.id,
    phone: profile?.phone ?? "",
    avatar: profile?.avatar ?? "",
    avatarFile: null,
    bio: profile?.bio ?? "",
    birthday: profile?.birthday ?? "",
    userType: profile?.user_type ?? "user",
  };
}

const page = () => {
  const { data, status } = useSession()

  const [formData, setFormData] = useState(defaultProfile);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(status === 'loading') return
    async function fetchData() {
      try {
        const [userRes, profileRes] = await Promise.all([
          axios.get("/auth/user/"),
          axios.get(`/profile/profiles/1/`), // → backend api da kamchilik bor user id dan olish kerak
        ]);

        const merged = mergeAndSanitize(userRes.data, profileRes.data);
        setFormData(merged);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    }

    
    fetchData();
  }, []);
  
  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const form = new FormData();

      form.append("phone", formData.phone);
      form.append("bio", formData.bio);
      form.append("birthday", formData.birthday);
      form.append("user_type", formData.userType);
      form.append("user", '9');
  
      if (avatarFile) {
        form.append("avatar", avatarFile);
      }

      await axios.put(`/profile/profiles/${formData.profileId}/`, form, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      await axios.put("/auth/user/", {
        first_name: formData.firstName,
        last_name: formData.lastName,
      });

      toast.success("Muvaffaqiyatli yangilandi!");
    } catch (err) {
      console.error("Update failed", err);
    } finally {
      setLoading(false)
    }
  };


  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4 pb-10">
      {/* 🟦 Shaxsiy ma'lumotlar */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">👤 Shaxsiy ma'lumotlar</h2>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input name="email" value={formData.email} readOnly disabled />
          </div>

          <div className="space-y-2">
            <Label>Ism</Label>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Familiya</Label>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* 🟩 Profil sozlamalari */}
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-lg font-semibold">⚙️ Profil sozlamalari</h2>

          <div className="space-y-2">
            <Label>Telefon raqam</Label>
            <Input name="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Avatar</Label>
            {formData.avatar && (
              <img
                src={formData.avatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <Input
              type="file"
              onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea name="bio" value={formData.bio} onChange={(e) => handleChange("bio", e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Tug‘ilgan sana</Label>
            <Input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={(e) => handleChange("birthday", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Foydalanuvchi turi</Label>
            <Select
              value={formData.userType}
              onValueChange={(val) =>
                handleChange("userType", val)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tanlang" />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button loading={loading} onClick={handleSubmit} className="w-full">
        Saqlash
      </Button>
    </div>
  )
};

export default page;
