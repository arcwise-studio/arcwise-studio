# Arcwise Studio Starter Kit

A lightweight bundle of marketing assets for Arcwise Studio:

- **Landing page** (`landing/`): responsive HTML/CSS/JS hero focused on conversions.
- **Portfolio demos** (`portfolio/`): three interactive example projects with screenshots.
- **Deliverable templates** (`templates/`): proposal PDF generator, invoice markup, and contract outline.

## Quick start

```bash
# Serve locally
cd arcwise/landing
python3 -m http.server 9000
# visit http://localhost:9000
```

Each portfolio project folder is self-contained; run the same `python3 -m http.server` command inside any project directory to preview.

## Proposal PDF generator

```
cd arcwise/templates/proposal
python3 -m venv .venv
source .venv/bin/activate
pip install -r ../../requirements.txt
python generate_proposal.py proposal_data.sample.json output/proposal.pdf
```

Edit `proposal_data.sample.json` (or duplicate it) to change copy, deliverables, or investment details. The script uses `fpdf2` and outputs an A4 PDF with Arcwise branding.

## Invoice & contract templates

- `templates/invoice/invoice_template.html` → update the HTML, then print to PDF from any browser.
- `templates/contract/simple_contract.md` → fill blanks, export to PDF/Doc as needed.

## Screenshots & assets

Each demo project includes a `screenshot.png` (1200×630). Drop these into case studies or Notion docs.

## Customizing

- Update fonts/colors in `landing/styles.css`.
- Swap testimonials, stats, and CTA copy directly in the HTML.
- Duplicate portfolio folders to add new demos—each uses vanilla JS for easy hosting.

## Deployment

The landing page and demos are static—deploy to Netlify, Vercel, GitHub Pages, or any static host. No build step required.
