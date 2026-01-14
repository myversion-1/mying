/**
 * SEO Tracker Storage Utility
 * Handles storage and retrieval of backlink tracking data
 * Uses JSON file storage (can be easily migrated to Supabase)
 */

import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

export type BacklinkStatus = "Active" | "Lost" | "No-Follow" | "Pending";

export interface Backlink {
  id: string;
  externalUrl: string;
  targetUrl: string; // Product URL on mying.vercel.app
  language: string; // Language code (en, zh, etc.)
  status: BacklinkStatus;
  linkType?: "dofollow" | "nofollow" | "meta";
  anchorText?: string;
  lastChecked?: string;
  createdAt: string;
  notes?: string;
}

interface StorageData {
  backlinks: Backlink[];
  lastCronRun?: string;
}

// Storage file path
const STORAGE_DIR = join(process.cwd(), "data");
const STORAGE_FILE = join(STORAGE_DIR, "seo-tracker.json");

// Ensure storage directory exists
async function ensureStorageDir() {
  if (!existsSync(STORAGE_DIR)) {
    await mkdir(STORAGE_DIR, { recursive: true });
  }
}

// Read data from storage
export async function readStorage(): Promise<StorageData> {
  await ensureStorageDir();
  
  if (!existsSync(STORAGE_FILE)) {
    return { backlinks: [] };
  }
  
  try {
    const content = await readFile(STORAGE_FILE, "utf-8");
    return JSON.parse(content) as StorageData;
  } catch (error) {
    console.error("Error reading storage:", error);
    return { backlinks: [] };
  }
}

// Write data to storage
export async function writeStorage(data: StorageData): Promise<void> {
  await ensureStorageDir();
  
  try {
    await writeFile(STORAGE_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing storage:", error);
    throw error;
  }
}

// Get all backlinks
export async function getAllBacklinks(): Promise<Backlink[]> {
  const data = await readStorage();
  return data.backlinks;
}

// Get backlink by ID
export async function getBacklinkById(id: string): Promise<Backlink | null> {
  const data = await readStorage();
  return data.backlinks.find((b) => b.id === id) || null;
}

// Create new backlink
export async function createBacklink(backlink: Omit<Backlink, "id" | "createdAt">): Promise<Backlink> {
  const data = await readStorage();
  
  const newBacklink: Backlink = {
    ...backlink,
    id: `bl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  
  data.backlinks.push(newBacklink);
  await writeStorage(data);
  
  return newBacklink;
}

// Update backlink
export async function updateBacklink(
  id: string,
  updates: Partial<Omit<Backlink, "id" | "createdAt">>
): Promise<Backlink | null> {
  const data = await readStorage();
  const index = data.backlinks.findIndex((b) => b.id === id);
  
  if (index === -1) {
    return null;
  }
  
  data.backlinks[index] = {
    ...data.backlinks[index],
    ...updates,
    lastChecked: new Date().toISOString(),
  };
  
  await writeStorage(data);
  return data.backlinks[index];
}

// Delete backlink
export async function deleteBacklink(id: string): Promise<boolean> {
  const data = await readStorage();
  const initialLength = data.backlinks.length;
  data.backlinks = data.backlinks.filter((b) => b.id !== id);
  
  if (data.backlinks.length < initialLength) {
    await writeStorage(data);
    return true;
  }
  
  return false;
}

// Update last cron run time
export async function updateLastCronRun(): Promise<void> {
  const data = await readStorage();
  data.lastCronRun = new Date().toISOString();
  await writeStorage(data);
}

// Get last cron run time
export async function getLastCronRun(): Promise<string | null> {
  const data = await readStorage();
  return data.lastCronRun || null;
}



















