import { sql } from "@/lib/db";

function rowToCategory(row) {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    image: row.image,
    sortOrder: row.sort_order,
  };
}

export async function getAllCategories() {
  const rows = await sql("SELECT * FROM categories ORDER BY sort_order ASC");
  return rows.map(rowToCategory);
}

export async function getCategoryBySlug(slug) {
  const rows = await sql("SELECT * FROM categories WHERE slug = $1", [slug]);
  return rows[0] ? rowToCategory(rows[0]) : null;
}

export async function createCategory(input) {
  const { slug, name, description, image, sortOrder } = input;
  await sql(
    `INSERT INTO categories (slug, name, description, image, sort_order)
     VALUES ($1, $2, $3, $4, $5)`,
    [slug, name, description, image, sortOrder]
  );
}

export async function updateCategory(slug, input) {
  const { name, description, image, sortOrder } = input;
  await sql(
    `UPDATE categories SET name = $2, description = $3, image = $4, sort_order = $5
     WHERE slug = $1`,
    [slug, name, description, image, sortOrder]
  );
}

export async function deleteCategory(slug) {
  await sql("DELETE FROM categories WHERE slug = $1", [slug]);
}
