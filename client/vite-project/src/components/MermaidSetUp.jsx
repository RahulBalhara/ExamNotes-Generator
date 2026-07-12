import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import {
  FiZoomIn,
  FiZoomOut,
  FiMaximize2,
  FiDownload,
} from "react-icons/fi";

mermaid.initialize({
  startOnLoad: false,
  theme: "neutral",

  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: "basis",
    nodeSpacing: 80,
    rankSpacing: 100,
  },

  themeVariables: {
    primaryColor: "#EEF2FF",
    primaryBorderColor: "#6366F1",
    primaryTextColor: "#111827",

    lineColor: "#6366F1",

    secondaryColor: "#F5F3FF",

    tertiaryColor: "#ffffff",

    fontSize: "18px",
  },
});
const sanitizeMermaid = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .trim();

  if (
    !clean.startsWith("graph") &&
    !clean.startsWith("flowchart")
  ) {
    clean = `graph TD\n${clean}`;
  }

  // Fix edge labels:
  // A --> B : Label
  // =>
  // A -->|Label| B
  clean = clean.replace(
    /^(\s*.+?)\s*-->\s*(.+?)\s*:\s*(.+)$/gm,
    (_, from, to, label) =>
      `${from.trim()} -->|${label.trim()}| ${to.trim()}`
  );

  return clean;
};

function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);

  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setLoading(true);

        containerRef.current.innerHTML = "";

        const id = `mermaid-${Date.now()}`;

        const { svg } = await mermaid.render(
          id,
          sanitizeMermaid(diagram)
        );

        containerRef.current.innerHTML = svg;

        const svgElement =
          containerRef.current.querySelector("svg");

        if (svgElement) {
          svgElement.style.width = "100%";
          svgElement.style.height = "auto";
          svgElement.style.maxWidth = "1400px";
          svgElement.style.transform = `scale(${scale})`;
          svgElement.style.transformOrigin = "top center";
        }
      } catch (err) {
        console.error(err);

        containerRef.current.innerHTML = `
          <div class="p-8 text-red-500 font-semibold">
            Unable to render Mermaid diagram.
          </div>
        `;
      } finally {
        setLoading(false);
      }
    };

    renderDiagram();
  }, [diagram, scale]);

  const downloadSvg = () => {
    const svg =
      containerRef.current?.querySelector("svg");

    if (!svg) return;

    const blob = new Blob(
      [svg.outerHTML],
      {
        type: "image/svg+xml",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "diagram.svg";

    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-3xl overflow-hidden border border-indigo-200 bg-gradient-to-br from-white via-indigo-50 to-purple-50 shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between px-6 py-4 border-b bg-white/70 backdrop-blur">

        <div>

          <h2 className="font-bold text-xl">
            📊 AI Generated Diagram
          </h2>

          <p className="text-sm text-gray-500">
            Automatically generated using Mermaid.js
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => setScale((s) => s + 0.1)}
            className="rounded-lg border bg-white p-2 hover:bg-gray-100"
          >
            <FiZoomIn />
          </button>

          <button
            onClick={() =>
              setScale((s) =>
                Math.max(0.5, s - 0.1)
              )
            }
            className="rounded-lg border bg-white p-2 hover:bg-gray-100"
          >
            <FiZoomOut />
          </button>

          <button
            onClick={() => setScale(1)}
            className="rounded-lg border bg-white p-2 hover:bg-gray-100"
          >
            <FiMaximize2 />
          </button>

          <button
            onClick={downloadSvg}
            className="rounded-lg border bg-white p-2 hover:bg-gray-100"
          >
            <FiDownload />
          </button>

        </div>

      </div>

      {/* Diagram */}

      <div className="min-h-[500px] bg-white overflow-auto flex justify-center items-start p-10">

        {loading ? (
          <div className="flex flex-col items-center gap-4 text-gray-500">

            <div className="h-12 w-12 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin" />

            <p>Generating diagram...</p>

          </div>
        ) : (
          <div ref={containerRef} />
        )}

      </div>

      {/* Footer */}

      <div className="border-t bg-indigo-50 px-6 py-3 text-sm text-gray-500">

        💡 Use the zoom controls to enlarge the diagram.
        You can also download it as an SVG.

      </div>

    </div>
  );
}

export default MermaidSetup;