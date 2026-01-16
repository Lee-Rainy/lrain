import { randomUUID } from "crypto";
import { slugify } from "./fs";

export function generateFilename(title: string) {
  const slug = slugify(title);
  const uuid = randomUUID();
  const now = Date.now();

  return {
    filename: `${slug}__${uuid}__${now}__${now}.md`,
    meta: {
      slug,
      uuid,
      createAt: now,
      updateAt: now,
    },
  };
}
