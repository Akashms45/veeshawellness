// ── Types ─────────────────────────────────────────────────────────────────────

export type ProductCategory =
  | 'Tablets'
  | 'Capsules'
  | 'Softgel Capsules'
  | 'Paediatric Range'
  | 'Syrups'
  | 'Injections'
  | 'Creams & Ointments'
  | 'Eye Drops'
  | 'Others'
  | 'Ayurvedic';

export interface ProductItem {
  sno: number;
  composition: string;
  packing: string;
  mrp: number;
}

export interface ProductGroup {
  id: string;
  category: ProductCategory;
  color: string;          // accent color per card
  bgImage?: string;       // optional hero image for the stack card
  items: ProductItem[];
}

// ── Data (sourced from VWPL_PRODUCT_LIST.pdf — GST 2.0 revised MRPs) ─────────

export const products: ProductGroup[] = [
  {
    id: 'tablets',
    category: 'Tablets',
    color: '#233E8B',
    items: [
      { sno: 1,  composition: 'Cefixime 200mg + Ofloxacin 200mg',                                                          packing: '10×1×10 Alu Alu',        mrp: 2765.63 },
      { sno: 2,  composition: 'Cefixime 200mg + Lactic Acid Bacillus Dispersible Tabs',                                    packing: '10×10 Alu Alu',          mrp: 1218.75 },
      { sno: 3,  composition: 'Ofloxacin 200mg Tablets',                                                                   packing: '10×10 Blister',          mrp: 834.38 },
      { sno: 4,  composition: 'Ofloxacin 200mg + Ornidazole 500mg',                                                        packing: '10×10 Alu Alu',          mrp: 1359.38 },
      { sno: 5,  composition: 'Etoricoxib 90mg Tablet',                                                                    packing: '10×10 Alu Alu',          mrp: 1125.00 },
      { sno: 6,  composition: 'Etoricoxib 60mg + Thiocolchicoside 4mg',                                                    packing: '10×10 Blister',          mrp: 2250.00 },
      { sno: 7,  composition: 'Ondansetron 4mg Mouth Dissolving Tablet',                                                   packing: '10×10 Alu Alu',          mrp: 538.13 },
      { sno: 8,  composition: 'Levocetrizine 5mg',                                                                         packing: '10×10 Alu Alu',          mrp: 346.88 },
      { sno: 9,  composition: 'Deflazacort 6mg',                                                                           packing: '10×10 Alu Alu',          mrp: 1078.13 },
      { sno: 10, composition: 'Nimesulide 100mg + Paracetamol 325mg',                                                      packing: '20×10 Blister',          mrp: 1312.50 },
      { sno: 11, composition: 'Azithromycin 250mg',                                                                        packing: '10×1×6 Blister',         mrp: 733.59 },
      { sno: 12, composition: 'Azithromycin 500mg',                                                                        packing: '10×1×3 Blister',         mrp: 745.31 },
      { sno: 13, composition: 'Calcium Citrate 1000mg + Vitamin D3 200IU + Zinc 4mg + Magnesium Hydroxide 100mg',          packing: '10×10 Blister',          mrp: 656.25 },
      { sno: 14, composition: 'Amoxycillin 500mg + Potassium Clavulanate 125mg',                                           packing: '10×10 Alu Alu',          mrp: 1832.81 },
      { sno: 15, composition: 'Amoxycillin 500mg + Potassium Clavulanate 125mg + Lactic Acid Bacillus',                    packing: '10×10 Aluminium Foil',   mrp: 2437.50 },
      { sno: 16, composition: 'Paracetamol 325mg + Phenylephrine 5mg + Diphenhydramine 25mg + Caffeine Anhydrous 30mg',    packing: '10×10 Blister',          mrp: 703.13 },
      { sno: 17, composition: 'Aceclofenac 100mg + Paracetamol 325mg + Chlorzoxazone 250mg',                               packing: '10×10 Alu Alu',          mrp: 1012.50 },
      { sno: 18, composition: 'Trypsin 48mg + Bromelain 90mg + Rutoside Trihydrate 100mg + Diclofenac Sodium 50mg',        packing: '10×10 Alu Alu',          mrp: 1828.13 },
      { sno: 19, composition: 'Aceclofenac 100mg + Paracetamol 325mg + Serratiopeptidase 15mg',                            packing: '10×10 Alu Alu',          mrp: 984.38 },
      { sno: 20, composition: 'Aceclofenac 100mg + Paracetamol 325mg',                                                     packing: '10×10 Blister',          mrp: 703.13 },
      { sno: 21, composition: 'Ferrous Ascorbate (Iron 100mg) + Folic Acid 1.5mg + Zinc 22.5mg',                           packing: '10×10 Alu Alu',          mrp: 1031.25 },
      { sno: 22, composition: 'Fluconazole 150mg',                                                                         packing: '1×1×20 Blister',         mrp: 253.13 },
      { sno: 23, composition: 'Diclofenac 50mg + Paracetamol 325mg + Chloroxazone 250mg',                                  packing: '10×10 Blister',          mrp: 984.38 },
      { sno: 24, composition: 'Diclofenac 50mg + Paracetamol 325mg',                                                       packing: '20×10 Blister',          mrp: 1012.50 },
      { sno: 25, composition: 'Levocetrizine 5mg + Montelukast 10mg',                                                      packing: '10×10 Alu Alu',          mrp: 1312.50 },
      { sno: 26, composition: 'Cefpodoxime Proxetil 200mg',                                                                packing: '10×10 Alu Alu',          mrp: 2156.25 },
      { sno: 27, composition: 'Pantoprazole 40mg',                                                                         packing: '10×10 Alu Alu',          mrp: 796.88 },
      { sno: 28, composition: 'Paracetamol 650mg',                                                                         packing: '15×10 Blister',          mrp: 314.06 },
      { sno: 29, composition: 'Drotaverine 80mg + Mefenamic Acid 250mg',                                                   packing: '10×10 Blister',          mrp: 1200.00 },
      { sno: 30, composition: 'Collagen Peptide + Glucosamine Sulphate + Chondroitin Sulphate + Rosehip + Boswellia + Hyaluronic Acid + Curcumin + MSM + Vitamin D3 + Devils Claw + Celery + Vitamin C', packing: '10×1×10', mrp: 3514.71 },
      { sno: 31, composition: 'Cefuroxime Axetil 500mg IP',                                                                packing: '10×1×6',                 mrp: 3060.00 },
    ],
  },
  {
    id: 'capsules',
    category: 'Capsules',
    color: '#1a7a3a',
    items: [
      { sno: 1,  composition: 'Methylcobalamin 750mcg + Pregabalin 75mg',                                                       packing: '10×10 Alu Alu',  mrp: 1406.25 },
      { sno: 2,  composition: 'Methylcobalamin 1500mcg + Alpha Lipoic Acid 100mg + Thiamine 10mg + Pyridoxine 3mg + Folic Acid 1.5mg', packing: '10×1×10',    mrp: 1828.13 },
      { sno: 3,  composition: 'Doxycycline 100mg + Lactic Acid Bacillus',                                                       packing: '10×10 Alu Alu',  mrp: 1180.00 },
      { sno: 4,  composition: 'Itraconazole 100mg',                                                                             packing: '10×1×10 Alu Alu', mrp: 1743.75 },
      { sno: 5,  composition: 'Itraconazole 200mg',                                                                             packing: 'Alu',             mrp: 3000.00 },
      { sno: 6,  composition: 'Esomeprazole 40mg + Domperidone 30mg SR',                                                        packing: '10×10 Alu Alu',  mrp: 1406.25 },
      { sno: 7,  composition: 'Omeprazole 20mg + Domperidone 10mg',                                                             packing: '10×10 Alu Alu',  mrp: 581.25 },
      { sno: 8,  composition: 'Rabeprazole 20mg + Domperidone SR 30mg',                                                         packing: '10×10 Alu Alu',  mrp: 1171.88 },
      { sno: 9,  composition: 'Prebiotic & Probiotic',                                                                          packing: '10×10 Alu Alu',  mrp: 1067.76 },
      { sno: 10, composition: 'Pantoprazole 40mg EC + Domperidone 30mg SR',                                                     packing: '10×10 Alu Alu',  mrp: 1312.50 },
      { sno: 11, composition: 'Multivitamin + Multimineral + Antioxidants',                                                      packing: '10×10 Alu Alu',  mrp: 1245.72 },
    ],
  },
  {
    id: 'softgel',
    category: 'Softgel Capsules',
    color: '#9B2C8B',
    items: [
      { sno: 1, composition: 'Cholecalciferol 60000 IU Softgel',                                                                         packing: '10×1×4 Blister',  mrp: 1162.50 },
      { sno: 2, composition: 'Calcium Carbonate 500mg + Calcitriol + Vitamin K2-7 + Methylcobalamin + L-Methyl Folate + Zinc + Magnesium Softgel', packing: '10×1×10 Blister', mrp: 2062.50 },
      { sno: 3, composition: 'Ginseng + Multivitamin + Multimineral + Antioxidant Softgel',                                              packing: '10×1×10 Blister',  mrp: 1334.70 },
      { sno: 4, composition: 'Ginseng Extract + Green Tea + Grape Seed + Ginkgo Biloba + Garlic + Guggul + Ginger + Green Coffee Bean + Glycyrrhiza + Glutamic Acid + Glycine + L-Glutathione + Glutamine + Lycopene + Omega-3 + Vitamin B12 + Niacinamide + Calcium Ascorbate + Folic Acid + Biotin + L-Carnitine + Piperine Softgel', packing: '10×1×10', mrp: 2624.91 },
      { sno: 5, composition: 'Lycopene 4mg + Lutein 4mg + Betacarotene 5.17mg + Grape Seed Extract 10mg + Selenium 25mcg + Zinc 10mg Softgel', packing: '10×10 Blister',   mrp: 1406.25 },
    ],
  },
  {
    id: 'paediatric',
    category: 'Paediatric Range',
    color: '#C05621',
    items: [
      { sno: 1,  composition: 'Cefixime 50mg Dry Syrup',                                                          packing: '30ml WFI',  mrp: 51.00 },
      { sno: 2,  composition: 'Cefixime Trihydrate 50mg + Ofloxacin 50mg Dry Syrup',                              packing: '30ml WFI',  mrp: 89.06 },
      { sno: 3,  composition: 'Ofloxacin 50mg + Metronidazole 120mg + Simethicone 10mg Suspension',               packing: '60ml Carton', mrp: 84.38 },
      { sno: 4,  composition: 'Ondansetron 2mg/ml Suspension',                                                     packing: '30ml',      mrp: 37.50 },
      { sno: 5,  composition: 'Albendazole 200mg + Ivermectin 1.5mg Suspension',                                   packing: '10ml',      mrp: 42.19 },
      { sno: 6,  composition: 'Azithromycin 200mg/5ml Suspension',                                                 packing: '30ml',      mrp: 102.19 },
      { sno: 7,  composition: 'Amoxycillin 200mg + Potassium Clavulanate 28.5mg Dry Syrup',                        packing: '30ml WFI',  mrp: 62.81 },
      { sno: 8,  composition: 'Amoxycillin 400mg + Potassium Clavulanate 57mg Dry Syrup',                          packing: '30ml WFI',  mrp: 135.94 },
      { sno: 9,  composition: 'Paracetamol 125mg + Phenylephrine HCl 5mg + Chlorpheniramine 1mg Oral Solution',    packing: '60ml',      mrp: 67.50 },
      { sno: 10, composition: 'Ibuprofen 100mg + Paracetamol 162.5mg Oral Suspension',                             packing: '60ml',      mrp: 50.63 },
      { sno: 11, composition: 'Montelukast 4mg + Levocetrizine 2.5mg Suspension',                                  packing: '60ml',      mrp: 105.00 },
      { sno: 12, composition: 'Cefpodoxime Proxetil 100mg Dry Syrup',                                              packing: '30ml WFI',  mrp: 201.56 },
      { sno: 13, composition: 'Cefpodoxime Proxetil 50mg Dry Syrup',                                               packing: '30ml WFI',  mrp: 112.50 },
      { sno: 14, composition: 'Paracetamol 250mg Suspension',                                                      packing: '60ml',      mrp: 42.19 },
      { sno: 15, composition: 'Mefenamic Acid 100mg + Paracetamol 250mg Suspension',                               packing: '60ml',      mrp: 76.88 },
      { sno: 16, composition: 'Fungal Diastase + Pepsin + B-Complex Drops',                                        packing: '15ml',      mrp: 93.43 },
    ],
  },
  {
    id: 'syrups',
    category: 'Syrups',
    color: '#2C7A7B',
    items: [
      { sno: 1,  composition: 'Disodium Hydrogen Citrate BP 1.37gm/5ml (Sugar Free)',                                  packing: '100ml',          mrp: 89.06 },
      { sno: 2,  composition: 'Cyproheptadine HCl 2mg + Tricholine Citrate 275mg + Sorbitol 70%',                     packing: '200ml',          mrp: 140.63 },
      { sno: 3,  composition: 'Magaldrate 400mg + Simethicone 20mg Sugar Free Suspension (Mint)',                      packing: '170ml',          mrp: 92.81 },
      { sno: 4,  composition: 'Milk of Magnesia 3.75ml + Liquid Paraffin 1.25ml + Sodium Picosulfate 3.33mg',          packing: '170ml Carton',   mrp: 145.31 },
      { sno: 5,  composition: 'Dextromethorphan 10mg + Phenylephrine 5mg + CPM 2mg (Sugar Free) Syrup',               packing: '100ml',          mrp: 103.13 },
      { sno: 6,  composition: 'Levosalbutamol 1mg + Ambroxol 30mg + Guaiphenesin 50mg (Sugar Free) Syrup',            packing: '100ml',          mrp: 126.56 },
      { sno: 7,  composition: 'Ambroxol 15mg + Terbutaline 1.25mg + Guaiphenesin 50mg Cough Syrup (Sugar Free)',       packing: '100ml',          mrp: 101.25 },
      { sno: 8,  composition: 'Calcium Carbonate 625mg + Magnesium Hydroxide 180mg + Zinc Gluconate 14mg + Vitamin K2 + Cyanacobalamin + Vitamin D3 600IU', packing: '200ml Sugar Free', mrp: 177.07 },
      { sno: 9,  composition: 'Ferrous Ascorbate + Folic Acid Syrup (Sugar Free)',                                     packing: '200ml',          mrp: 140.63 },
      { sno: 10, composition: 'Tricholine Citrate 550mg + Sorbitol Solution 70% Non Crystallizing',                   packing: '200ml',          mrp: 141.48 },
      { sno: 11, composition: 'Vitamin B-Complex + L-Lysine + Zinc Syrup (Sugar Free)',                               packing: '200ml',          mrp: 133.47 },
      { sno: 12, composition: 'Silymarin 80% 70mg + Vit B1 + Vit B2 + Pyridoxine + Cyanocobalamin + Niacinamide + Choline Citrate 500mg + L-Ornithine L-Aspartate + Folic Acid + D-Panthenol', packing: '200ml', mrp: 195.76 },
      { sno: 13, composition: 'Multivitamin + Multimineral + Antioxidants Syrup (Sugar Free)',                         packing: '200ml',          mrp: 124.57 },
      { sno: 14, composition: 'Lycopene + Multivitamin + Multimineral + Antioxidants Syrup (Sugar Free)',              packing: '100ml',          mrp: 89.00 },
      { sno: 15, composition: 'Lycopene + Multivitamin + Multimineral + Antioxidants Syrup (Sugar Free)',              packing: '200ml',          mrp: 133.47 },
      { sno: 16, composition: 'Fungal Diastase + Pepsin Enzyme Syrup (Sugar Free)',                                   packing: '200ml',          mrp: 133.47 },
    ],
  },
  {
    id: 'injections',
    category: 'Injections',
    color: '#C53030',
    items: [
      { sno: 1,  composition: 'Nandrolone Decanoate 25mg',                                                           packing: '1ml Dispo',             mrp: 192.19 },
      { sno: 2,  composition: 'Nandrolone Decanoate 50mg',                                                           packing: '1ml Dispo',             mrp: 393.75 },
      { sno: 3,  composition: 'Methylcobalamin 1500mcg + Pyridoxine HCl 100mg + Niacinamide 100mg',                   packing: '5×2ml Blister',         mrp: 65.63 },
      { sno: 4,  composition: 'Methylcobalamin 2500mcg',                                                              packing: '2ml Dispo',             mrp: 121.88 },
      { sno: 5,  composition: 'Amikacin 500mg Inj',                                                                   packing: '1×2ml Carton',          mrp: 91.88 },
      { sno: 6,  composition: 'Piperacillin + Tazobactam 4.5gm Inj',                                                  packing: '4.5gm Tray Pack + WFI', mrp: 419.34 },
      { sno: 7,  composition: 'Diclofenac Sodium Injection 75mg/ml',                                                  packing: '10×1ml Tray',           mrp: 19.69 },
      { sno: 8,  composition: 'Pantoprazole 40mg Injection + Sterile 0.9% Sodium Chloride',                           packing: '40mg Dry + WFI',        mrp: 52.97 },
      { sno: 9,  composition: 'Ceftriaxone 1000mg Inj',                                                               packing: '1gm',                   mrp: 64.69 },
      { sno: 10, composition: 'Ceftriaxone 1000mg + Sulbactam 500mg',                                                 packing: '1.5gm',                 mrp: 196.88 },
    ],
  },
  {
    id: 'creams',
    category: 'Creams & Ointments',
    color: '#744210',
    items: [
      { sno: 1, composition: 'Clobetasol 0.05% + Neomycin 0.10% + Tolnaftate 1% + Iodochlorohydroxyquinoline 1% + Ketoconazole 2% + Dexpanthenol 0.05% Cream', packing: '15gm', mrp: 112.50 },
      { sno: 2, composition: 'Itraconazole 1% + Ofloxacin 0.75% + Ornidazole 2% + Clobetasol 0.05% Cream',                                                      packing: '15gm', mrp: 105.00 },
      { sno: 3, composition: 'Mupirocin 2% IP',                                                                                                                  packing: '5gm',  mrp: 103.13 },
      { sno: 4, composition: 'Metronidazole 1% + Sucralfate 7% + Povidone Iodine 5%',                                                                           packing: '15gm', mrp: 89.06 },
      { sno: 5, composition: 'Diclofenac Diethylamine 1.16% + Linseed Oil 3% + Methyl Salicylate 10% + Menthol 5% Gel',                                         packing: '30gm', mrp: 103.13 },
    ],
  },
  {
    id: 'eyedrops',
    category: 'Eye Drops',
    color: '#2B6CB0',
    items: [
      { sno: 1, composition: 'Carboxymethyl Cellulose Sodium 0.5% w/v Eye Drops',                                packing: '10ml', mrp: 92.81 },
      { sno: 2, composition: 'Moxifloxacin 0.5% w/v Eye Drops',                                                  packing: '5ml',  mrp: 103.13 },
      { sno: 3, composition: 'Moxifloxacin 0.5% + Dexamethasone 0.1% Eye Drops',                                 packing: '5ml',  mrp: 100.12 },
    ],
  },
  {
    id: 'others',
    category: 'Others',
    color: '#553C9A',
    items: [
      { sno: 1, composition: 'Cholecalciferol 60000 IU Nano Shots',       packing: '4×5ml',  mrp: 281.25 },
      { sno: 2, composition: 'Energy Drink (Orange Flavour)',              packing: '105gm',  mrp: 57.84 },
      { sno: 3, composition: 'Protein Powder Chocolate with DHA Sugar Free', packing: '200gm', mrp: 378.17 },
      { sno: 4, composition: 'Protein Powder Kesar Badam with DHA Sugar Free', packing: '200gm', mrp: 400.41 },
    ],
  },
  {
    id: 'ayurvedic',
    category: 'Ayurvedic',
    color: '#276749',
    items: [
      { sno: 1, composition: 'Herbal Liver, Alkaliser, Enzyme & Antacid Syrup',                                             packing: '225ml', mrp: 140.63 },
      { sno: 2, composition: 'Herbal Liver Tonic',                                                                          packing: '200ml', mrp: 140.63 },
      { sno: 3, composition: 'Herbal Pain Relief Oil',                                                                      packing: '60ml',  mrp: 117.19 },
      { sno: 4, composition: 'Carica Papaya 500mg + Tinospora Cordifolia 500mg + Tulsi 250mg + Kasis 30mg + Kiwi 25mg Syrup (Sugar Free)', packing: '200ml', mrp: 196.88 },
      { sno: 5, composition: 'Kidney Stone Removal Syrup',                                                                  packing: '200ml', mrp: 131.25 },
      { sno: 6, composition: 'Herbal Uterine Tonic',                                                                        packing: '200ml', mrp: 140.63 },
      { sno: 7, composition: 'Herbal Cough Syrup',                                                                          packing: '100ml', mrp: 103.13 },
    ],
  },
];