import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "matrix" | "cyberpunk" | "dracula";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check local storage or default to 'default'
        if (typeof window !== "undefined") {
            return (localStorage.getItem("theme") as Theme) || "default";
        }
        return "default";
    });

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove all theme classes
        root.classList.remove("theme-matrix", "theme-cyberpunk", "theme-dracula");

        // Add current theme class if not default
        if (theme !== "default") {
            root.classList.add(`theme-${theme}`);
        }

        // Save to local storage
        localStorage.setItem("theme", theme);
    }, [theme]);

    const availableThemes: Theme[] = ["default", "matrix", "cyberpunk", "dracula"];

    return (
        <ThemeContext.Provider value={{ theme, setTheme, availableThemes }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
