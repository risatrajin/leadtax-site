import { useState } from "react";
import { Check, X } from "lucide-react";
import pricing from "../../content/pricing.json";
import { resolveHref } from "../../lib/links.js";
import { buttonClasses } from "../../components/ui/Button.jsx";

const { comparison } = pricing;

const TAB = "min-h-10 px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all text-sm sm:text-base";
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

/** One plan as a card, for phones: name, price, Get Started, then the included features. */
function PlanCard({ column, tier, tab, rows }) {
  const addOn = rows.find((row) => row.highlight);
  const features = rows.filter((row) => !row.highlight);
  return (
    <li
      className={`rounded-2xl border bg-white p-6 shadow-md ${column.popular && tab.showPrices ? "border-brand ring-2 ring-brand" : "border-gray-200"}`}
    >
      {column.popular && tab.showPrices && (
        <span className="mb-3 inline-block rounded-full bg-popular px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-gray-900">
          {comparison.popularLabel}
        </span>
      )}
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-900">{tier.title}</h3>
        {tab.showPrices && <p className="text-2xl font-bold text-brand">{tier.price}</p>}
      </div>
      {addOn && (
        <p className="mt-2 text-sm text-gray-600">
          {addOn.name} ({comparison.addOnLabel.toLowerCase()}): <span className="font-semibold text-gray-900">{addOn[column.key]}</span>
        </p>
      )}
      <a href={resolveHref(comparison.getStartedHref)} className={buttonClasses({ size: "block", className: "mt-5" })}>
        {comparison.getStartedLabel}
      </a>
      <ul className="mt-5 space-y-2 border-t border-gray-100 pt-5 text-sm">
        {features.map((row) => {
          const value = row[column.key];
          if (row.section) {
            return (
              <li key={row.name} className="pt-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {row.name}
              </li>
            );
          }
          return (
            <li key={row.name} className={`flex items-start gap-2.5 ${value ? "text-gray-800" : "text-gray-400 line-through"}`}>
              {value ? (
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
              ) : (
                <X aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-300" />
              )}
              <span>
                {row.name}
                {typeof value === "string" && <span className="font-semibold text-gray-900">: {value}</span>}
                {!value && <span className="sr-only"> ({comparison.notIncludedLabel})</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

/**
 * Plan comparison with a File Online / File Remotely switch. From 768px it is a table; on
 * phones each plan is a card, so every plan is visible without sideways scrolling.
 */
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

      <ul className="space-y-6 md:hidden">
        {comparison.columns.map((column, index) => (
          <PlanCard key={column.key} column={column} tier={tiers[index]} tab={tab} rows={rows} />
        ))}
      </ul>

      <div className="hidden bg-white rounded-2xl shadow-xl overflow-hidden md:block">
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
                          <span className="bg-popular text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
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
                      className={buttonClasses({ size: "sm", className: "whitespace-nowrap" })}
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
