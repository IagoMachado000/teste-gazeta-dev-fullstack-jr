"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextData {
    isOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextData>(
    {} as SidebarContextData
);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen((prev) => !prev);
    const closeSidebar = () => setIsOpen(false);

    return (
        <SidebarContext.Provider
            value={{ isOpen, toggleSidebar, closeSidebar }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export const useSidebar = () => useContext(SidebarContext);
