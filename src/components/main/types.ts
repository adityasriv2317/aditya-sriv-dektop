export interface WindowData {
  id: string;
  appId: string;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  zIndex: number;
  isResizable?: boolean;
  isMaximized?: boolean;
  previousPosition?: { x: number; y: number };
  previousSize?: { width: number; height: number };
}

export interface AppData {
  id: string;
  name: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  isProjectApp?: boolean;
}

export interface DesktopIconData {
  id: string;
  name: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  appId: string;
}

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  deployedUrl: string;
  icon: React.ReactNode;
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WallpaperData {
  id: string;
  name: string;
  gradient: string;
}