import React, { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import { Monarch } from "../types";
import { useTranslation } from "react-i18next";
import { MonarchFamilyTree } from "./MonarchFamilyTree";
import { Crown, GitFork, ArrowLeft } from "lucide-react";

interface FamilyTreeProps {
  monarchs: Monarch[];
  onBack: () => void;
  initialMonarchId?: number;
}

interface TreeNode {
  id: number;
  parentId: number | null;
  monarch: Monarch;
}

const buildTreeData = (monarchs: Monarch[]): TreeNode[] => {
  const parentMap: Record<number, number | null> = {
    1: null, // William I
    2: 1, // William II
    3: 1, // Henry I
    4: 1, // Stephen
    5: 3, // Henry II
    6: 5, // Richard I
    7: 5, // John
    8: 7, // Henry III
    9: 8, // Edward I
    10: 9, // Edward II
    11: 10, // Edward III
    12: 11, // Richard II
    13: 11, // Henry IV
    14: 13, // Henry V
    15: 14, // Henry VI
    16: 11, // Edward IV
    17: 16, // Edward V
    18: 11, // Richard III
    19: 11, // Henry VII
    20: 19, // Henry VIII
    21: 20, // Edward VI
    22: 20, // Mary I
    23: 20, // Elizabeth I
    24: 19, // James I
    25: 24, // Charles I
    26: 25, // Charles II
    27: 25, // James II
    28: 27, // William III & Mary II
    29: 27, // Anne
    30: 24, // George I
    31: 30, // George II
    32: 31, // George III
    33: 32, // George IV
    34: 32, // William IV
    35: 32, // Victoria
    36: 35, // Edward VII
    37: 36, // George V
    38: 37, // Edward VIII
    39: 37, // George VI
    40: 39, // Elizabeth II
    41: 40, // Charles III
  };

  return monarchs.map((m) => ({
    id: m.id,
    parentId: parentMap[m.id] !== undefined ? parentMap[m.id] : null,
    monarch: m,
  }));
};

const FamilyTree: React.FC<FamilyTreeProps> = ({
  monarchs,
  onBack,
  initialMonarchId = 1,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"individual" | "dynasty">("individual");
  const [selectedMonarchId, setSelectedMonarchId] = useState<number>(initialMonarchId);

  // SVG Lineage refs & states
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredMonarch, setHoveredMonarch] = useState<Monarch | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const treeData = useMemo(() => buildTreeData(monarchs), [monarchs]);

  useEffect(() => {
    if (activeTab !== "dynasty") return;
    if (!svgRef.current || !containerRef.current || treeData.length === 0) return;

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create hierarchy
    const stratify = d3
      .stratify<TreeNode>()
      .id((d) => d.id.toString())
      .parentId((d) => (d.parentId !== null ? d.parentId.toString() : null));

    const root = stratify(treeData);

    const containerWidth = containerRef.current.clientWidth || 1000;
    const containerHeight = containerRef.current.clientHeight || 700;

    const treeLayout = d3
      .tree<TreeNode>()
      .nodeSize([80, 140])
      .separation((a, b) => (a.parent === b.parent ? 1.2 : 1.5));

    treeLayout(root);

    // Zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 2.5])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const g = svg.append("g");

    // Center root initially
    const initialTransform = d3.zoomIdentity
      .translate(containerWidth / 2, margin.top + 30)
      .scale(0.85);
    svg.call(zoom.transform, initialTransform);

    // Links
    g.selectAll(".link")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#f59e0b")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .linkVertical<
            d3.HierarchyPointLink<TreeNode>,
            d3.HierarchyPointNode<TreeNode>
          >()
          .x((d) => d.x)
          .y((d) => d.y)
      );

    // Nodes
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node cursor-pointer")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .on("mouseenter", (event, d) => {
        setHoveredMonarch(d.data.monarch);
        setTooltipPos({ x: event.clientX, y: event.clientY });
        d3.select(event.currentTarget)
          .select("circle")
          .attr("stroke", "#facc15")
          .attr("stroke-width", 4);
      })
      .on("mousemove", (event) => {
        setTooltipPos({ x: event.clientX, y: event.clientY });
      })
      .on("mouseleave", (event) => {
        setHoveredMonarch(null);
        d3.select(event.currentTarget)
          .select("circle")
          .attr("stroke", "#94a3b8")
          .attr("stroke-width", 2);
      })
      .on("click", (_event, d) => {
        setSelectedMonarchId(d.data.monarch.id);
        setActiveTab("individual");
      });

    // Node circles (background for images)
    node
      .append("circle")
      .attr("r", 24)
      .attr("fill", "#1e293b")
      .attr("stroke", "#94a3b8")
      .attr("stroke-width", 2);

    // Clip path for images
    node
      .append("clipPath")
      .attr("id", (d) => `clip-${d.id}`)
      .append("circle")
      .attr("r", 24);

    // Images
    node
      .append("image")
      .attr("href", (d) => d.data.monarch.imageUrl || "")
      .attr("x", -24)
      .attr("y", -24)
      .attr("width", 48)
      .attr("height", 48)
      .attr("clip-path", (d) => `url(#clip-${d.id})`)
      .attr("preserveAspectRatio", "xMidYMid slice");

    // Labels
    node
      .append("text")
      .attr("dy", 36)
      .attr("text-anchor", "middle")
      .attr("fill", "#e2e8f0")
      .attr("font-size", "12px")
      .attr("font-weight", "600")
      .text((d) => t(d.data.monarch.name));

    node
      .append("text")
      .attr("dy", 50)
      .attr("text-anchor", "middle")
      .attr("fill", "#94a3b8")
      .attr("font-size", "10px")
      .text(
        (d) =>
          `${d.data.monarch.reignStart} - ${
            d.data.monarch.reignEnd || t("Present")
          }`
      );
  }, [treeData, t, activeTab]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-slate-900 text-white relative">
      {/* Top Header & Tab Controls */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors border border-slate-700 shadow flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("Back to Menu")}</span>
          </button>

          {/* View Mode Toggle Buttons */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 shadow-inner w-full sm:w-auto justify-center">
            <button
              onClick={() => setActiveTab("individual")}
              className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "individual"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>{t("Monarch Family Tree")}</span>
            </button>

            <button
              onClick={() => setActiveTab("dynasty")}
              className={`flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "dynasty"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              <GitFork className="w-4 h-4" />
              <span>{t("Dynasty Lineage Overview")}</span>
            </button>
          </div>

          <div className="hidden lg:block text-xs text-slate-400 font-medium">
            {activeTab === "individual"
              ? t("Showing all spouses & known children")
              : t("Click any monarch node to view family")}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full overflow-y-auto">
        {activeTab === "individual" ? (
          <div className="py-4 pb-12">
            <MonarchFamilyTree
              monarchs={monarchs}
              selectedMonarchId={selectedMonarchId}
              onSelectMonarch={setSelectedMonarchId}
            />
          </div>
        ) : (
          <div className="w-full h-[calc(100vh-65px)] relative flex flex-col bg-slate-950">
            <div className="absolute top-3 right-4 z-10 text-right bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-slate-800 pointer-events-none">
              <h2 className="text-sm font-bold text-amber-400">
                {t("Royal Lineage Tree")}
              </h2>
              <p className="text-[11px] text-slate-400">
                {t("Drag to pan, scroll to zoom • Click a monarch for family details")}
              </p>
            </div>

            <div
              ref={containerRef}
              className="flex-1 w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <svg ref={svgRef} className="w-full h-full" />
            </div>

            {hoveredMonarch && (
              <div
                className="fixed z-50 bg-slate-800 border border-slate-600 p-3 rounded-xl shadow-2xl max-w-xs pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-15px]"
                style={{ left: tooltipPos.x, top: tooltipPos.y }}
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  {hoveredMonarch.imageUrl && (
                    <img
                      src={hoveredMonarch.imageUrl}
                      alt={hoveredMonarch.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-amber-500"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-sm text-white">{t(hoveredMonarch.name)}</h3>
                    <p className="text-[11px] text-amber-400">
                      {t("House of {{house}}", { house: t(hoveredMonarch.house) })}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 line-clamp-3">
                  {t(hoveredMonarch.context)}
                </p>
                <p className="text-[10px] text-amber-300 mt-1 font-semibold">
                  {t("Click to view spouses & children")} &rarr;
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default FamilyTree;
