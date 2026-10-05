"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateSiteSettings } from "@/data/settings";

export async function updateSettingsAction(formData) {
  const data = {
    companyName: formData.get("companyName")?.toString().trim() || "나만의 가구",
    tagline: formData.get("tagline")?.toString().trim() || "",
    phone: formData.get("phone")?.toString().trim() || "",
    email: formData.get("email")?.toString().trim() || "",
    ceoName: formData.get("ceoName")?.toString().trim() || "",
    businessNumber: formData.get("businessNumber")?.toString().trim() || "",
    address: formData.get("address")?.toString().trim() || "",
  };

  await updateSiteSettings(data);

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  redirect("/admin/settings");
}
