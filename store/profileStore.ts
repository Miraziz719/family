import { create } from "zustand";
import axios from "@/lib/axiosInstance";

export const userTypes = [
  {value: "guest", label: 'Foydalanuvchi'},
  {value: "mother", label: 'Ona'},
  {value: "bride", label: 'Kelin'},
  {value: "girl", label: 'Qiz'},
  {value: "doctor", label: 'Shifokor'},
  {value: "admin", label: 'Admin'},
]

type Profile = {
  profileId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  avatarFile: File | null;
  bio: string;
  birthday: string;
  userType: 'guest' | 'mother' | 'bride' | 'girl' | 'doctor' | 'admin';
};

type ProfileStore = {
  profile: Profile;
  setProfile: (data: Partial<Profile>) => void;
  resetProfile: () => void;
  loadProfileFromAPI: () => Promise<void>;
};

const defaultProfile: Profile = {
  profileId: "",
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  avatar: "",
  avatarFile: null,
  bio: "",
  birthday: "",
  userType: "guest",
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

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: defaultProfile,

  setProfile: (data) =>
    set((state) => ({
      profile: { ...state.profile, ...data },
    })),

  resetProfile: () => set({ profile: defaultProfile }),

  loadProfileFromAPI: async () => {
    try {
      const [userRes, profileRes] = await Promise.all([
        axios.get("/auth/user/"),
        axios.get(`/profiles/profile/me/`)
      ]);

      const merged = mergeAndSanitize(userRes.data, profileRes.data);
      set(() => ({
        profile: merged
      }));

    } catch (err) {
      console.error("Error fetching data", err);
    }
  },
}));
