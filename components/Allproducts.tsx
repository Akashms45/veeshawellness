"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { products } from "./Products";
import { MoveLeft, X } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Product {
  id: string | number;
  name: string;
  type: string;
  composition: string;
  packing: string;
  mrp: number;
}

interface ProductDialogProps {
  product: Product;
  onClose: () => void;
}

interface ProductTableProps {
  products: Product[];
  onRowClick: (product: Product) => void;
}

interface FilterTabsProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

// ── Allproducts Component ─────────────────────────────────────────────────────

export default function Allproducts(): React.JSX.Element {
  const router = useRouter();
  const params = useParams();
  const category = params?.category as string | string[] | undefined;
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Flatten the products data from Products.ts
  const allFlattenedProducts: Product[] = useMemo(() => 
    products.flatMap(group => 
      group.items.map(item => ({
        id: `${group.id}-${item.sno}`,
        name: item.composition,
        type: group.category,
        composition: item.composition,
        packing: item.packing,
        mrp: item.mrp
      }))
    ), []);

  const ALL_CATEGORIES: string[] = [
    "All",
    ...Array.from(new Set(allFlattenedProducts.map((p) => p.type))),
  ];

  const FONT_HEAD = "Impact, Anton, 'Arial Black', sans-serif";
  const FONT_BODY = "var(--font-sans), sans-serif";

  const toSlug = (cat: string): string =>
    cat.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  const fromSlug = (slug: string): string =>
    ALL_CATEGORIES.find((c) => toSlug(c) === slug) ?? "All";

  const categorySlug = Array.isArray(category) ? category[0] : category;
  const activeFilter: string = categorySlug ? fromSlug(categorySlug) : "All";

  const handleFilterChange = (cat: string): void => {
    if (cat === "All") router.push("/allproducts");
    else router.push(`/allproducts/${toSlug(cat)}`);
  };

  const filtered: Product[] =
    activeFilter === "All"
      ? allFlattenedProducts
      : allFlattenedProducts.filter((p) => p.type === activeFilter);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      <style>{`
        .view-toggle-wrap { display: inline-flex; border: 1.5px solid #0E101E; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
        .view-toggle { display: inline-flex; align-items: center; justify-content: center; background: none; border: none; padding: 6px 10px; cursor: pointer; color: #0E101E; transition: background 0.2s, color 0.2s; }
        .view-toggle + .view-toggle { border-left: 1.5px solid #0E101E; }
        .view-toggle.active { background: #0E101E; color: #fff; }
        .view-toggle:not(.active):hover { background: #f0f0f0; }
      `}</style>

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding:
            "clamp(0.8rem, 2.5vw, 1.4rem) clamp(1.2rem, 6vw, 5rem) clamp(0.6rem, 2vw, 1rem)",
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "none",
            border: "none",
            color: "#233E8B",
            cursor: "pointer",
            padding: 0,
            transition: "opacity 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.opacity = "0.65")
          }
          onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.opacity = "1")
          }
          aria-label="Back to home"
        >
          <MoveLeft size={28} />
        </button>

        <h1
          style={{
            fontFamily: FONT_HEAD,
            fontSize: "clamp(1.8rem, 6vw, 4rem)",
            textTransform: "uppercase",
            color: "#0E101E",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "0.02em",
            textAlign: "center",
            flex: 1,
          }}
        >
          Our Products
        </h1>

        <div style={{ flexShrink: 0, width: "60px" }} />
      </div>

      {/* Filter row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 clamp(1.2rem, 6vw, 5rem) clamp(1.2rem, 3vw, 2rem)",
          gap: 12,
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <FilterTabs
            categories={ALL_CATEGORIES}
            active={activeFilter}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          padding: "0 clamp(1.2rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem)",
        }}
      >
        {filtered.length > 0 ? (
          <ProductTable
            products={filtered}
            onRowClick={(p) => setSelectedProduct(p)}
          />
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              color: "#aaa",
              fontFamily: FONT_BODY,
            }}
          >
            No products in this category yet.
          </div>
        )}
      </div>

      {/* Detail Dialog / Drawer */}
      {selectedProduct && (
        <ProductDialog
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ProductDialog({ product, onClose }: ProductDialogProps): React.JSX.Element | null {
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const cardRef    = React.useRef<HTMLDivElement>(null);
  const FONT_HEAD = "Impact, Anton, 'Arial Black', sans-serif";
  const FONT_BODY = "var(--font-sans), sans-serif";

  useEffect(() => {
    const onResize = (): void => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    if (isMobile) {
      card.style.transform = "translateY(100%)";
      card.style.opacity = "1";
      requestAnimationFrame(() => {
        card.style.transition = "transform 0.38s cubic-bezier(0.32,0.72,0,1)";
        card.style.transform = "translateY(0)";
      });
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(32px) scale(0.96)";
      requestAnimationFrame(() => {
        card.style.transition =
          "opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)";
        card.style.opacity = "1";
        card.style.transform = "translateY(0) scale(1)";
      });
    }
  }, [isMobile]);

  if (!product) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(14,16,30,0.6)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? 0 : "1.5rem",
      }}
    >
      <div
        ref={cardRef}
        style={{
          background: "#fff",
          borderRadius: isMobile ? "20px 20px 0 0" : 24,
          width: "100%",
          maxWidth: isMobile ? "100%" : 780,
          maxHeight: isMobile ? "88vh" : "90vh",
          overflow: "hidden",
          boxShadow: isMobile
            ? "0 -8px 40px rgba(0,0,0,0.18)"
            : "0 40px 100px rgba(0,0,0,0.28)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {isMobile && (
          <div style={{ position: "absolute", top: 10, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
            <div style={{ width: 40, height: 4, borderRadius: 99, background: "rgba(0,0,0,0.15)" }} />
          </div>
        )}

        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: isMobile ? 14 : 16,
            right: 16,
            zIndex: 10,
            background: "#0E101E",
            border: "none",
            borderRadius: "50%",
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, overflowY: "auto", padding: isMobile ? "2.4rem 1.4rem 2rem" : "2.4rem 2.4rem 2.4rem" }}>
          <span style={{ display: "inline-block", background: "#0E101E", color: "#fff", borderRadius: 6, padding: "4px 14px", fontSize: 12, fontFamily: FONT_HEAD, letterSpacing: "0.08em", marginBottom: "0.75rem", alignSelf: "flex-start" }}>
            {product.type}
          </span>

          <h2 style={{ fontFamily: FONT_HEAD, fontSize: isMobile ? "1.5rem" : "clamp(1.4rem, 3vw, 2rem)", textTransform: "uppercase", letterSpacing: "0.04em", color: "#0F172A", margin: "0 0 0.5rem", lineHeight: 1.1 }}>
            {product.name}
          </h2>

          <div style={{ height: 1, background: "#f0f0f0", marginBottom: "1.1rem" }} />

          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontFamily: FONT_HEAD, fontSize: 12, letterSpacing: "0.1em", color: "#aaa", margin: "0 0 5px", textTransform: "uppercase" }}>Composition</p>
            <p style={{ fontFamily: FONT_BODY, fontSize: 14, color: "#222", margin: 0, lineHeight: 1.65 }}>{product.composition ?? "—"}</p>
          </div>

          <div>
            <p style={{ fontFamily: FONT_HEAD, fontSize: 12, letterSpacing: "0.1em", color: "#aaa", margin: "0 0 5px", textTransform: "uppercase" }}>Packing</p>
            <p style={{ fontFamily: FONT_HEAD, fontSize: 18, color: "#233E8B", margin: 0, letterSpacing: "0.04em" }}>{product.packing ?? "—"}</p>
          </div>
          
          {/* <div style={{ marginTop: "1rem" }}>
            <p style={{ fontFamily: FONT_HEAD, fontSize: 12, letterSpacing: "0.1em", color: "#aaa", margin: "0 0 5px", textTransform: "uppercase" }}>MRP</p>
            <p style={{ fontFamily: FONT_HEAD, fontSize: 24, color: "#1a7a3a", margin: 0 }}>₹{product.mrp.toFixed(2)}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function ProductTable({ products, onRowClick }: ProductTableProps): React.JSX.Element {
  const FONT_HEAD = "Impact, Anton, 'Arial Black', sans-serif";
  const FONT_BODY = "var(--font-sans), sans-serif";
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: FONT_BODY, fontSize: "14px" }}>
        <thead>
          <tr style={{ background: "#0E101E" }}>
            {["#", "Composition", "Type", "Packing"/*, "MRP"*/].map((h) => (
              <th key={h} style={{ padding: "14px 18px", textAlign: "left", color: "#fff", fontFamily: FONT_BODY, fontSize: "14px", letterSpacing: "0.02em", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => (
            <tr
              key={product.id}
              onClick={() => onRowClick(product)}
              style={{ background: i % 2 === 0 ? "#fff" : "#F7F8FA", transition: "background 0.15s", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#EEF2FF")}
              onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#F7F8FA")}
            >
              <td style={{ padding: "12px 18px", color: "#aaa", fontSize: "13px", fontFamily: FONT_BODY, width: 48 }}>{String(i + 1).padStart(2, "0")}</td>
              <td style={{ padding: "12px 18px", fontFamily: FONT_BODY, fontSize: "15px", fontWeight: 600, color: "#0F172A" }}>{product.composition}</td>
              <td style={{ padding: "12px 18px" }}><span style={{ display: "inline-block", background: "#0E101E", color: "#fff", borderRadius: 6, padding: "3px 12px", fontSize: "12px", fontFamily: FONT_BODY, fontWeight: 500, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>{product.type}</span></td>
              <td style={{ padding: "12px 18px", color: "#233E8B", fontFamily: FONT_BODY, fontWeight: 500, fontSize: "14px", whiteSpace: "nowrap" }}>{product.packing ?? "—"}</td>
              {/* <td style={{ padding: "12px 18px", color: "#1a7a3a", fontFamily: FONT_BODY, fontSize: "14px" }}>₹{product.mrp.toFixed(2)}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilterTabs({ categories, active, onChange }: FilterTabsProps): React.JSX.Element {
  const FONT_HEAD = "Impact, Anton, 'Arial Black', sans-serif";
  const FONT_BODY = "var(--font-sans), sans-serif";
  return (
    <div style={{ display: "inline-flex", flexWrap: "wrap", gap: "clamp(5px, 0.8vw, 9px)" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            border: "1.5px solid #0E101E",
            background: active === cat ? "#0E101E" : "transparent",
            borderRadius: 8,
            padding: "clamp(5px, 0.7vw, 8px) clamp(14px, 2vw, 24px)",
            fontSize: "clamp(0.72rem, 1vw, 0.88rem)",
            fontFamily: FONT_BODY,
            letterSpacing: "0.06em",
            cursor: "pointer",
            whiteSpace: "nowrap",
            color: active === cat ? "#fff" : "#0E101E",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}