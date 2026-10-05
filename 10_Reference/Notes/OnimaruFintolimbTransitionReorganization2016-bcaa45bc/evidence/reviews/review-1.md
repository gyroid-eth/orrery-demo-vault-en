---
review: 1
draft_digest: 8b927492a020da85be539db63a3af15f58df6e6a17285d13d871eaf390c66b7e
verdict: changes-requested
reviewer: MintEinstein
images_opened: [a001, a002, a003, a004, a005, a007, a009, a010, a011, a012, a013, a014, a015, a016, a017, a018, a019, a020, a021, a022, a023, a024, a025, a026]
---

## Findings

| # | Where in the note | Finding | Evidence in the source | Suggested fix | Blocking |
|---|---|---|---|---|---|
| 1 | Approach, mathematical model (note.md line 38), Open points line 171 | The Methods section states the solver as "Heun's method" with confidence, but the source text reads "Huen method." This resolves an unconfirmed spelling in the Approach section in a way that conflicts with the Open points caveat that it "may be a typo for Heun's method or an OCR error, unconfirmed against the PDF." | paper.md line 303 has "Huen method." The provided images don't include the original solver-name text, so "Heun" can't be confirmed. | Change the Approach section to "the solver's name is given in the text as 'Huen method' (spelling unconfirmed; see Open points)," or omit the solver name there. Keep "Heun" only as a repair candidate in Open points. | yes |
| 2 | Main results, Hoxa13 (line 46); Mechanism and interpretation, heading "Non-involvement of distal Hox" (line 150) | "ruled out as a candidate" / "non-involvement of distal Hox" reads too broadly — it could be read as Hox having no biological role at all. What was actually confirmed is a lack of substantial overlap in expression domains, and that this catshark model doesn't adopt a Hoxd13-like region-restricting role for Hoxa13. It is not an experimental demonstration that Hox has no function at all. | paper.md line 117 is an inference ruling out a role analogous to mouse. Line 181 restricts the claim to "play no role in our catshark model," and frames the BSW/Hox decoupling as "suggested" by observations. Fig. 4b / a011 is expression imaging, not a loss-of-function experiment. | Narrow line 46 to "Hoxa13 was not adopted as a spatial-control factor analogous to mouse Hoxd13." Change the heading on line 150 to something like "Handling of distal Hox in the catshark model," keeping it clear this is an inference from expression data. | yes |

## Checked without findings

- Checked the correspondence across all 480 lines of source/paper.md, the full draft/note.md, and all 24 lines of draft/evidence/figures.json. The received digest matches the bundle.py hash, and bundle.py check passes.
- Opened all 24 images in draft/assets/ with the image tool. All 24 files' SHA-256 match the source/images values recorded in input.json.
- a001, a002 (Fig. 1a,b): the red distal elements in the skeletal comparison, the "not homologous" legend, the b-i–v time course, and the correspondence between the arc-shaped Sox9 spot row and the arrowheads/brackets. Stages 29–30, orientation, and the 100 µm scale bar match paper.md lines 35–45; individual stages per image are not inferred.
- a003–a005 (Fig. 2a–c): the schematic Bmp→Sox9, Wnt⊣Sox9, Sox9⊣Bmp/Wnt network, Bmp/Wnt self-repression, the complementary arrowheads/gaps between Sox9 and Bmp4/Wnt5b, and the virtual sections in the bottom row. Stage 30, same embryo's left/right fin, and the mirroring match paper.md lines 39, 67–71.
- a007, a009 (Fig. 3b,d): the triangular mesh and the Indian-ink fate map. Panel letters missing from the images were assigned by matching caption content. Correctly avoided inferring the "greater posterior growth" result from these two images alone (paper.md lines 73, 91).
- a010–a019 (Fig. 4): a010=a, a011=b, a012–a014=c (left/centre/right), a015=d, a017/a018=e (Bmp/Wnt), a016=f, a019=g. No mix-up between OCR image-appearance order and panel order. Image content matches the captions and descriptions in paper.md lines 117–119, 141, 151–153.
- Fig. 4g's SU5402 n=7/12, DMSO n=8/8, stage 30 match paper.md line 141. Variability (loss of periodicity, loss of anterior expression) is not omitted (line 153). Distances were not precisely quantified from the images.
- a020 (Fig. 5a–i): rows = control/Bmp inhibition/Wnt inhibition, columns = simulation/Sox9/Alcian Blue. The mild/severe labels in e/f, the small nodules in h, and the brackets around large, continuous elements in i match the descriptions.
- Checked the model perturbations (k2 −20%, αW −50%), Sox9 sample sizes (DMSO 18/18, LDN 6/8, C59 10/10), and cartilage-staining sample sizes (3/3, 2/2, 3/3) against paper.md lines 155–165. The model's parameter-change percentages were not confused with experimental drug concentrations or inhibition efficiencies.
- a021–a026 (Fig. 6): a021=a, a022/a023=b (catshark/mouse), a024/a025=c (position/wavelength schematic), a026=c bottom (network). Stage 30/E12, spot-row vs. stripe orientation, short proximal/long distal wavelength, and the th1–th2 description match paper.md lines 185, 205, 207. The interspecies Fgf difference is treated as a proposal, not an established fact.
- Numerical conditions in Methods: SU5402 100 µM, LDN-193189 50 µM, C59 20 µM, DMSO 1%, 4 days from early stage 30, cartilage staining with 20 days of drug plus 10–20 days in normal seawater, Indian-ink labeling at stage 26–28 with ~30 days of culture — all match paper.md lines 227, 233, 235.
- Model conditions: 2D, non-diffusing S with diffusing B/W, day-by-day shape interpolation, stages 29→31, time step 0.002, 1% Gaussian multiplicative noise per step, zero-flux boundary — match paper.md lines 115, 237, 303 (the solver's name is the subject of Finding 1).
- The main conclusion is kept framed as a qualitative-reproduction-plus-matching-perturbation inference. The contribution of growth, Fgf/Wnt cooperation, and loss/change plus possible convergent/parallel evolution in teleosts are not stated as settled (paper.md lines 119, 157, 167–169, 185–209).
- Limitations: that the study covers only the distal nodules and leaves proximal stripe formation unresolved, the partial independence of proximal/distal elements, the small cartilage sample sizes, variability in Fgf inhibition, and the need for additional processes in the real evolutionary transition — all checked against paper.md lines 183, 207, and others.
- Unresolved OCR issues: eq. 16's `k4 W`/`S'`, the missing inequality in eq. 11, the garbled qPCR formula, "C52BL/6," and the mismatch between the Discussion's citation "31" and the bibliography — these are present as-is in the provided text. No repair candidate besides the solver name is presented as confirmed.
- Five authors, 2016, received/published dates, journal 7:11582, and DOI match paper.md lines 5–13, 471. The pdf/mdpaper lines match the links in input.json.

## Scope and open points

- This review did not open the original PDF or Supplementary Figs. 1–8. References to supplementary figures were checked only to the extent they're described in the provided main text. The draft also states this limitation explicitly.
- OCR repair candidates other than the solver name remain unconfirmed. This review does not vouch for the correctness of the original paper, the uniqueness of the causal mechanism, or the truth of the evolutionary hypothesis.
- After fixes, notify with a new digest. The draft itself was not edited.
