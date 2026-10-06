---
tags: [claude]
lit-level: 3
citekey: tanakaFabricSoftPneumatic2024
title: "Fabric soft pneumatic actuators with programmable Turing pattern textures"
authors: "Masato Tanaka, Yuyang Song, Tsuyoshi Nomura"
year: 2024
doi: "10.1038/s41598-024-69450-z"
url: "https://doi.org/10.1038/s41598-024-69450-z"
journal: "Scientific Reports 14:19175"
language: en
translated-from: "Japanese edition of this note (orrery-demo-vault)"
---

- mdpaper: [[20_MDPapers/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures]]
- pdf: [[10_Reference/Papers/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures.pdf]]

> [!summary] Bottom line
> This paper designs fabric pneumatic actuators (FSPAs) that bend or twist when inflated, using material-orientation optimization and an anisotropic reaction-diffusion equation, and builds them out of fabric. The design procedure is the same as in the authors' earlier paper (Tanaka et al. 2023); what is new is the fabrication. Two methods are tried: cutting stiff Dyneema fabric and heat-bonding it to TPU film, and embroidering Kevlar thread. For three target shapes (C-shaped bending, S-shaped bending, and twisting), the authors report that the pressure responses of the prototypes agree well with finite element analysis.

## Abstract

This paper presents a novel computational design and fabrication method for fabric-based soft pneumatic actuators (FSPAs) that use Turing patterns, inspired by Alan Turing's morphogenesis theory. These inflatable structures can adapt their shapes with simple pressure changes and are applicable in areas like soft robotics, airbags, and temporary shelters. Traditionally, the design of such structures relies on isotropic materials and the designer's expertise, often requiring a trial-and-error approach. The present study introduces a method to automate this process using advanced numerical optimization to design and manufacture fabric-based inflatable structures with programmable shape-morphing capabilities. Initially, an optimized distribution of the material orientation field on the surface membrane is achieved through gradient-based orientation optimization. This involves a comprehensive physical deployment simulation using the nonlinear shell finite element method, which is integrated into the inner loop of the optimization algorithm. This continuous adjustment of material orientations enhances the design objectives. These material orientation fields are transformed into discretized texture patterns that replicate the same anisotropic deformations. Anisotropic reaction-diffusion equations, using diffusion coefficients determined by local orientations from the optimization step, are then utilized to create space-filling Turing pattern textures. Furthermore, the fabrication methods of these optimized Turing pattern textures are explored using fabrics through heat bonding and embroidery. The performance of the fabricated FSPAs is evaluated through three different deformation shapes: C-shaped bending, S-shaped bending, and twisting.

## Key points

- **Question**: Can a complex deformation on inflation be produced from a surface pattern alone, without special materials? The earlier paper used grayscale DLP stereolithography (g-DLP), which limited the size of what could be made to the printer's build volume. This paper makes the same thing from fabric.
- **Design flow**: Inflate a flat two-layer membrane (top and bottom sheets sharing nodes along the edge). The material orientation of each element is a design variable, optimized by a gradient method so that the deformation approaches the target. The orientation field is then replaced by a black-and-white Turing pattern.
- **Orientation optimization**: A transversely isotropic material model is used, with the six components of the orientation tensor $\mathbf{a}$ as design variables. An angle parametrization would be numerically unstable because of the periodicity of trigonometric functions, so a tensor is used, with the trace constraint relaxed to at most 1. Inflation is solved with a geometrically nonlinear shell finite element method (Total Lagrangian, internal pressure as a follower force normal to the surface, full Newton–Raphson), and the design is updated by sensitivity analysis and MMA (method of moving asymptotes). The finite element code is the authors' own and sits inside the optimization loop.
- **Assumed material constants**: Poisson's ratio 0.49 for both the stiff and soft materials, and a volume fraction of 0.5 each.
- **Pattern generation**: An anisotropic reaction-diffusion equation for two virtual substances U (stiff part) and V (soft part) is solved to equilibrium (COMSOL Multiphysics). The $\tilde{\mathbf{u}}\otimes\tilde{\mathbf{u}}$ term of the diffusion tensor is replaced by the orientation tensor $\mathbf{a}(\mathbf{x})$ obtained from the optimization, so the stripes extend along the local orientation. All parameter values are given in the main text (section "Methods").
- **Fabrication 1: heat bonding**: Dyneema (8 GPa, 0.25 mm) is laser-cut and heat-bonded to TPU film (10 MPa, 0.3 mm) at 132 °C, 275.8 kPa for 1 minute. The sheet is folded in two along the fold line, and the edges are sealed with an impulse sealer at 93 °C for 30 seconds. The pattern is laid out symmetrically about the fold line, so that the patterns on the top and bottom faces overlap when folded.
- **Fabrication 2: embroidery**: Kevlar thread (K-tech 75 Tex, filament diameter 12 μm, about 70 GPa) is stitched onto spandex (mainly polyurethane, about 10 MPa, 0.2 mm) with a tatami fill stitch. The embroidery machine is a ZSK Sprint series; the backing has three layers, and the speed was lowered because the thread frays easily. The edges are sewn on a sewing machine, and an air bladder is placed inside.
- **Three target deformations**: C-shaped bending minimizes the distance between the two end nodes. S-shaped bending uses three nodes: it maximizes the outward deformation of two points at one third of the length from each end, and minimizes the deformation of one point at the middle of the end edge. Twisting fixes one end and moves the two nodes of the other end out of plane in opposite directions while pulling them toward the center line. For C- and S-shaped bending the optimal orientations of the top and bottom faces are the same; for twisting they differ.
- **Validation**: Abaqus finite element analysis and the two kinds of prototypes are compared against internal pressure: by the straight-line distance $r$ between the two ends for C-shaped bending, by the bending angle $\theta$ at the first inflection point for S-shaped bending, and by the twist angle $\theta$ for twisting. The paper states that all of them agree well.
- **Comparison with classical stripe designs**: With the same materials, the authors compared hand-designed transverse stripes for C-shaped bending and diagonal stripes for twisting. For C-shaped bending, the Turing design gives a shorter end-to-end distance and achieves the goal better. For twisting, the classical design twisted slightly more, but the two looked almost the same, and the authors write that the difference might be experimental or fabrication error. The conclusion is "equal or better", and the stated advantage is that non-intuitive shapes such as the S-shaped bend can be derived automatically.
- **Limitations (as stated by the authors)**: Gradient-based results are local optima. A black-and-white Turing pattern approximates the continuous orientation field and is made to suit the coarse resolution of fabric, so "best" performance is not guaranteed. The authors write that they prioritized ease of fabrication, light weight, and appearance.
- **Not in the paper**: Quantitative error against the target shape, repeated-pressurization or durability tests, shapes other than C-shaped bending, S-shaped bending, and twisting, and a demonstration of a large prototype are not shown. The motivation for fabric is scale, but scaling up itself remains a proposal ("proposes a scalable method").

## Method details

AI layer (compressed notation). All values are from the MDPaper body text.

- Optimization problem: min $J(\mathbf{u})$ over $a_{ij}(\mathbf{x})$ s.t. $a_{ij}\in[\delta_{ij}-1,1]$, $g_1=a_{11}+a_{22}+a_{33}-1\le0$, $g_2=a_{ij}^2-a_{ii}a_{jj}=0$ for (i,j)=(1,2),(1,3),(2,3). $g_2$ says the second and third invariants are 0, i.e. uniaxial orientation. Design variables are placed at the FE nodes.
- Rotated elasticity tensor: $C^t_{ijkl}=B_1a_{ij}a_{kl}+B_2(a_{ij}\delta_{kl}+a_{kl}\delta_{ij})+B_3(\ldots)+B_4\delta_{ij}\delta_{kl}+B_5(\delta_{ik}\delta_{jl}+\delta_{il}\delta_{jk})$. The $B_i$ are determined by the Young's moduli of the stiff and soft materials (formulas in Supplementary S2 of the earlier paper). The $C^t$ matrix (Voigt notation) in the MDPaper is garbled by OCR and cannot be read.
- Reaction-diffusion: $\partial U/\partial t=\nabla\cdot(\mathbf{D}_u\nabla U)+R_u$, $R_u=a_uU+b_uV+c_u-d_uU$ (same form for V). $\mathbf{D}_u=(L_u-W_u)\tilde{\mathbf{u}}\otimes\tilde{\mathbf{u}}+W_u\mathbf{I}$, $L_u=l_u^2W_u$, $W_u=(w_uw)^2$.
- Parameters: $l_u=l_v=1$, $w_u^2=0.02$, $w_v^2=0.5$, $w=0.12$, $a_u=0.08$, $b_u=0.08$, $c_u=0.04$, $d_u=0.03$, $a_v=0.1$, $b_v=0$, $c_v=-0.15$, $d_v=0.08$. $l$ is the magnitude of the anisotropy, $w_u,w_v$ are the channel pitch, and $w$ is the magnitude of lateral diffusion.
- The reaction-diffusion scheme comes from Dede, Zhou, and Nomura 2020 (Turing dehomogenization of microchannels, ref 39). Details of the orientation optimization are in Nomura 2019 and Zhou 2022 (refs 35, 36).
- Pressurizing the heat-bonded prototype: the main text says a one-way valve plus a Dewalt DCC020IB cordless inflator, while the caption of Fig. 1 says a syringe nozzle plus a pressure dispenser.
- Author contributions: M.T. wrote the shell FE and orientation-optimization programs and ran the numerical computations. Y.S. made the prototypes, ran the experiments, and did the Abaqus analysis. T.N. did the orientation optimization and the Turing pattern generation.

### Inconsistencies within the original

- **How the edge of the embroidered version is closed**: Methods says it is sewn on a sewing machine and an air bladder is inserted; Results says that for both methods a valve is attached and then the edge is sealed with a heat sealer.
- **Base material of the embroidery**: The Introduction says "Polyurethane polymer"; Materials and Table 2 say "spandex (mainly polyurethane)". These appear to be two names for the same thing.
- **Pressures in the twisting comparison**: The text says the classical design twisted slightly more "at 41 and 55 kPa", but the pressures printed in Fig. 8 are 34, 48, and 62 kPa. 41 and 55 kPa are values from Fig. 7 (C-shaped bending, 27, 41, 55 kPa), so this may be a typo in the text.
- **Name of the classical design**: The text says "transverse stripes" and "diagonal stripes"; the captions of Fig. 7 and 8 say "checkered pattern with reinforcement strips".
- **Table 2**: The table body is missing from the MDPaper. In the PDF: base material spandex 10 MPa, thickness 0.2 mm; reinforcement K-tech thread 70 GPa, filament diameter 12 μm.

## Figure notes

> [!figure] **Fig. 1** (img-0, img-4, img-5): Heat-bond fabrication, before and after pressurization
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-0.jpg|700]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-4.jpg|350]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-5.jpg|350]]
> - img-0 is (a), the optimized pattern: orange Dyneema cut into the pattern, laid on white TPU film. The blue dashed line is the fold line, and the pattern is mirror-symmetric about it.
> - The pattern has a row of elliptical rings in the middle, with branches extending from them perpendicular to the fold line like a comb.
> - img-4 and img-5 are (e) before and (f) after pressurization. A tube held by hand bends into a C shape after pressurization. The background is a cutting mat.
> - The photos of the laser cutter (b), heat press (c), and impulse sealer (d) in the original figure (img-1 to 3) are equipment photos and are omitted.

> [!figure] **Fig. 2** (img-6, img-7, img-8): Embroidery fabrication and the pressurizing rig
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-6.jpg|700]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-7.jpg|350]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-8.jpg|350]]
> - (a) A Turing pattern embroidered with gold Kevlar thread on spandex. The enlarged view shows the tatami stitches. The blue dashed line is the fold line.
> - (b) Tube structure. The embroidered fabric is folded along the fold line (orange dashed line), closed along the sewing line, and a red air bladder is placed inside. The yellow lines are the stiff Turing lines.
> - (c) Pressurizing rig. The lower end of the tube is fixed to a stand with an extension pipe and an air inlet. The photo on the right shows the embroidered tube standing up under pressure.

> [!figure] **Fig. 3** (img-9 to 20, img-22, img-25): From design to prototype for the three shapes
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-9.png|230]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-10.png|230]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-11.png|230]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-12.png|230]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-13.png|230]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-14.png|230]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-15.jpg|230]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-16.jpg|230]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-17.jpg|230]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-18.png|230]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-19.png|230]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-20.png|230]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-22.jpg|350]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-25.jpg|350]]
> - Columns are, from the left, C-shaped bending, S-shaped bending, and twisting. Rows are (a) to (d) from the top, and the bottom row shows (e) and (f) examples.
> - (a) img-9 to 11: mesh and objective function. The red points are the nodes used in the objective function. Dimensions of 300 mm and 40 mm are printed in the figure. The twisting case has one end clamped.
> - (b) img-12 to 14: optimized deformed shapes. A bow for C, an S that swings up and down about the center line, and a band twisted at one end.
> - (c) img-15 to 17: optimized orientation fields (short red lines). The blue dashed line is the fold line. For C-shaped bending, orientations perpendicular to the fold line line up in the middle.
> - (d) img-18 to 20: black-and-white Turing patterns made by reaction-diffusion. Black is the stiff material and white is the soft material. C-shaped bending gets stripes perpendicular to the fold line and a ring in the middle, S-shaped bending gets blocks of stripes in different directions, and twisting gets a maze-like pattern flowing diagonally.
> - (e) img-22: heat-bonded S-shaped bending prototype (orange is Dyneema). (f) img-25: embroidered S-shaped bending prototype (gold is Kevlar thread). Prototypes of all three shapes are in img-21 to 26.

> [!figure] **Fig. 4** (img-27 to 30): Validation of C-shaped bending
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-27.jpg|150]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-28.jpg|150]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-29.jpg|150]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-30.png|500]]
> - (a) Deformed shape from finite element analysis (rainbow contour). The black line is the straight-line distance $r$ between the two ends. (b) Heat-bonded and (c) embroidered prototypes photographed under pressure.
> - (d) Relationship between $r$ and internal pressure. Black is the analysis, red is heat bonding, blue is embroidery. In all three, $r$ becomes shorter (the tube bends more) as the pressure rises.
> - In the figure, the heat-bonded prototype has a shorter $r$ than the analysis, and the embroidered one is slightly longer. The text summarizes this as "close correlation" and does not discuss the cause of the differences.

> [!figure] **Fig. 5** (img-31 to 34): Validation of S-shaped bending
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-31.jpg|150]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-32.jpg|150]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-33.jpg|150]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-34.png|500]]
> - (a) Deformed shape from the analysis. The bending angle $\theta$ at the first inflection point is shown by a black line. (b) Heat-bonded and (c) embroidered prototypes.
> - (d) Relationship between $\theta$ and internal pressure. In all three, $\theta$ becomes smaller (bends more strongly) as the pressure rises. At the highest pressure, the analysis bends more than the prototypes.

> [!figure] **Fig. 6** (img-35 to 38): Validation of twisting
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-35.jpg|150]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-36.jpg|150]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-37.jpg|150]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-38.png|500]]
> - (a) Top view from the analysis. The angle between the vertical dashed line and the edge ridge is the twist angle $\theta$. (b) Heat-bonded and (c) embroidered prototypes photographed from above.
> - (d) Relationship between $\theta$ and internal pressure. In all three, the twist angle increases with pressure, and the three lines are close.

> [!figure] **Fig. 7** (img-39, 40, 41, 44): Comparison with the classical design for C-shaped bending
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-39.jpg|120]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-40.png|450]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-41.jpg|250]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-44.jpg|250]]
> - (a) img-39: classical design. Transverse Dyneema stripes, perpendicular to the tube's long axis, at equal intervals.
> - (b) img-40: end-to-end distance $r$ against internal pressure. Black is the classical design and red is the Turing design. At all three pressures, the Turing design has the shorter $r$.
> - (c) img-41: Turing design and (d) img-44: classical design, inflated to 27 kPa in front of a grid (the original shows three rows at 27, 41, and 55 kPa, img-41 to 46). The black line joins the two ends, and the green dots are tracking markers.

> [!figure] **Fig. 8** (img-47, 48, 49, 52): Comparison with the classical design for twisting
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-47.jpg|120]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-48.png|450]]
> ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-49.jpg|250]] ![[20_MDPapers/pdf-mistral-images/Tanaka et al. 2024 - Fabric soft pneumatic actuators with programmable turing pattern textures_img-52.jpg|250]]
> - (a) img-47: classical design. Diagonal Dyneema stripes in a row.
> - (b) img-48: twist angle against internal pressure. Black is the classical design and red is the Turing design. They are almost the same at the lowest pressure, and the classical design is slightly larger at the two higher pressures.
> - (c) img-49: Turing design (round spot-like pattern) and (d) img-52: classical design (diagonal stripes, with green markers), seen from the end face at 34 kPa (the original shows three rows at 34, 48, and 62 kPa, img-49 to 54). The angle between the two black lines is the twist angle.
> - The pressures printed in this figure do not match "41 and 55 kPa" in the text (see "Inconsistencies within the original").

## Related papers

- Tanaka et al. 2023 — the direct predecessor. It implemented the same orientation optimization and Turing patterning with g-DLP stereolithography. Motivated by the build-size limit, this paper moves to heat-bonded and embroidered fabric (ref 32 in the text).
- Montes Maestre et al. 2023 — inverse design of stripe patterns made differentiable. Its Fig. 12 shows an actuator with stiff stripes on fabric, comparable to the embroidery here. Note that ToRoS (Maestre et al. 2023, ref 30; topology optimization of robot skin), which this paper mentions as "another method", is a different paper.
- Panetta et al. 2021 — inverse design of target surfaces with parallel tubes made by welding two membranes. It makes in-plane shrinkage with weld lines, in contrast to this paper, which restrains stretch with stiff reinforcement.
- Ren et al. 2024 — a parallel study that inverse-designs inflatables whose weld lines between two membranes create in-plane shrinkage, using periodic homogenization. They do not cite each other, but both refer to ToRoS (Maestre et al. 2023).
- Zinatullin et al. 2025 — sews inextensible reinforcement into fabric pneumatic actuators to make bending and twisting, as here. This paper decides the orientation by an optimization with finite elements inside; that paper assigns the response of each unit cell by hand.
- Kamijo and Tachi 2024 — curvature design with programmable textiles. A different route to shaping with fabric.
- Wang and Chortos 2024 — proposes performance metrics for shape-morphing devices. This paper does not quantify the error against the target shape, so that framework could serve for such an evaluation.
- Aharoni et al. 2018 — inverse design of arbitrary surfaces from the orientation field of a liquid crystal elastomer sheet. A system this paper cites as an example of "special materials" (ref 17).
- Nojoomi et al. 2021 — makes 3D shapes from the swelling distribution of a flat hydrogel. An example of hydrogel systems this paper cites (ref 16).
- Klein et al. 2007, Kim et al. 2012, Efrati et al. 2009 — systems that shape sheets with a non-Euclidean metric. Refs 13 to 15 of this paper.
- Dudte et al. 2016, Choi et al. 2019 — design curvature with origami and kirigami tessellations. Refs 22 and 24 of this paper.
- Fofonjka and Milinkovitch 2021 — explains the scale pattern of lizards by reaction-diffusion on a growing domain. This paper cites it as an example of Turing patterns in nature (ref 26).
- Maini and Woolley 2019 — a review of Turing models of biological pattern formation. Background for the reaction-diffusion part.

## Notes

- Commentary (not in the original): With fabric, the interface between the stiff and soft parts can be a weak point: the Dyneema–TPU bond in the heat-bonded version, and the Kevlar thread–spandex stitching in the embroidered one. This paper does not test interface failure or durability.
- Commentary (not in the original): In the embroidered version, thread thickness, number of layers, and stitch density determine the effective stiffness of the reinforced part, which adds design variables. The analysis in this paper treats the stiff material with a uniform Young's modulus.
- The authors write that the larger the stiffness difference between the stiff and soft materials, the larger the motion, and that it was hard to find a heat-bondable combination with a large stiffness difference. For embroidery, they chose Kevlar considering needle thickness, stiffness, and compatibility with the base material.
- As future work, they list combining the same Turing design with driving forces other than air (such as shape memory).

---

This note is an English translation of the Japanese edition. The original paper is licensed under CC BY 4.0 (see `10_Reference/Papers/Paper sources and licenses.md`).
