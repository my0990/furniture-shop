import { sql } from "@/lib/db";

const DEFAULTS = {
  companyName: "나만의 가구",
  tagline: "",
  phone: "",
  email: "",
  ceoName: "",
  businessNumber: "",
  address: "",
};

export async function getSiteSettings() {
  const rows = await sql("SELECT * FROM site_settings WHERE id = 1");
  const row = rows[0];
  if (!row) return DEFAULTS;
  return {
    companyName: row.company_name,
    tagline: row.tagline,
    phone: row.phone,
    email: row.email,
    ceoName: row.ceo_name,
    businessNumber: row.business_number,
    address: row.address,
  };
}

export async function updateSiteSettings(input) {
  const {
    companyName,
    tagline,
    phone,
    email,
    ceoName,
    businessNumber,
    address,
  } = input;
  await sql(
    `INSERT INTO site_settings (id, company_name, tagline, phone, email, ceo_name, business_number, address)
     VALUES (1, $1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (id) DO UPDATE SET
       company_name = EXCLUDED.company_name,
       tagline = EXCLUDED.tagline,
       phone = EXCLUDED.phone,
       email = EXCLUDED.email,
       ceo_name = EXCLUDED.ceo_name,
       business_number = EXCLUDED.business_number,
       address = EXCLUDED.address`,
    [companyName, tagline, phone, email, ceoName, businessNumber, address]
  );
}
