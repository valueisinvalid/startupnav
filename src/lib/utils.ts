import { formatDistanceToNow, format } from "date-fns";
import { tr } from "date-fns/locale";

export function formatRelativeDate(date: Date | string) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: tr,
  }).toLocaleUpperCase("tr-TR");
}

export function formatFullDate(date: Date | string) {
  return format(new Date(date), "d MMMM yyyy", { locale: tr });
}

export function createSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
