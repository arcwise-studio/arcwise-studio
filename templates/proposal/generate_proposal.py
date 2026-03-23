#!/usr/bin/env python3
"""Generate a branded Arcwise proposal PDF from structured data.

Usage:
    python generate_proposal.py proposal_data.sample.json output/launchly_proposal.pdf

Dependencies:
    pip install fpdf2
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any, Dict, List

from fpdf import FPDF

BRAND_PURPLE = (109, 91, 255)
TEXT_DARK = (15, 23, 42)
MUTED = (100, 116, 139)


def load_payload(path: Path) -> Dict[str, Any]:
    with path.open() as fp:
        return json.load(fp)


class ProposalPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 18)
        self.set_text_color(*TEXT_DARK)
        self.cell(0, 10, "Arcwise Studio", ln=1)
        self.ln(4)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", size=9)
        self.set_text_color(*MUTED)
        self.cell(0, 10, f"Page {self.page_no()}", align="R")


def _section_title(pdf: ProposalPDF, title: str):
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(*BRAND_PURPLE)
    pdf.cell(0, 10, title, ln=1)
    pdf.set_text_color(*TEXT_DARK)


def _body(pdf: ProposalPDF, text: str, size: int = 11):
    pdf.set_font("Helvetica", size=size)
    pdf.multi_cell(0, 6, text)
    pdf.ln(2)


def render_proposal(data: Dict[str, Any], output_path: Path) -> None:
    pdf = ProposalPDF()
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    client = data["client"]
    project = data["project"]

    _section_title(pdf, project["name"])
    _body(
        pdf,
        f"Prepared for {client['contact']} ({client['company']})\nContact: {client['email']}",
    )

    _section_title(pdf, "Summary")
    _body(pdf, project["summary"])

    _section_title(pdf, "Deliverables")
    for item in project["deliverables"]:
        pdf.set_font("Helvetica", size=11)
        pdf.cell(5)
        pdf.cell(0, 6, f"• {item}", ln=1)
    pdf.ln(2)

    _section_title(pdf, "Timeline & Investment")
    _body(pdf, f"Timeline: {project['timeline_weeks']} weeks")
    _body(pdf, f"Investment: ${project['investment']:,.0f} USD")

    metrics: List[Dict[str, str]] = data.get("metrics", [])
    if metrics:
        _section_title(pdf, "Success Metrics")
        for metric in metrics:
            pdf.set_font("Helvetica", "B", 11)
            pdf.cell(0, 6, metric["label"], ln=1)
            pdf.set_font("Helvetica", size=11)
            pdf.cell(0, 6, metric["value"], ln=1)
        pdf.ln(2)

    next_steps = data.get("next_steps", [])
    if next_steps:
        _section_title(pdf, "Next Steps")
        for idx, step in enumerate(next_steps, start=1):
            pdf.set_font("Helvetica", size=11)
            pdf.cell(0, 6, f"{idx}. {step}", ln=1)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(output_path))


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python generate_proposal.py <data.json> <output.pdf>")
        sys.exit(1)

    json_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    payload = load_payload(json_path)
    render_proposal(payload, output_path)
    print(f"Saved proposal → {output_path}")
