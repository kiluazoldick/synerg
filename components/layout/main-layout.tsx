"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  Package,
  Truck,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react";
import { colors } from "@/lib/theme";

interface MainLayoutProps {
  children: React.ReactNode;
  currentModule: string;
  onModuleChange: (module: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export function MainLayout({
  children,
  currentModule,
  onModuleChange,
  isDark,
  onToggleTheme,
}: Readonly<MainLayoutProps>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const palette = isDark ? colors.dark : colors.light;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modules = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "clients", label: "Clients", icon: Users },
    { id: "orders", label: "Commandes", icon: ShoppingCart },
    { id: "invoices", label: "Factures", icon: FileText },
    { id: "inventory", label: "Stocks", icon: Package },
    { id: "suppliers", label: "Fournisseurs", icon: Truck },
    { id: "documentation", label: "Documentation", icon: HelpCircle },
  ];

  const handleModuleClick = (moduleId: string) => {
    onModuleChange(moduleId);
  };

  // Desktop Layout with Sidebar
  if (!isMobile) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          backgroundColor: palette.bg.primary,
          flexDirection: "row",
        }}
      >
        {/* Desktop Sidebar */}
        <aside
          style={{
            backgroundColor: palette.bg.secondary,
            borderRight: `1px solid ${palette.border}`,
            width: sidebarOpen ? "280px" : "80px",
            height: "100%",
            transition: "width 0.3s ease",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            boxShadow: palette.shadow,
          }}
        >
          {/* Sidebar Header */}
          <div
            style={{
              padding: "24px 20px",
              borderBottom: `1px solid ${palette.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "80px",
            }}
          >
            {sidebarOpen && (
              <h1
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: palette.accent.blue,
                  margin: 0,
                }}
              >
                SynergERP
              </h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                padding: "8px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                borderRadius: "8px",
                color: palette.text.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
                minWidth: "40px",
                minHeight: "40px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = palette.bg.tertiary)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav
            style={{
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "0px",
              flex: 1,
            }}
          >
            {modules.map((module) => {
              const Icon = module.icon;
              const isActive = currentModule === module.id;

              return (
                <button
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: sidebarOpen ? "flex-start" : "center",
                    gap: "12px",
                    padding: "12px 16px",
                    marginBottom: "8px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    backgroundColor: isActive
                      ? palette.accent.blue
                      : "transparent",
                    color: isActive
                      ? palette.text.inverse
                      : palette.text.secondary,
                    fontSize: "14px",
                    fontWeight: isActive ? "600" : "500",
                    transition: "all 0.2s ease",
                    fontFamily: "'Geist', sans-serif",
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor =
                        palette.bg.tertiary;
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                  title={!sidebarOpen ? module.label : undefined}
                >
                  <Icon size={20} style={{ flexShrink: 0 }} />
                  {sidebarOpen && <span>{module.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Theme Toggle at Bottom */}
          <div
            style={{
              padding: "12px",
              borderTop: `1px solid ${palette.border}`,
            }}
          >
            <button
              onClick={onToggleTheme}
              style={{
                width: "100%",
                padding: "12px 16px",
                backgroundColor: palette.bg.tertiary,
                border: `1px solid ${palette.border}`,
                borderRadius: "10px",
                cursor: "pointer",
                color: palette.text.secondary,
                display: "flex",
                alignItems: "center",
                justifyContent: sidebarOpen ? "flex-start" : "center",
                gap: "12px",
                fontSize: "14px",
                fontFamily: "'Geist', sans-serif",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = palette.bg.secondary;
                e.currentTarget.style.borderColor = palette.accent.blue;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = palette.bg.tertiary;
                e.currentTarget.style.borderColor = palette.border;
              }}
              title={
                !sidebarOpen
                  ? isDark
                    ? "Mode clair"
                    : "Mode sombre"
                  : undefined
              }
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
              {sidebarOpen && (isDark ? "Clair" : "Sombre")}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: palette.bg.primary,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: "16px 32px",
              borderBottom: `1px solid ${palette.border}`,
              backgroundColor: palette.bg.secondary,
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          ></div>

          <div
            style={{
              padding: "32px",
              maxWidth: "1400px",
              margin: "0 auto",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    );
  }

  // Mobile/Tablet Layout with Bottom Navbar
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: palette.bg.primary,
      }}
    >
      {/* Mobile Header */}
      <header
        style={{
          backgroundColor: palette.bg.secondary,
          borderBottom: `1px solid ${palette.border}`,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "56px",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: palette.accent.blue,
            margin: 0,
          }}
        >
          SynergERP
        </h1>
        <button
          onClick={onToggleTheme}
          style={{
            padding: "6px 10px",
            backgroundColor: palette.bg.tertiary,
            border: `1px solid ${palette.border}`,
            borderRadius: "6px",
            cursor: "pointer",
            color: palette.text.secondary,
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            fontFamily: "'Geist', sans-serif",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = palette.bg.secondary;
            e.currentTarget.style.borderColor = palette.accent.blue;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = palette.bg.tertiary;
            e.currentTarget.style.borderColor = palette.border;
          }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          paddingBottom: "70px",
          backgroundColor: palette.bg.primary,
        }}
      >
        <div
          style={{
            padding: "16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      </main>

      {/* Bottom Navbar (WhatsApp style) */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: palette.bg.secondary,
          borderTop: `1px solid ${palette.border}`,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "65px",
          boxShadow: `0 -2px 10px ${palette.shadow}`,
          overflowX: "auto",
          overflowY: "hidden",
          paddingBottom: "8px",
        }}
      >
        {modules.map((module) => {
          const Icon = module.icon;
          const isActive = currentModule === module.id;

          return (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              style={{
                minWidth: "70px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "2px",
                padding: "6px 8px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                color: isActive ? palette.accent.blue : palette.text.secondary,
                fontSize: "9px",
                fontWeight: isActive ? "600" : "400",
                transition: "all 0.2s ease",
                fontFamily: "'Geist', sans-serif",
                flexShrink: 0,
              }}
              title={module.label}
            >
              <Icon
                size={18}
                style={{
                  strokeWidth: isActive ? 2.5 : 2,
                }}
              />
              <span
                style={{
                  marginTop: "-1px",
                  textAlign: "center",
                  lineHeight: "1",
                }}
              >
                {module.label.split(" ")[0].substring(0, 6)}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
