# PDF Converter App

🔗 Live demo:
[https://pdf-converter-app-azure.vercel.app](https://pdf-converter-app-azure.vercel.app)

A simple PDF converter application built with **Next.js 15**, **React 19**, **TypeScript**, and
**Tailwind CSS**.

Users can enter text, convert it into a PDF via external API, preview the result inline, and access
a local history of past conversions.

---

## 🚀 Features

- ✏️ Convert custom text into PDF via HTTP API
- 🔍 Preview PDF directly in browser using `react-pdf`
- 💾 Store last 10 conversions in `localStorage`
- 📥 Download converted PDF
- ⚡ Responsive UI with Tailwind
- ✅ Includes unit test for form logic using Jest + RTL

---

## 🧱 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- [React 19](https://react.dev/blog/2024/04/25/react-19)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- [Jest](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/)

---

## 🛠️ Getting Started

1. Clone the repo:

```bash
git clone https://github.com/romul3003/pdf-converter-app.git
cd pdf-converter-app
```

2. Install dependencies:

```bash
npm install
```

3. Run locally:

```bash
npm run dev
```

---

## 📂 Project Structure

<pre>
src/
├── app/
│   ├── layout.tsx                  # Root layout (fonts, global styles)
│   └── page.tsx                    # Home page
├── components/
│   ├── ConvertToPdfForm.tsx       # Text input + submit
│   ├── PdfPreview.tsx             # PDF preview via react-pdf
│   └── HistoryList.tsx            # Clickable history of conversions
├── hooks/
│   └── usePdfHistory.ts           # LocalStorage logic
├── actions/
│   └── convert-to-pdf.ts          # Server action that calls PDF API
├── tests/
│   └── ConvertToPdfForm.test.tsx  # Unit test for form
</pre>

---

## 📤 API Usage

```http
POST http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4

Body:
{
  "text": "Hello, Universe!"
}
```

- API returns PDF as a `blob`, which is converted to `base64` and rendered inline.

---

## 🧪 Tests

Includes unit test for the main conversion form (`ConvertToPdfForm`):

```bash
npm run test
```

Test coverage:

- ✔ Input interaction
- ✔ Form submission
- ✔ Mocked API response
- ✔ Error handling (e.g. validation message)

---

## 📎 Notes

- Only 10 last converted PDFs are saved in browser history
- Preview works client-side using `react-pdf` and `base64` data
