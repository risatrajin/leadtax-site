import { useState } from "react";
import contact from "../../content/pages/contact.json";
import { offices } from "../../content/offices.json";

const FIELD = "w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand";
const HEAD_OFFICE_EMAIL = offices.find((office) => office.isHeadOffice).email;
const { form } = contact;

function Field({ name, type = "text", value, onChange, as: Tag = "input", ...rest }) {
  return (
    <div>
      <label className="block text-gray-700 mb-2">{form.fields[name].label}</label>
      <Tag
        type={Tag === "input" ? type : undefined}
        className={FIELD}
        placeholder={form.fields[name].placeholder}
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}

/**
 * Contact form. Hidden on the live site (the wrapper has `hidden`) and it has no backend:
 * submitting logs to the console and opens a mailto: link to the head office (known issues).
 */
export default function ContactForm() {
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted", values);
    const subject = form.subject
      .replace("{firstName}", values.firstName)
      .replace("{lastName}", values.lastName);
    const body = `
Name: ${values.firstName} ${values.lastName}
Email: ${values.email}
Phone: ${values.phone}

Message:
${values.message}
    `.trim();
    const mailto = `mailto:${HEAD_OFFICE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    console.log("Opening mailto link:", mailto);
    window.location.href = mailto;
  };

  const handleChange = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 hidden">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <Field name="firstName" value={values.firstName} onChange={handleChange} />
          <Field name="lastName" value={values.lastName} onChange={handleChange} />
        </div>
        <Field name="email" type="email" value={values.email} onChange={handleChange} />
        <Field name="phone" type="tel" value={values.phone} onChange={handleChange} />
        <Field name="message" as="textarea" rows={5} value={values.message} onChange={handleChange} />
        <button
          type="submit"
          className="w-full bg-brand text-white px-8 py-4 rounded-full hover:bg-brand-strong transition-colors cursor-pointer"
        >
          {form.submitLabel}
        </button>
      </form>
    </div>
  );
}
