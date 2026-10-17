import { useState } from "react";
import page from "../content/pages/tax-calculator.json";
import PageShell from "../components/layout/PageShell.jsx";
import PageHero from "../components/ui/PageHero.jsx";
import Button from "../components/ui/Button.jsx";
import { CARD } from "../lib/styles.js";
import { cx } from "../lib/cx.js";
import { fill } from "../lib/template.js";

const money = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

/** Tax on `income` across progressive brackets ([upper limit or null, rate]). */
function bracketTax(income, brackets) {
  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of brackets) {
    const top = upper ?? Infinity;
    if (income > lower) tax += (Math.min(income, top) - lower) * rate;
    lower = top;
  }
  return tax;
}

/** Basic tax after the basic personal amount credit, never below zero. */
function taxFor(income, schedule) {
  return Math.max(0, bracketTax(income, schedule.brackets) - schedule.basicPersonalAmount * schedule.creditRate);
}

const FIELDS = ["employment", "other", "rrsp", "withheld"];
const INPUT =
  "min-h-12 w-full rounded-xl border border-gray-300 bg-white py-3 pl-8 pr-4 text-gray-900 transition hover:border-brand focus:border-brand";

/**
 * Tax calculator: a simple federal + BC income tax estimate with the year's brackets and basic
 * personal amounts from pages/tax-calculator.json, showing a refund or balance owing as you type.
 */
export default function TaxCalculatorPage() {
  const { hero, form, result } = page;
  const [values, setValues] = useState({ employment: "", other: "", rrsp: "", withheld: "" });
  const num = (key) => Math.max(0, Number(String(values[key]).replace(/[^0-9.]/g, "")) || 0);

  const taxable = Math.max(0, num("employment") + num("other") - num("rrsp"));
  const federal = taxFor(taxable, page.federal);
  const provincial = taxFor(taxable, page.province);
  const total = federal + provincial;
  const balance = num("withheld") - total;
  const hasInput = FIELDS.some((key) => num(key) > 0);

  const rows = [
    [result.taxable, taxable],
    [result.federal, federal],
    [result.provincial, provincial],
    [result.total, total],
  ];

  return (
    <PageShell>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} text={hero.text} decor />

      <section className="bg-gray-50 px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form className={`${CARD} space-y-6 p-8 md:p-10`} onSubmit={(event) => event.preventDefault()}>
            <h2 className="text-2xl font-semibold text-gray-900">
              {form.title} <span className="text-base font-normal text-gray-500">({page.taxYear})</span>
            </h2>
            {FIELDS.map((key) => (
              <label key={key} className="block">
                <span className="font-semibold text-gray-900">{form[key]}</span>
                <span className="mt-0.5 block text-sm text-gray-500">{form[`${key}Hint`]}</span>
                <span className="relative mt-2 block">
                  <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    inputMode="decimal"
                    value={values[key]}
                    onChange={(event) => setValues((prev) => ({ ...prev, [key]: event.target.value }))}
                    placeholder="0"
                    className={INPUT}
                  />
                </span>
              </label>
            ))}
          </form>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div aria-live="polite" className="overflow-hidden rounded-2xl bg-hero-blue text-white shadow-2xl">
              <div className="p-8 md:p-10">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/80">{result.title}</p>
                <p className="mt-3 text-lg text-white/90">
                  {!hasInput || Math.round(balance) === 0 ? result.even : balance > 0 ? result.refund : result.owing}
                </p>
                <p className="mt-1 text-5xl font-bold tracking-tight md:text-6xl">{money.format(Math.abs(balance))}</p>
              </div>
              <dl className="divide-y divide-white/15 border-t border-white/15 bg-white/10 px-8 md:px-10">
                {rows.map(([label, value], index) => (
                  <div key={label} className={cx("flex justify-between py-3.5", index === rows.length - 1 && "font-semibold")}>
                    <dt className="text-white/85">{label}</dt>
                    <dd>{money.format(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-4 text-sm text-gray-500">{fill(page.note, { year: page.taxYear })}</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 text-center md:px-8 md:py-24">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">{page.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">{page.cta.text}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button to={page.cta.primary.to}>{page.cta.primary.label}</Button>
          <Button to={page.cta.secondary.to} variant="outline">
            {page.cta.secondary.label}
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
