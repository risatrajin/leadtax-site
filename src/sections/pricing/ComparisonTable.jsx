import { useState } from "react";
import { Check, X } from "lucide-react";
import pricing from "../../content/pricing.json";
import { resolveHref } from "../../lib/links.js";

const { comparison } = pricing;

const TAB = "px-4 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium transition-all text-sm sm:text-base";
const PLAN_HEADER = "text-center py-4 px-2 md:px-4 font-bold text-gray-900 bg-white";

function Cell({ value, highlight, tinted }) {
  const background = highlight ? "bg-amber-50" : tinted ? "bg-brand-subtle/20" : "";
  const className = `text-center py-4 px-2 md:px-4 ${background}`;
  if (value === true) {
    return (
      <td className={className}>
        <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600 mx-auto" />
      </td>
    );
  }
  if (value === false) {
    return (
      <td className={className}>
        <X className="w-6 h-6 text-gray-300 mx-auto" />
      </td>
    );
  }
  return (
    <td className={className}>
      {highlight ? (
        <span className="inline-block bg-brand text-white text-xs font-bold px-3 py-1 rounded-full">{value}</span>
      ) : (
        <span className="text-sm font-medium text-gray-700">{value}</span>
      )}
    </td>
  );
}

function Row({ row, index }) {
  if (row.section) {
    return (
      <tr className="border-b border-gray-200">
        <td colSpan={5} className="py-5 px-6 bg-white">
          <span className="text-gray-900 font-bold text-lg">{row.name}</span>
        </td>
      </tr>
    );
  }
  const rowClass = row.highlight
    ? "border-amber-200 bg-amber-50"
    : `border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`;
  return (
    <tr className={`border-b ${rowClass}`}>
      <td
        className={`py-4 px-4 md:px-6 font-medium text-sm md:text-base ${row.highlight ? "text-brand font-bold" : "text-gray-700"}`}
      >
        {row.name}
        {row.highlight && (
          <span className="ml-2 text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
            {comparison.addOnLabel}
          </span>
        )}
      </td>
      {comparison.columns.map((column) => (
        <Cell key={column.key} value={row[column.key]} highlight={row.highlight} tinted={column.popular} />
      ))}
    </tr>
  );
}

/** Plan comparison with a File Online / File Remotely switch. */
export default function ComparisonTable() {
  const [activeId, setActiveId] = useState(comparison.tabs[0].id);
  const tab = comparison.tabs.find((candidate) => candidate.id === activeId);
  const tiers = pricing[tab.tiers];
  const rows = comparison.rows[activeId];

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="inline-flex bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
          {comparison.tabs.map((candidate) => (
            <button
              key={candidate.id}
              onClick={() => setActiveId(candidate.id)}
              className={`${TAB} ${activeId === candidate.id ? "bg-brand text-white shadow-md" : "text-gray-600 hover:text-gray-900"}`}
            >
              {candidate.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 md:px-6 font-bold text-gray-900 bg-white rounded-tl-2xl min-w-[180px]">
                  {comparison.featuresLabel}
                </th>
                {comparison.columns.map((column, index) => {
                  const isLast = index === comparison.columns.length - 1;
                  return (
                    <th
                      key={column.key}
                      id={column.headerId}
                      className={isLast ? `${PLAN_HEADER} rounded-tr-2xl` : PLAN_HEADER}
                    >
                      {column.popular && tab.showPrices && (
                        <div className="flex justify-center mb-1">
                          <span className="bg-popular text-white text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                            {comparison.popularLabel}
                          </span>
                        </div>
                      )}
                      <div className="text-sm md:text-lg">{tiers[index].title}</div>
                      {tab.showPrices && <div className="text-brand text-base md:text-xl">{tiers[index].price}</div>}
                    </th>
                  );
                })}
              </tr>
              <tr className="border-b border-gray-200">
                <th className="py-4 px-4 md:px-6 bg-white" />
                {comparison.columns.map((column) => (
                  <th key={column.key} className="text-center py-4 px-2 md:px-4 bg-white">
                    <a
                      href={resolveHref(comparison.getStartedHref)}
                      className="inline-block bg-brand text-white py-2 px-4 md:px-6 rounded-full hover:bg-brand-strong transition-colors font-medium text-xs md:text-sm whitespace-nowrap"
                    >
                      {comparison.getStartedLabel}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <Row key={index} row={row} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
