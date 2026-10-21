import { useState } from "react";
import { Check, Minus } from "lucide-react";
import pricing from "../../content/pricing.json";
import { resolveHref } from "../../lib/links.js";
import { buttonClasses } from "../../components/ui/Button.jsx";

const { comparison } = pricing;

const TAB = "min-h-10 px-4 sm:px-6 py-2 rounded-full font-semibold transition-all text-sm sm:text-base";
const CELL = "px-3 py-3.5 text-center";
/** Soft tint that runs down the popular plan's column. */
const POPULAR_TINT = "bg-brand-subtle/30";

/** Add-on prices read "+$59.99", so they can't be mistaken for the plan price. */
const extra = (price) => `+${price}`;

function Cell({ value, tinted, addOn }) {
  const className = `${CELL} ${tinted ? POPULAR_TINT : ""}`;
  if (value === true) {
    return (
      <td className={className}>
        <Check aria-label={comparison.includedLabel} className="mx-auto h-5 w-5 text-brand" />
      </td>
    );
  }
  if (value === false) {
    return (
      <td className={className}>
        <Minus aria-label={comparison.notIncludedLabel} className="mx-auto h-4 w-4 text-gray-300" />
      </td>
    );
  }
  return (
    <td className={className}>
      <span className={`text-sm font-semibold ${addOn ? "text-brand" : "text-gray-900"}`}>{addOn ? extra(value) : value}</span>
    </td>
  );
}

function Row({ row, popularKey }) {
  if (row.section) {
    return (
      <tr>
        <td colSpan={5} className="px-6 pb-2 pt-8 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {row.name}
        </td>
      </tr>
    );
  }
  return (
    <tr className="border-t border-gray-100">
      <td className="px-6 py-3.5 text-sm text-gray-700">
        {row.highlight ? (
          <>
            <span className="block font-semibold text-gray-900">{row.name}</span>
            <span className="mt-0.5 block text-xs text-gray-500">{comparison.addOnNote}</span>
          </>
        ) : (
          row.name
        )}
      </td>
      {comparison.columns.map((column) => (
        <Cell key={column.key} value={row[column.key]} tinted={column.key === popularKey} addOn={row.highlight} />
      ))}
    </tr>
  );
}

/** One plan as a card, for phones: name, price, Get Started, then the included features. */
function PlanCard({ column, tier, showPrice, popular, addOn, features }) {
  return (
    <li className={`relative rounded-2xl border bg-white p-6 ${popular ? "border-brand ring-1 ring-brand" : "border-gray-200"}`}>
      {popular && (
        <span className="absolute -top-3 left-6 rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-white">
          {comparison.popularLabel}
        </span>
      )}
      <h3 className="font-semibold text-gray-600">{tier.title}</h3>
      {showPrice && <p className="mt-1 text-4xl font-semibold tracking-tight text-gray-900">{tier.price}</p>}
      <a
        href={resolveHref(comparison.getStartedHref)}
        className={buttonClasses({ variant: popular ? "primary" : "outline", size: "block", className: "mt-5" })}
      >
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
            <li key={row.name} className={`flex items-start gap-2.5 ${value ? "text-gray-800" : "text-gray-400"}`}>
              {value ? (
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand" />
              ) : (
                <Minus aria-hidden="true" className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-300" />
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
      {addOn && (
        <div className="mt-6 rounded-xl bg-gray-50 p-4 text-sm">
          <p className="flex items-baseline justify-between gap-4">
            <span className="font-semibold text-gray-900">{addOn.name}</span>
            <span className="font-semibold text-brand">{extra(addOn[column.key])}</span>
          </p>
          <p className="mt-0.5 text-xs text-gray-500">{comparison.addOnNote}</p>
        </div>
      )}
    </li>
  );
}

/**
 * Plan comparison with a File Online / File Remotely switch. From 1024px it is a table; below that
 * each plan is a card, so every plan is visible without sideways scrolling.
 */
export default function ComparisonTable() {
  const [activeId, setActiveId] = useState(comparison.tabs[0].id);
  const tab = comparison.tabs.find((candidate) => candidate.id === activeId);
  const tiers = pricing[tab.tiers];
  const rows = comparison.rows[activeId];
  // The add-on row moves to the foot of the table.
  const addOn = rows.find((row) => row.highlight);
  const features = rows.filter((row) => !row.highlight);
  // The popular plan is only called out when prices are shown.
  const popularKey = tab.showPrices ? comparison.columns.find((column) => column.popular)?.key : undefined;

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full bg-gray-100 p-1">
          {comparison.tabs.map((candidate) => (
            <button
              key={candidate.id}
              type="button"
              aria-pressed={activeId === candidate.id}
              onClick={() => setActiveId(candidate.id)}
              className={`${TAB} ${activeId === candidate.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}
            >
              {candidate.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid gap-6 sm:grid-cols-2 lg:hidden">
        {comparison.columns.map((column, index) => (
          <PlanCard
            key={column.key}
            column={column}
            tier={tiers[index]}
            showPrice={tab.showPrices}
            popular={column.key === popularKey}
            addOn={addOn}
            features={features}
          />
        ))}
      </ul>
      <div className="hidden overflow-hidden rounded-3xl border border-gray-200 bg-white lg:block">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-[28%]" />
            {comparison.columns.map((column) => (
              <col key={column.key} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th className="px-6 pb-6 pt-8 text-left align-bottom text-sm font-semibold text-gray-500">{comparison.featuresLabel}</th>
              {comparison.columns.map((column, index) => (
                <th
                  key={column.key}
                  id={column.headerId}
                  className={`px-4 pb-6 pt-8 text-center align-bottom font-normal ${column.key === popularKey ? POPULAR_TINT : ""}`}
                >
                  <p className="flex h-6 items-center justify-center">
                    {column.key === popularKey && (
                      <span className="rounded-full bg-brand-subtle px-2.5 py-0.5 text-xs font-semibold text-brand">{comparison.popularLabel}</span>
                    )}
                  </p>
                  <p className="mt-2 font-semibold text-gray-600">{tiers[index].title}</p>
                  {tab.showPrices && <p className="mt-1 text-4xl font-semibold tracking-tight text-gray-900">{tiers[index].price}</p>}
                  <a
                    href={resolveHref(comparison.getStartedHref)}
                    className={buttonClasses({
                      variant: column.key === popularKey ? "primary" : "outline",
                      size: "sm",
                      className: "mt-5 w-full max-w-40 whitespace-nowrap",
                    })}
                  >
                    {comparison.getStartedLabel}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((row, index) => (
              <Row key={index} row={row} popularKey={popularKey} />
            ))}
            {addOn && <Row row={addOn} popularKey={popularKey} />}
          </tbody>
        </table>
      </div>
    </>
  );
}
