import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_FILE = path.join(process.cwd(), "data.json");

interface UnlockCode {
  code: string;
  used: boolean;
  usedAt: string | null;
  createdAt: string;
}

interface DataStore {
  unlockCodes: UnlockCode[];
}

function readData(): DataStore {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { unlockCodes: [] };
  }
}

function writeData(data: DataStore) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export function findCode(code: string) {
  const data = readData();
  return data.unlockCodes.find((c) => c.code === code) || null;
}

export function markCodeAsUsed(code: string) {
  const data = readData();
  const entry = data.unlockCodes.find((c) => c.code === code);
  if (entry && !entry.used) {
    entry.used = true;
    entry.usedAt = new Date().toISOString();
    writeData(data);
    return true;
  }
  return false;
}

export function getStats() {
  const data = readData();
  const total = data.unlockCodes.length;
  const used = data.unlockCodes.filter((c) => c.used).length;
  return { total, used, unused: total - used, codes: data.unlockCodes.slice(-100) };
}

function genCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const seg1 = Array.from({ length: 4 }, () => chars[crypto.randomInt(chars.length)]).join("");
  const seg2 = Array.from({ length: 4 }, () => chars[crypto.randomInt(chars.length)]).join("");
  return `${seg1}-${seg2}`;
}

export function generateCodes(count: number) {
  const data = readData();
  const existing = new Set(data.unlockCodes.map((c) => c.code));
  const newCodes: string[] = [];

  for (let i = 0; i < count; i++) {
    let code = genCode();
    let attempts = 0;
    while (existing.has(code) && attempts < 10) {
      code = genCode();
      attempts++;
    }
    existing.add(code);
    newCodes.push(code);
    data.unlockCodes.push({
      code,
      used: false,
      usedAt: null,
      createdAt: new Date().toISOString(),
    });
  }

  writeData(data);
  return newCodes;
}
