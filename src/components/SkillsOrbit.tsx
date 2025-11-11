"use client"
import React, { useEffect, useState, memo, useCallback, useRef } from 'react';

// --- Type Definitions ---
type IconType = 'javascript' | 'typescript' | 'python' | 'react' | 'node' | 'next' | 'vue' | 'fastapi' | 'html' | 'css' | 'tailwind' | 'sql' | 'mongodb' | 'postgresql' | 'docker' | 'kubernetes' | 'aws' | 'git' | 'tensorflow' | 'pytorch' | 'vscode' | 'jupyter' | 'github' | 'gitlab' | 'postman' | 'vim' | 'slack' | 'figma' | 'huggingface' | 'openai' | 'scikitlearn' | 'pandas' | 'numpy' | 'langchain' | 'replicate' | 'colab' | 'problemsolving' | 'communication' | 'teamwork' | 'creativethinking' | 'adaptability' | 'leadership';

type GlowColor = 'cyan' | 'purple' | 'blue' | 'green' | 'yellow' | 'pink' | 'red' | 'indigo' | 'orange' | 'black';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
  orbitId: number; // Added to identify which orbit this skill belongs to
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
  isHovered?: boolean; // Added to control hover state
  orbitId: number; // Added to identify which orbit this is
  onHover: (orbitId: number, isHovered: boolean) => void; // Added callback for hover events
}

// --- SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  typescript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" fill="#3178C6"/>
        <path d="M0 3.449c0-1.909 1.54-3.449 3.45-3.449h17.101c1.909 0 3.449 1.54 3.449 3.449v17.101c0 1.909-1.54 3.449-3.449 3.449H3.45C1.54 24 0 22.46 0 20.55V3.449zm19.813 1.369c-.666 0-1.207.541-1.207 1.207 0 .666.541 1.207 1.207 1.207.666 0 1.207-.541 1.207-1.207 0-.666-.541-1.207-1.207-1.207zm-3.621 0c-.666 0-1.207.541-1.207 1.207 0 .666.541 1.207 1.207 1.207.666 0 1.207-.541 1.207-1.207 0-.666-.541-1.207-1.207-1.207zm-14.984 3.621v11.419h17.438V8.239H1.208z" fill="#fff"/>
      </svg>
    ),
    color: '#3178C6'
  },
  python: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm4.8 17.8a.6.6 0 0 1-.6.6H7.8a.6.6 0 0 1-.6-.6V6.2a.6.6 0 0 1 .6-.6h8.4a.6.6 0 0 1 .6.6z" fill="#3776ab"/>
        <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm0 22.2A10.2 10.2 0 1 1 22.2 12 10.21 10.21 0 0 1 12 22.2z" fill="#ffd343"/>
      </svg>
    ),
    color: '#3776AB'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933"/>
      </svg>
    ),
    color: '#339933'
  },
  next: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm-1.49-5.914l4.134-9.772h1.83l-5.344 12.31h-1.48l-1.47-3.416h-4.02l2.39 5.59h1.78l.006.006.006-.006h.004zm-2.85-6.62l-.81 1.87h2.68l-.81-1.87h-1.06z" fill="#000"/>
      </svg>
    ),
    color: '#000000'
  },
  vue: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1 3.244L12 19.756 23 3.244H1z" fill="#42B883"/>
        <path d="M1 3.244L12 19.756 23 3.244H12L1 3.244z" fill="#35495E"/>
      </svg>
    ),
    color: '#42B883'
  },
  fastapi: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm-1.49-5.914l4.134-9.772h1.83l-5.344 12.31h-1.48l-1.47-3.416h-4.02l2.39 5.59h1.78l.006.006.006-.006h.004zm-2.85-6.62l-.81 1.87h2.68l-.81-1.87h-1.06z" fill="#009688"/>
      </svg>
    ),
    color: '#009688'
  },
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  sql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
         <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4C14.8,4 17.1,5.1 18.7,6.8L17.2,8.3C16,7.2 14.2,6 12,6C9.2,6 7,7.6 7,10.2C7,11.7 7.9,12.8 9.3,13.4V11.8H11.3V15.4H9.3C7.2,14.8 5,12.8 5,10.2C5,6.7 8.3,4 12,4M12,8A2,2 0 0,1 14,10A2,2 0 0,1 12,12A2,2 0 0,1 10,10A2,2 0 0,1 12,8M12,18C9.2,18 6.9,16.9 5.3,15.2L6.8,13.7C8,14.8 9.8,16 12,16C14.8,16 17,14.4 17,11.8C17,10.3 16.1,9.2 14.7,8.6V10.2H12.7V6.6H14.7C16.8,7.2 19,9.2 19,11.8C19,15.3 15.7,18 12,18Z" fill="#F29111"/>
      </svg>
    ),
    color: '#F29111'
  },
  mongodb: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,0A12,12,0,0,0,0,12C0,18.63,5.37,24,12,24C18.63,24,24,18.63,24,12C24,5.37,18.63,0,12,0ZM13.08,19.95C12.72,20.2 12.37,20.34 12,20.34C10.77,20.34 9.8,19.26 9.8,17.87C9.8,16.73 10.45,16.03 11.3,15.65C10.65,15.17 10.2,14.39 10.2,13.4C10.2,11.8 11.32,10.67 12.8,10.67C13.9,10.67 14.65,11.23 15,12.13C15.42,11.19 16.32,10.84 17.15,10.84C17.5,10.84 17.8,10.9 18.06,11.01V9.5C18.06,7.5 16.45,5.32 12.17,5.32C8.32,5.32 5.94,7.4 5.94,9.5V14.73C5.94,15.7 6.3,16.5 6.91,17.06C6.3,17.65 5.94,18.4 5.94,19.27C5.94,20.91 7.11,22.1 8.65,22.1C9.64,22.1 10.5,21.58 10.96,20.73C11.18,20.8 11.41,20.84 11.66,20.84C12.3,20.84 12.87,20.53 13.3,20.06L13.08,19.95Z" fill="#47A248"/>
      </svg>
    ),
    color: '#47A248'
  },
  postgresql: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2C6.48,2,2,6.48,2,12C2,17.52,6.48,22,12,22C17.52,22,22,17.52,22,12C22,6.48,17.52,2,12,2ZM15.5,17H13.5V14.5H10.5V17H8.5V7H10.5V12.5H13.5V7H15.5V17Z" fill="#336791"/>
      </svg>
    ),
    color: '#336791'
  },
  docker: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.31,10.37C22.68,10.15 21.97,10 21.21,10H16.27V5.37H14.05V3.15H9.68V5.37H7.46V10H2.79C2.03,10 1.32,10.15 0.69,10.37L0,11.1V14.5C0,15 0.1,15.47 0.29,15.9L1.87,18.8C2.33,19.68 3.2,20.25 4.18,20.25H19.82C20.8,20.25 21.67,19.68 22.13,18.8L23.71,15.9C23.9,15.47 24,15 24,14.5V11.1L23.31,10.37M8.57,10H10.79V7.59H8.57V10M13.21,10H15.43V7.59H13.21V10M8.57,5.37H10.79V3.15H8.57V5.37M13.21,5.37H15.43V3.15H13.21V5.37M5.25,10H7.46V7.59H5.25V10M5,12.12H7.2V14.34H5V12.12M9.68,12.12H11.89V14.34H9.68V12.12M14.32,12.12H16.54V14.34H14.32V12.12M18.75,12.12H21V14.34H18.75V12.12Z" fill="#2496ED"/>
      </svg>
    ),
    color: '#2496ED'
  },
  kubernetes: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,1.8A10.2,10.2,0,1,0,22.2,12,10.2,10.2,0,0,0,12,1.8ZM12,20.5A8.5,8.5,0,1,1,20.5,12,8.5,8.5,0,0,1,12,20.5Z" fill="#326CE5"/>
        <path d="M12,4.5a7.5,7.5,0,1,0,7.5,7.5A7.5,7.5,0,0,0,12,4.5Zm0,13.5a6,6,0,1,1,6-6A6,6,0,0,1,12,18Z" fill="#326CE5"/>
        <polygon points="12 6 13.9 9.8 18 10.4 15 13.3 15.7 17.5 12 15.5 8.3 17.5 9 13.3 6 10.4 10.1 9.8 12 6" fill="#326CE5"/>
      </svg>
    ),
    color: '#326CE5'
  },
  aws: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M2,12.65C2,12.24 2.22,11.88 2.58,11.72L11.16,7.93C11.55,7.76 12,7.94 12.16,8.34C12.33,8.73 12.15,9.19 11.75,9.35L4,12.79L4.4,13.5L10.91,11.23C11.31,11.06 11.77,11.24 11.94,11.64C12.1,12.03 11.93,12.5 11.53,12.66L3,16.27V12.65M21.42,11.72C21.78,11.88 22,12.24 22,12.65V16.27L12.47,12.66C12.07,12.5 11.9,12.03 12.06,11.64C12.23,11.24 12.69,11.06 13.09,11.23L19.6,13.5L20,12.79L12.25,9.35C11.85,9.19 11.67,8.73 11.84,8.34C12,7.94 12.45,7.76 12.84,7.93L21.42,11.72M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2Z" fill="#FF9900"/>
      </svg>
    ),
    color: '#FF9900'
  },
  git: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.36,10.53l-8.06-8.06a1.5,1.5,0,0,0-2.12,0L10,5.64V2.5a1.5,1.5,0,0,0-3,0V9.81L1.64,15.19a1.5,1.5,0,0,0,0,2.12l4.62,4.62a1.5,1.5,0,0,0,2.12,0L13.76,16.5V21.5a1.5,1.5,0,0,0,3,0V13.63l3.47-3.47a1.5,1.5,0,0,0,0-2.12ZM15.26,12.2l-1.5,1.5a1.5,1.5,0,0,0,0,2.12l1.24,1.24L8.38,22.44,3.76,17.81,9.14,12.4a1.5,1.5,0,0,0,2.12,0l1.5-1.5-1.94-1.94,5.43-5.43,1.94,1.94ZM20.24,8.81l-1.94,1.94-5.43-5.43,1.94-1.94,5.43,5.43Z" fill="#F05032"/>
      </svg>
    ),
    color: '#F05032'
  },
  tensorflow: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M2.5,8L12,1.5L21.5,8V16L12,22.5L2.5,16V8M12,3.2L4.5,8.7V15.3L12,20.8L19.5,15.3V8.7L12,3.2M7,10L10,12.3V17H12V11L17,8V10H19V7L12,2.5L5,7V10H7Z" fill="#FF6F00"/>
      </svg>
    ),
    color: '#FF6F00'
  },
  pytorch: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M4.09,11.64C5.13,10 6.6,8.71 8.28,7.94C10.1,7.09 12.09,7.09 13.9,7.94C15.6,8.71 17.06,10 18.09,11.64C18.47,12.27 18.7,13 18.77,13.75C18.91,15.33 18.04,16.8 16.5,17.5C15.5,18 14.4,18.25 13.26,18.25H12.94C12.94,18.25 12.94,18.25 12.94,18.25C12.86,18.25 12.78,18.25 12.7,18.25C12.63,18.25 12.55,18.25 12.47,18.25C12.47,18.25 12.47,18.25 12.47,18.25H12.31C11.17,18.25 10.08,18 9.08,17.5C7.54,16.8 6.67,15.33 6.81,13.75C6.88,13 7.11,12.27 7.49,11.64M11.65,5.15C11.65,5.15 11.65,5.15 11.65,5.15C11.17,5.15 10.7,5.33 10.33,5.69C9.96,6.06 9.77,6.54 9.77,7C9.77,7.46 9.96,7.94 10.33,8.31C10.7,8.67 11.17,8.85 11.65,8.85C11.65,8.85 11.65,8.85 11.65,8.85C12.13,8.85 12.6,8.67 12.97,8.31C13.34,7.94 13.53,7.46 13.53,7C13.53,6.54 13.34,6.06 12.97,5.69C12.6,5.33 12.13,5.15 11.65,5.15M16.44,4C16.44,4 16.44,4 16.44,4C15.96,4 15.48,4.18 15.11,4.55C14.74,4.92 14.56,5.39 14.56,5.87C14.56,6.35 14.74,6.83 15.11,7.19C15.48,7.56 15.96,7.74 16.44,7.74C16.44,7.74 16.44,7.74 16.44,7.74C16.92,7.74 17.39,7.56 17.76,7.19C18.13,6.83 18.31,6.35 18.31,5.87C18.31,5.39 18.13,4.92 17.76,4.55C17.39,4.18 16.92,4 16.44,4" fill="#EE4C2C"/>
      </svg>
    ),
    color: '#EE4C2C'
  },
  vscode: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.1,11.16l-3.56-3.56a.74.74,0,0,0-1.05,0l-7.46,7.46L8,12a.74.74,0,0,0-1.05,0L3.37,15.6a.74.74,0,0,0,0,1.05l3.56,3.56a.74.74,0,0,0,1.05,0l7.46-7.46,3.06,3.06a.74.74,0,0,0,1.05,0l3.56-3.56a.74.74,0,0,0,0-1.05M8,18.84l-3.56-3.56L8,11.71l3.56,3.56M19.54,11l-3.56-3.56L19.54,3.88,23.1,7.44M4.46,11,8,14.56,4.46,18.12,0.9,14.56" fill="#007ACC"/>
      </svg>
    ),
    color: '#007ACC'
  },
  jupyter: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M11.19,5.5A1.13,1.13,0,0,1,12.31,6.63A1.13,1.13,0,0,1,11.19,7.75A1.13,1.13,0,0,1,10.06,6.63A1.13,1.13,0,0,1,11.19,5.5M17.38,15.25A1.13,1.13,0,0,1,16.25,16.38A1.13,1.13,0,0,1,15.13,15.25A1.13,1.13,0,0,1,16.25,14.13A1.13,1.13,0,0,1,17.38,15.25M6.63,15.25A1.13,1.13,0,0,1,7.75,16.38A1.13,1.13,0,0,1,6.63,17.5A1.13,1.13,0,0,1,5.5,16.38A1.13,1.13,0,0,1,6.63,15.25M12,9.75C14.7,9.75,17.2,11.83,17.84,14.5H16.25A3.75,3.75,0,0,1,12.5,10.81V10.75C12.5,10.75,12.5,10.75,12,9.75M12,9.75C11.5,10.75,11.5,10.81,11.5,10.81V10.75A3.75,3.75,0,0,1,7.75,14.5H6.16C6.8,11.83,9.3,9.75,12,9.75M12,15.25A3.75,3.75,0,0,1,8.41,18.5H10A2.25,2.25,0,0,0,12,16.81V16.75C12,16.75,12,16.75,12,15.25M12,15.25C12,16.75,12,16.81,12,16.81V16.75A2.25,2.25,0,0,0,14,18.5H15.59A3.75,3.75,0,0,1,12,15.25Z" fill="#F37626"/>
      </svg>
    ),
    color: '#F37626'
  },
  github: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2A10,10,0,0,0,2,12C2,16.42,4.87,20.17,8.84,21.5C9.34,21.58,9.5,21.27,9.5,21V19.24C6.73,19.84,6.14,17.97,6.14,17.97C5.68,16.81,5.03,16.5,5.03,16.5C4.12,15.88,5.1,15.9,5.1,15.9C6.1,15.97,6.63,16.93,6.63,16.93C7.5,18.45,8.97,18,9.54,17.76C9.63,17.11,9.89,16.67,10.17,16.42C7.95,16.17,5.62,15.31,5.62,11.5C5.62,10.39,6,9.5,6.65,8.79C6.55,8.54,6.2,7.5,6.75,6.15C6.75,6.15,7.55,5.88,9.5,7.17C10.29,6.95,11.15,6.84,12,6.84C12.85,6.84,13.71,6.95,14.5,7.17C16.45,5.88,17.25,6.15,17.25,6.15C17.8,7.5,17.45,8.54,17.35,8.79C18,9.5,18.38,10.39,18.38,11.5C18.38,15.32,16.04,16.16,13.81,16.41C14.17,16.72,14.5,17.33,14.5,18.26V21C14.5,21.27,14.66,21.59,15.17,21.5C19.14,20.16,22,16.42,22,12A10,10,0,0,0,12,2Z" fill="#181717"/>
      </svg>
    ),
    color: '#181717'
  },
  gitlab: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.95,10.63L20.8,3.38C20.55,2.88 20.06,2.5 19.5,2.5H4.5C3.94,2.5 3.45,2.88 3.2,3.38L0.05,10.63C-0.1,10.93 -0.02,11.28 0.2,11.53L11.5,22.8C11.67,22.95 11.83,23 12,23C12.17,23 12.33,22.95 12.5,22.8L23.8,11.53C24.02,11.28 24.1,10.93 23.95,10.63M12,4.5L14.7,10H9.3L12,4.5Z" fill="#FC6D26"/>
      </svg>
    ),
    color: '#FC6D26'
  },
  postman: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M16.4,7.12C16.03,6.14 15.22,5.33 14.24,4.96C13.56,4.72 12.78,4.6 12,4.6C10.09,4.6 8.33,5.32 7,6.56C5.67,5.32 3.91,4.6 2,4.6C1.65,4.6 1.3,4.63 0.95,4.69C0.68,4.75 0.43,4.86 0.19,5C0.07,5.06 0,5.18 0,5.31V18.35C0,18.5 0.1,18.63 0.24,18.68C1.4,19.14 2.65,19.4 4,19.4C5.91,19.4 7.67,18.68 9,17.44C10.33,18.68 12.09,19.4 14,19.4C15.91,19.4 17.67,18.68 19,17.44C20.33,18.68 22.09,19.4 24,19.4C24,18.58 24,10.15 24,10.15C24,8.5 23.03,7.24 21.6,6.91C20.46,6.65 19.24,6.77 18.17,7.26C17.63,7.5 17.15,7.82 16.74,8.21C16.59,8.04 16.45,7.88 16.32,7.73C16.36,7.53 16.38,7.33 16.4,7.12M14,16.5C13.2,16.5 12.5,15.8 12.5,15C12.5,14.2 13.2,13.5 14,13.5C14.8,13.5 15.5,14.2 15.5,15C15.5,15.8 14.8,16.5 14,16.5M18,11.5C17.2,11.5 16.5,10.8 16.5,10C16.5,9.2 17.2,8.5 18,8.5C18.8,8.5 19.5,9.2 19.5,10C19.5,10.8 18.8,11.5 18,11.5M4,16.5C3.2,16.5 2.5,15.8 2.5,15C2.5,14.2 3.2,13.5 4,13.5C4.8,13.5 5.5,14.2 5.5,15C5.5,15.8 4.8,16.5 4,16.5M4,11.5C3.2,11.5 2.5,10.8 2.5,10C2.5,9.2 3.2,8.5 4,8.5C4.8,8.5 5.5,9.2 5.5,10C5.5,10.8 4.8,11.5 4,11.5M9,11.5C8.2,11.5 7.5,10.8 7.5,10C7.5,9.2 8.2,8.5 9,8.5C9.8,8.5 10.5,9.2 10.5,10C10.5,10.8 9.8,11.5 9,11.5Z" fill="#FF6C37"/>
      </svg>
    ),
    color: '#FF6C37'
  },
  vim: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M2.4,3.71L4.8,3.15L8.4,20.29L6,20.85L2.4,3.71M9.6,3.15L12,3.71L8.4,20.85L6,20.29L9.6,3.15M13.2,3.15L15.6,3.71L12,20.85L9.6,20.29L13.2,3.15M16.8,3.15L19.2,3.71L15.6,20.85L13.2,20.29L16.8,3.15M20.4,3.15L22.8,3.71L19.2,20.85L16.8,20.29L20.4,3.15Z" fill="#019733"/>
      </svg>
    ),
    color: '#019733'
  },
  slack: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M5.04,15.11C5.04,16.2 4.14,17.1 3.05,17.1C1.96,17.1 1.06,16.2 1.06,15.11C1.06,14.02 1.96,13.12 3.05,13.12C3.28,13.12 3.49,13.16 3.69,13.24V11.32C3.49,11.24 3.28,11.2 3.05,11.2C1.96,11.2 1.06,12.1 1.06,13.19C1.06,13.42 1.1,13.63 1.18,13.83H3.09C3.01,13.63 2.97,13.42 2.97,13.19C2.97,12.79 3.3,12.46 3.7,12.46C4.1,12.46 4.43,12.79 4.43,13.19V17.8C4.43,18.2 4.1,18.53 3.7,18.53C3.3,18.53 2.97,18.2 2.97,17.8V15.89H1.18C1.26,16.09 1.3,16.3 1.3,16.53C1.3,17.62 2.2,18.52 3.29,18.52C4.38,18.52 5.28,17.62 5.28,16.53V15.11H5.04M5.69,11.2C5.69,10.11 6.59,9.21 7.68,9.21C8.77,9.21 9.67,10.11 9.67,11.2C9.67,12.29 8.77,13.19 7.68,13.19C7.45,13.19 7.24,13.15 7.04,13.07V14.99C7.24,15.07 7.45,15.11 7.68,15.11C8.77,15.11 9.67,16.01 9.67,17.1C9.67,17.33 9.63,17.54 9.55,17.74H7.64C7.72,17.54 7.76,17.33 7.76,17.1C7.76,16.7 7.43,16.37 7.03,16.37C6.63,16.37 6.3,16.7 6.3,17.1V8.51C6.3,8.11 6.63,7.78 7.03,7.78C7.43,7.78 7.76,8.11 7.76,8.51V10.42H9.55C9.47,10.22 9.43,10.01 9.43,9.78C9.43,8.69 8.53,7.79 7.44,7.79C6.35,7.79 5.45,8.69 5.45,9.78V11.2H5.69M8.89,5.04C7.8,5.04 6.9,4.14 6.9,3.05C6.9,1.96 7.8,1.06 8.89,1.06C9.12,1.06 9.33,1.1 9.53,1.18V3.09C9.33,3.01 9.12,2.97 8.89,2.97C8.49,2.97 8.16,3.3 8.16,3.7C8.16,4.1 8.49,4.43 8.89,4.43H13.5C13.9,4.43 14.23,4.1 14.23,3.7C14.23,3.3 13.9,2.97 13.5,2.97V1.18C13.7,1.1 13.91,1.06 14.14,1.06C15.23,1.06 16.13,1.96 16.13,3.05C16.13,3.28 16.09,3.49 16.01,3.69H17.92C18,3.49 18.04,3.28 18.04,3.05C18.04,1.96 17.14,1.06 16.05,1.06C14.96,1.06 14.06,1.96 14.06,3.05V5.04H8.89M18.8,5.69C19.89,5.69 20.79,6.59 20.79,7.68C20.79,8.77 19.89,9.67 18.8,9.67C18.57,9.67 18.36,9.63 18.16,9.55V7.64C18.36,7.72 18.57,7.76 18.8,7.76C19.2,7.76 19.53,7.43 19.53,7.03C19.53,6.63 19.2,6.3 18.8,6.3H14.11C13.71,6.3 13.38,6.63 13.38,7.03C13.38,7.43 13.71,7.76 14.11,7.76V9.55C13.91,9.63 13.7,9.67 13.47,9.67C12.38,9.67 11.48,8.77 11.48,7.68C11.48,7.45 11.52,7.24 11.6,7.04H9.69C9.61,7.24 9.57,7.45 9.57,7.68C9.57,8.77 10.47,9.67 11.56,9.67C12.65,9.67 13.55,8.77 13.55,7.68V5.69H18.8M22.94,8.89C22.94,7.8 22.04,6.9 20.95,6.9C20.72,6.9 20.51,6.94 20.31,7.02V8.93C20.51,8.85 20.72,8.81 20.95,8.81C21.35,8.81 21.68,9.14 21.68,9.54C21.68,9.94 21.35,10.27 20.95,10.27H16.27C15.87,10.27 15.54,9.94 15.54,9.54C15.54,9.14 15.87,8.81 16.27,8.81V7.02C16.07,6.94 15.86,6.9 15.63,6.9C14.54,6.9 13.64,7.8 13.64,8.89C13.64,9.12 13.68,9.33 13.76,9.53H11.85C11.77,9.33 11.73,9.12 11.73,8.89C11.73,7.8 10.83,6.9 9.74,6.9C8.65,6.9 7.75,7.8 7.75,8.89V14.06H8.89V8.89C8.89,8.49 9.22,8.16 9.62,8.16C10.02,8.16 10.35,8.49 10.35,8.89V14.06H11.73V8.89C11.73,8.49 12.06,8.16 12.46,8.16C12.86,8.16 13.19,8.49 13.19,8.89V14.06H13.64V8.89C13.64,8.49 13.97,8.16 14.37,8.16C14.77,8.16 15.1,8.49 15.1,8.89V14.06H15.54V8.89C15.54,8.49 15.87,8.16 16.27,8.16C16.67,8.16 17,8.49 17,8.89V14.06H17.92C17.84,13.86 17.8,13.65 17.8,13.42C17.8,12.33 18.7,11.43 19.79,11.43C20.88,11.43 21.78,12.33 21.78,13.42C21.78,13.65 21.74,13.86 21.66,14.06H19.75C19.67,13.86 19.63,13.65 19.63,13.42C19.63,13.02 19.3,12.69 18.9,12.69C18.5,12.69 18.17,13.02 18.17,13.42V17.1C18.17,17.5 18.5,17.83 18.9,17.83C19.3,17.83 19.63,17.5 19.63,17.1V15.11H21.42C21.34,15.31 21.3,15.52 21.3,15.75C21.3,16.84 20.4,17.74 19.31,17.74C18.22,17.74 17.32,16.84 17.32,15.75V14.06H18.17V15.75C18.17,16.15 18.5,16.48 18.9,16.48C19.3,16.48 19.63,16.15 19.63,15.75V15.11H21.66C21.74,15.31 21.78,15.52 21.78,15.75C21.78,16.84 20.88,17.74 19.79,17.74C19.56,17.74 19.35,17.7 19.15,17.62V19.53C19.35,19.61 19.56,19.65 19.79,19.65C20.88,19.65 21.78,18.75 21.78,17.66C21.78,17.43 21.74,17.22 21.66,17.02H23.57C23.65,17.22 23.69,17.43 23.69,17.66C23.69,18.75 22.79,19.65 21.7,19.65C20.61,19.65 19.71,18.75 19.71,17.66V8.89H22.94Z" fill="#4A154B"/>
      </svg>
    ),
    color: '#4A154B'
  },
  figma: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M12,7A3,3,0,0,1,15,10A3,3,0,0,1,12,13A3,3,0,0,1,9,10A3,3,0,0,1,12,7M12,8.5A1.5,1.5,0,0,0,10.5,10A1.5,1.5,0,0,0,12,11.5A1.5,1.5,0,0,0,13.5,10A1.5,1.5,0,0,0,12,8.5M12,14A3,3,0,0,1,15,17A3,3,0,0,1,12,20A3,3,0,0,1,9,17A3,3,0,0,1,12,14M12,15.5A1.5,1.5,0,0,0,10.5,17A1.5,1.5,0,0,0,12,18.5A1.5,1.5,0,0,0,13.5,17A1.5,1.5,0,0,0,12,15.5" fill="#F24E1E"/>
      </svg>
    ),
    color: '#F24E1E'
  },
  huggingface: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M12,4A8,8,0,0,1,20,12C20,13.43,19.5,14.75,18.7,15.86L15.86,18.7C14.75,19.5,13.43,20,12,20A8,8,0,0,1,4,12A8,8,0,0,1,12,4M8.5,7A1.5,1.5,0,0,0,7,8.5A1.5,1.5,0,0,0,8.5,10A1.5,1.5,0,0,0,10,8.5A1.5,1.5,0,0,0,8.5,7M15.5,7A1.5,1.5,0,0,0,14,8.5A1.5,1.5,0,0,0,15.5,10A1.5,1.5,0,0,0,17,8.5A1.5,1.5,0,0,0,15.5,7M7,12C7,13.66,8.34,15,10,15V17C7.24,17,5,14.76,5,12H7M14,15C15.66,15,17,13.66,17,12H19C19,14.76,16.76,17,14,17V15Z" fill="#FFD21E"/>
      </svg>
    ),
    color: '#FFD21E'
  },
  openai: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M22,12A10,10,0,0,1,12,22A10,10,0,0,1,2,12A10,10,0,0,1,12,2C14.3,2,16.4,2.8,18.1,4.2L16.2,6.1C14.9,5.2,13.5,4.7,12,4.7C7.9,4.7,4.7,7.9,4.7,12C4.7,16.1,7.9,19.3,12,19.3C16.1,19.3,19.3,16.1,19.3,12C19.3,10.5,18.8,9.1,17.9,7.8L19.8,5.9C21.2,7.6,22,9.7,22,12Z" fill="#412991"/>
      </svg>
    ),
    color: '#412991'
  },
  scikitlearn: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M12,4A8,8,0,0,1,20,12C20,13.43,19.5,14.75,18.7,15.86L15.86,18.7C14.75,19.5,13.43,20,12,20A8,8,0,0,1,4,12A8,8,0,0,1,12,4M8.5,7A1.5,1.5,0,0,0,7,8.5A1.5,1.5,0,0,0,8.5,10A1.5,1.5,0,0,0,10,8.5A1.5,1.5,0,0,0,8.5,7M15.5,7A1.5,1.5,0,0,0,14,8.5A1.5,1.5,0,0,0,15.5,10A1.5,1.5,0,0,0,17,8.5A1.5,1.5,0,0,0,15.5,7M7,12C7,13.66,8.34,15,10,15V17C7.24,17,5,14.76,5,12H7M14,15C15.66,15,17,13.66,17,12H19C19,14.76,16.76,17,14,17V15Z" fill="#F7931E"/>
      </svg>
    ),
    color: '#F7931E'
  },
  pandas: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M4.8,3.2H8.4V9.6H4.8V3.2M10.8,3.2H14.4V9.6H10.8V3.2M4.8,12H8.4V18.4H4.8V12M10.8,12H14.4V18.4H10.8V12M16.8,3.2H20.4V18.4H16.8V3.2Z" fill="#150458"/>
      </svg>
    ),
    color: '#150458'
  },
  numpy: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M4.8,3.2H8.4V9.6H4.8V3.2M10.8,3.2H14.4V9.6H10.8V3.2M4.8,12H8.4V18.4H4.8V12M10.8,12H14.4V18.4H10.8V12M16.8,3.2H20.4V18.4H16.8V3.2Z" fill="#013243"/>
      </svg>
    ),
    color: '#013243'
  },
  langchain: {
    component: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M14.08 13.35L16.5 12l-2.42-1.35-1.35-2.42L11.35 10.5 9 9.17l1.35 2.42L11.73 13l.97.52.05.03.06.03.1.05.1.06.09.05.1.06.09.05.1.05.08.05.1.05h.09l.1-.05.08-.05.1-.05.09-.05.1-.06.09-.05.1-.06.1-.05.06-.03.05-.03.97-.52m-5.16-5.16L11.34 9l1.35-2.42-2.42-1.35-2.42 1.35L9 9.17l-1.35-2.42L5.23 8.1l2.42 1.35 1.35 2.42L10.35 9.5l-.01.01.97.52.05.03.06.03.1.05.1.06.09.05.1.06.09.05.1.05.08.05.1.05h.09l.1-.05.08-.05.1-.05.09-.05.1-.06.09-.05.1-.06.1-.05.06-.03.05-.03.97-.52.05-.03.06-.03.1-.05.1-.06.09-.05.1-.06.09-.05.1-.05.08-.05.1-.05h.09l.1.05.08.05.1.05.09.05.1.06.09.05.1.06.1.05.06.03.05.03.97.52M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#1C3C3C"/>
        </svg>
    ),
    color: '#1C3C3C'
  },
  replicate: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M12,4A8,8,0,0,1,20,12C20,13.43,19.5,14.75,18.7,15.86L15.86,18.7C14.75,19.5,13.43,20,12,20A8,8,0,0,1,4,12A8,8,0,0,1,12,4M8.5,7A1.5,1.5,0,0,0,7,8.5A1.5,1.5,0,0,0,8.5,10A1.5,1.5,0,0,0,10,8.5A1.5,1.5,0,0,0,8.5,7M15.5,7A1.5,1.5,0,0,0,14,8.5A1.5,1.5,0,0,0,15.5,10A1.5,1.5,0,0,0,17,8.5A1.5,1.5,0,0,0,15.5,7M7,12C7,13.66,8.34,15,10,15V17C7.24,17,5,14.76,5,12H7M14,15C15.66,15,17,13.66,17,12H19C19,14.76,16.76,17,14,17V15Z" fill="#000000"/>
      </svg>
    ),
    color: '#000000'
  },
  colab: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2M12,4A8,8,0,0,1,20,12C20,13.43,19.5,14.75,18.7,15.86L15.86,18.7C14.75,19.5,13.43,20,12,20A8,8,0,0,1,4,12A8,8,0,0,1,12,4M8.5,7A1.5,1.5,0,0,0,7,8.5A1.5,1.5,0,0,0,8.5,10A1.5,1.5,0,0,0,10,8.5A1.5,1.5,0,0,0,8.5,7M15.5,7A1.5,1.5,0,0,0,14,8.5A1.5,1.5,0,0,0,15.5,10A1.5,1.5,0,0,0,17,8.5A1.5,1.5,0,0,0,15.5,7M7,12C7,13.66,8.34,15,10,15V17C7.24,17,5,14.76,5,12H7M14,15C15.66,15,17,13.66,17,12H19C19,14.76,16.76,17,14,17V15Z" fill="#F9AB00"/>
      </svg>
    ),
    color: '#F9AB00'
  },
  problemsolving: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M10,8V10H14V8H10M10,12V16H14V12H10Z"/>
      </svg>
    ),
    color: '#4CAF50'
  },
  communication: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
    ),
    color: '#2196F3'
  },
  teamwork: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,12c2.21,0,4-1.79,4-4s-1.79-4-4-4S8,5.79,8,8S9.79,12,12,12z M12,14c-2.67,0-8,1.34-8,4v2h16v-2C20,15.34,14.67,14,12,14z"/>
        <path d="M6 14c-1.1 0-2 .9-2 2v2h4v-2c0-1.1-.9-2-2-2z M6 10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z M18 14c-1.1 0-2 .9-2 2v2h4v-2c0-1.1-.9-2-2-2z M18 10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
      </svg>
    ),
    color: '#9C27B0'
  },
  creativethinking: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12,2A10,10,0,0,0,2,12C2,17.52,6.48,22,12,22C17.52,22,22,17.52,22,12C22,6.48,17.52,2,12,2M12,4A8,8,0,0,1,20,12A8,8,0,0,1,12,20A8,8,0,0,1,4,12A8,8,0,0,1,12,4M12,6A6,6,0,0,0,6,12H8A4,4,0,0,1,12,8V6M12,10A2,2,0,0,0,10,12H14A2,2,0,0,0,12,10Z" fill="#FFC107"/>
      </svg>
    ),
    color: '#FFC107'
  },
  adaptability: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    ),
    color: '#00BCD4'
  },
  leadership: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    color: '#E91E63'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit (Languages & Frameworks)
  { 
    id: 'javascript',
    orbitRadius: 120, 
    size: 40, 
    speed: 0.20, 
    iconType: 'javascript', 
    phaseShift: 0, 
    glowColor: 'yellow',
    label: 'JavaScript',
    orbitId: 1
  },
  { 
    id: 'typescript',
    orbitRadius: 120, 
    size: 40, 
    speed: 0.20, 
    iconType: 'typescript', 
    phaseShift: Math.PI / 4, 
    glowColor: 'blue',
    label: 'TypeScript',
    orbitId: 1
  },
  { 
    id: 'python',
    orbitRadius: 120, 
    size: 40, 
    speed: 0.20, 
    iconType: 'python', 
    phaseShift: Math.PI / 2, 
    glowColor: 'blue',
    label: 'Python',
    orbitId: 1
  },
  { 
    id: 'react',
    orbitRadius: 120, 
    size: 40, 
    speed: 0.20, 
    iconType: 'react', 
    phaseShift: 3 * Math.PI / 4, 
    glowColor: 'cyan',
    label: 'React',
    orbitId: 1
  },
  { 
    id: 'node',
    orbitRadius: 120, 
    size: 40, 
    speed: 0.20, 
    iconType: 'node', 
    phaseShift: Math.PI, 
    glowColor: 'green',
    label: 'Node.js',
    orbitId: 1
  },
  { 
    id: 'next',
    orbitRadius: 120, 
    size: 40, 
    speed: 0.20, 
    iconType: 'next', 
    phaseShift: 5 * Math.PI / 4, 
    glowColor: 'black',
    label: 'Next.js',
    orbitId: 1
  },
  { 
    id: 'vue',
    orbitRadius: 120, 
    size: 40, 
    speed: 0.20, 
    iconType: 'vue', 
    phaseShift: 3 * Math.PI / 2, 
    glowColor: 'green',
    label: 'Vue.js',
    orbitId: 1
  },
  { 
    id: 'fastapi',
    orbitRadius: 120, 
    size: 40, 
    speed: 0.20, 
    iconType: 'fastapi', 
    phaseShift: 7 * Math.PI / 4, 
    glowColor: 'green',
    label: 'FastAPI',
    orbitId: 1
  },
  
  // Second Orbit (Styling & Databases)
  { 
    id: 'html',
    orbitRadius: 200, 
    size: 35, 
    speed: -0.15, 
    iconType: 'html', 
    phaseShift: 0, 
    glowColor: 'orange',
    label: 'HTML',
    orbitId: 2
  },
  { 
    id: 'css',
    orbitRadius: 200, 
    size: 35, 
    speed: -0.15, 
    iconType: 'css', 
    phaseShift: Math.PI / 3, 
    glowColor: 'blue',
    label: 'CSS',
    orbitId: 2
  },
  { 
    id: 'tailwind',
    orbitRadius: 200, 
    size: 35, 
    speed: -0.15, 
    iconType: 'tailwind', 
    phaseShift: 2 * Math.PI / 3, 
    glowColor: 'cyan',
    label: 'Tailwind CSS',
    orbitId: 2
  },
  { 
    id: 'sql',
    orbitRadius: 200, 
    size: 35, 
    speed: -0.15, 
    iconType: 'sql', 
    phaseShift: Math.PI, 
    glowColor: 'orange',
    label: 'SQL',
    orbitId: 2
  },
  { 
    id: 'mongodb',
    orbitRadius: 200, 
    size: 35, 
    speed: -0.15, 
    iconType: 'mongodb', 
    phaseShift: 4 * Math.PI / 3, 
    glowColor: 'green',
    label: 'MongoDB',
    orbitId: 2
  },
  { 
    id: 'postgresql',
    orbitRadius: 200, 
    size: 35, 
    speed: -0.15, 
    iconType: 'postgresql', 
    phaseShift: 5 * Math.PI / 3, 
    glowColor: 'blue',
    label: 'PostgreSQL',
    orbitId: 2
  },
  
  // Third Orbit (DevOps & Tools)
  { 
    id: 'docker',
    orbitRadius: 280, 
    size: 30, 
    speed: 0.12, 
    iconType: 'docker', 
    phaseShift: 0, 
    glowColor: 'blue',
    label: 'Docker',
    orbitId: 3
  },
  { 
    id: 'kubernetes',
    orbitRadius: 280, 
    size: 30, 
    speed: 0.12, 
    iconType: 'kubernetes', 
    phaseShift: Math.PI / 4, 
    glowColor: 'blue',
    label: 'Kubernetes',
    orbitId: 3
  },
  { 
    id: 'aws',
    orbitRadius: 280, 
    size: 30, 
    speed: 0.12, 
    iconType: 'aws', 
    phaseShift: Math.PI / 2, 
    glowColor: 'orange',
    label: 'AWS',
    orbitId: 3
  },
  { 
    id: 'git',
    orbitRadius: 280, 
    size: 30, 
    speed: 0.12, 
    iconType: 'git', 
    phaseShift: 3 * Math.PI / 4, 
    glowColor: 'orange',
    label: 'Git',
    orbitId: 3
  },
  { 
    id: 'tensorflow',
    orbitRadius: 280, 
    size: 30, 
    speed: 0.12, 
    iconType: 'tensorflow', 
    phaseShift: Math.PI, 
    glowColor: 'orange',
    label: 'TensorFlow',
    orbitId: 3
  },
  { 
    id: 'pytorch',
    orbitRadius: 280, 
    size: 30, 
    speed: 0.12, 
    iconType: 'pytorch', 
    phaseShift: 5 * Math.PI / 4, 
    glowColor: 'red',
    label: 'PyTorch',
    orbitId: 3
  },
  { 
    id: 'vscode',
    orbitRadius: 280, 
    size: 30, 
    speed: 0.12, 
    iconType: 'vscode', 
    phaseShift: 3 * Math.PI / 2, 
    glowColor: 'blue',
    label: 'VS Code',
    orbitId: 3
  },
  { 
    id: 'github',
    orbitRadius: 280, 
    size: 30, 
    speed: 0.12, 
    iconType: 'github', 
    phaseShift: 7 * Math.PI / 4, 
    glowColor: 'black',
    label: 'GitHub',
    orbitId: 3
  },
  
  // Fourth Orbit (Soft Skills)
  { 
    id: 'problemsolving',
    orbitRadius: 360, 
    size: 25, 
    speed: -0.10, 
    iconType: 'problemsolving', 
    phaseShift: 0, 
    glowColor: 'green',
    label: 'Problem Solving',
    orbitId: 4
  },
  { 
    id: 'communication',
    orbitRadius: 360, 
    size: 25, 
    speed: -0.10, 
    iconType: 'communication', 
    phaseShift: Math.PI / 3, 
    glowColor: 'blue',
    label: 'Communication',
    orbitId: 4
  },
  { 
    id: 'teamwork',
    orbitRadius: 360, 
    size: 25, 
    speed: -0.10, 
    iconType: 'teamwork', 
    phaseShift: 2 * Math.PI / 3, 
    glowColor: 'purple',
    label: 'Teamwork',
    orbitId: 4
  },
  { 
    id: 'creativethinking',
    orbitRadius: 360, 
    size: 25, 
    speed: -0.10, 
    iconType: 'creativethinking', 
    phaseShift: Math.PI, 
    glowColor: 'yellow',
    label: 'Creative Thinking',
    orbitId: 4
  },
  { 
    id: 'adaptability',
    orbitRadius: 360, 
    size: 25, 
    speed: -0.10, 
    iconType: 'adaptability', 
    phaseShift: 4 * Math.PI / 3, 
    glowColor: 'cyan',
    label: 'Adaptability',
    orbitId: 4
  },
  { 
    id: 'leadership',
    orbitRadius: 360, 
    size: 25, 
    speed: -0.10, 
    iconType: 'leadership', 
    phaseShift: 5 * Math.PI / 3, 
    glowColor: 'pink',
    label: 'Leadership',
    orbitId: 4
  }
];

// --- Memoized Orbiting Skill Component ---
// This is the component you were working on. I've completed it.
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 30 : 10,
        // @ts-ignore
        '--glow-color': iconComponents[iconType]?.color || '#fff',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* The icon and its background/glow */}
        <div
          className="w-full h-full flex items-center justify-center rounded-full bg-gray-900 bg-opacity-50 backdrop-blur-sm border border-gray-700 transition-all duration-300"
          style={{
            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
            filter: isHovered 
              ? `drop-shadow(0 0 6px var(--glow-color)) drop-shadow(0 0 10px var(--glow-color)) saturate(1)` 
              : 'saturate(0) grayscale(0.5) opacity(0.8)',
          }}
        >
          <div className="w-[70%] h-[70%]"> {/* Scale icon inside the circle */}
            <SkillIcon type={iconType} />
          </div>
        </div>

        {/* Label on hover */}
        {isHovered && (
          <div 
            className="absolute -top-1 left-1/2 -translate-x-1/2 -translate-y-full px-3 py-1 text-sm text-white bg-black bg-opacity-70 rounded-md shadow-lg whitespace-nowrap z-40"
          >
            {label}
            {/* Tooltip arrow */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black border-t-opacity-70"></div>
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';


// --- Glowing Orbit Path ---
// This is one of the missing components.
const glowColors: Record<GlowColor, string> = {
  cyan: '#06b6d4',
  purple: '#a855f7',
  blue: '#3b82f6',
  green: '#22c55e',
  yellow: '#eab308',
  pink: '#ec4899',
  red: '#ef4444',
  indigo: '#6366f1',
  orange: '#f97316',
  black: '#ffffff', // Black glow is white
};

const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0, isHovered, orbitId, onHover }: GlowingOrbitPathProps) => {
  const color = glowColors[glowColor] || glowColors.cyan;

  return (
    <circle
      cx="0"
      cy="0"
      r={radius}
      fill="none"
      stroke="rgba(100, 116, 139, 0.3)" // Faint base ring
      strokeWidth="1"
      className="transition-all duration-300"
      onMouseEnter={() => onHover(orbitId, true)}
      onMouseLeave={() => onHover(orbitId, false)}
      style={{
        stroke: isHovered ? color : 'rgba(100, 116, 139, 0.3)',
        filter: isHovered ? `drop-shadow(0 0 8px ${color})` : 'none',
        strokeDasharray: '10 10',
        opacity: isHovered ? 0.7 : 1,
        animation: `spin ${isHovered ? '20s' : '60s'} linear infinite`,
        animationDelay: `${animationDelay}s`,
        transformOrigin: '0 0',
      }}
    />
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';


// --- Main Skill Orbit Component ---
// This component manages the state and animation loop.
const SkillOrbit: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [hoveredOrbit, setHoveredOrbit] = useState<number | null>(null);
  const animationFrameRef = useRef<number>();

  const handleOrbitHover = useCallback((orbitId: number, isHovered: boolean) => {
    setHoveredOrbit(isHovered ? orbitId : null);
  }, []);

  useEffect(() => {
    const animate = () => {
      setAngle((prevAngle) => prevAngle + 0.0005); // Base rotation speed
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Group skills by orbit
  const orbits = Array.from(new Set(skillsConfig.map(s => s.orbitId))).map(id => {
    const skillsInOrbit = skillsConfig.filter(s => s.orbitId === id);
    const radius = skillsInOrbit[0].orbitRadius;
    const glowColor = skillsInOrbit[0].glowColor || 'cyan'; 
    return {
      id,
      radius,
      glowColor,
      skills: skillsInOrbit,
      animationDelay: (id - 1) * -10, // Offset animations
    };
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-950 overflow-hidden">
      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      {/* SVG Container for Orbits */}
      <svg 
        className="absolute w-full h-full" 
        viewBox="-400 -400 800 800" // Center the viewbox
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0, 0)">
          {orbits.map(orbit => (
            <GlowingOrbitPath
              key={orbit.id}
              radius={orbit.radius}
              glowColor={orbit.glowColor}
              animationDelay={orbit.animationDelay}
              isHovered={hoveredOrbit === orbit.id}
              orbitId={orbit.id}
              onHover={handleOrbitHover}
            />
          ))}
        </g>
      </svg>

      {/* Centerpiece */}
      <div className="relative z-20 flex flex-col items-center justify-center w-28 h-28 bg-gray-900 border-2 border-cyan-500 rounded-full shadow-[0_0_20px_theme(colors.cyan.500),_0_0_30px_theme(colors.cyan.600)_inset]">
        <span className="text-2xl font-bold text-white tracking-widest">SKILLS</span>
      </div>

      {/* Skills Container */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="relative w-full h-full" style={{ transform: 'translateZ(0)' }}> {/* Force hardware acceleration */}
          {skillsConfig.map((config) => {
            // Apply individual speed, base angle, and phase shift
            const skillAngle = (angle * config.speed * 50) + config.phaseShift;
            return (
              <OrbitingSkill
                key={config.id}
                config={config}
                angle={skillAngle}
              />
            );
          })}
        </div>
      </div>

    </div>
  );
};
SkillOrbit.displayName = 'SkillOrbit';


// --- App Component ---
// This is the main export for your application.
export default function App() {
  return (
    <div className="h-screen w-screen bg-gray-950 text-white">
      <SkillOrbit />
    </div>
  );
}