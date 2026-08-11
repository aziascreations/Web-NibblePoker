import json

all_vat_data = [
            ["afghanistan",
                [[10, "standard"]], [
                "https://ard.gov.af/file_download/432/FAQs+of+VAT+English.pdf",
            ]],
            ["austria",
                [[10, "reduced"],[13, "reduced"],[20, "standard"]], [
                "https://www.usp.gv.at/en/themen/steuern-finanzen/umsatzsteuer-ueberblick/steuersaetze-und-steuerbefreiungen-der-umsatzsteuer.html",
            ]],
            ["belgium",
                [[6, "reduced"],[12, "intermediate"],[21, "standard"]], [
                "https://finance.belgium.be/en/enterprises/vat/vat-obligation/rates-and-calculation/vat-rates",
            ]],
            ["bulgaria",
                [[9, "reduced"],[20, "standard"]], [
                "https://www.bulgaria-tax-law.bg/vat-rates-eu-member-states.html"]],
            ["croatia",
                [[5, "reduced"],[13, "reduced"],[25, "standard"]], [
                "https://porezna-uprava.gov.hr/en/value-added-tax-h-e-reinafter-vat-information-on-the-general-rules-rates-and-exemptions-registering-for-and-paying-vat-obtaining-a-refund/7313",
            ]],
            ["cyprus",
                [[3, "reduced"],[5, "reduced"],[9, "reduced"],[19, "standard"]], [
                "https://www.mof.gov.cy/mof/tax/taxdep.nsf/All/6F2D9F654287FF02C2258251002C8130",
            ]],
            ["czechia",
                [[12, "reduced"],[21, "standard"]], [
                "https://portal.gov.cz/en/informace/general-rules-and-vat-rates-INF-205",
            ]],
            ["denmark",
                [[25, "standard"]], [
                "https://skat.dk/erhverv/moms/fradrag-for-moms",
            ]],
            ["estonia",
                [[9, "reduced"],[13, "reduced"],[24, "standard"]], [
                "https://www.emta.ee/en/business-client/taxes-and-payment/value-added-tax",
                "https://www.e-resident.gov.ee/blog/posts/a-guide-to-vat-for-e-residents/",
            ]],
            ["finland",
                [[10, "reduced"],[14, "reduced"],[25.5, "standard"]], [
                "https://www.vero.fi/en/businesses-and-corporations/taxes-and-charges/vat/rates-of-vat/",
            ]],
            ["france",
                [[2.1, "reduced"],[5.5, "reduced"],[10, "intermediate"],[20, "standard"]], [
                "https://www.economie.gouv.fr/cedef/les-fiches-pratiques/quels-sont-les-taux-de-tva-en-vigueur-en-france-et-dans-lunion",
            ]],
            ["france.corsica",
                [[0.9, "special"],[2.1, "reduced"],[5.5, "reduced"],[10, "intermediate"],[13, "special"],[20, "standard"]], [
                "https://www.economie.gouv.fr/particuliers/impots-et-fiscalite/gerer-mes-autres-impots-et-taxes/tva-quels-sont-les-taux-de-votre",
            ]],
            ["germany",
                [[7, "reduced"],[19, "standard"]], [
                "https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/Merkblaetter/2024-03-05-Umsatzsteuer-Merkblatt-Personenbefoerderung-Kraftomnibusse-englisch.pdf",
            ]],
            ["greece",
                [[6, "reduced.super"],[13, "reduced"],[24, "standard"]], [
                "https://www.gov.gr/en/sdg/taxes/vat/general/basic-vat-rates",
            ]],
            ["hungary",
                [[5, "preferential"],[18, "preferential"],[27, "standard"]], [
                "https://nav.gov.hu/pfile/file?path=/en/taxation/taxinfo/vat-liabilities-of-foreign-marketers-in-hungary",
            ]],
            ["ireland",
                [[4.8, "reduced"],[9, "reduced"],[13.5, "reduced"],[23, "standard"]], [
                "https://www.revenue.ie/en/vat/vat-rates/search-vat-rates/current-vat-rates.aspx",
            ]],
            ["italy",
                [[4, "reduced"],[5, "reduced"],[10, "reduced"],[22, "standard"]], [
                "https://www.agenziaentrate.gov.it/portale/web/english/nse/services/vat-mini-one-stop-shop/faq/vat-rates",
                "https://www.agenziaentrate.gov.it/portale/web/english/general-vat-rules-and-rates"
            ]],
            ["latvia",
                [[5, "reduced"],[12, "reduced"],[21, "standard"]], [
                "https://www.fm.gov.lv/lv/tax-rates",
            ]],
            ["lithuania",
                [[5, "reduced"],[9, "reduced"],[21, "standard"]], [
                "https://finmin.lrv.lt/en/competence-areas/taxation/main-taxes/value-added-tax/",
            ]],
            ["luxembourg",
                [[3, "reduced.super"],[8, "reduced"],[14, "intermediate"],[17, "standard"]], [
                "https://logistics.public.lu/en/formalities-procedures/taxes/value-added-tax/national-operations.html",
            ]],
            ["malta",
                [[5, "reduced"],[7, "reduced"],[12, "reduced"],[18, "standard"]], [
                "https://mtca.gov.mt/business-tax/vat1/vat-compliance/vat-rates/vat-rates",
            ]],
            ["monaco",
                [[2.1, "reduced"],[5.5, "reduced"],[10, "intermediate"],[20, "standard"]], [
                "https://monentreprise.gouv.mc/en/themes/accounting-obligations-and-tax/tax/vat",
                "https://www.economie.gouv.fr/particuliers/impots-et-fiscalite/gerer-mes-autres-impots-et-taxes/tva-quels-sont-les-taux-de-votre"
            ]],
            ["netherlands",
                [[9, "reduced"],[21, "standard"]], [
                "https://business.gov.nl/regulation/vat-rates-exemptions/",
            ]],
            ["poland",
                [[5, "reduced"],[8, "reduced"],[23, "standard"]], [
                "https://www.podatki.gov.pl/en/value-added-tax/general-vat-rules-and-rates/list-of-vat-rates/",
            ]],
            ["portugal",
                [[6, "reduced"],[13, "intermediate"],[23, "standard"]], [
                "https://www2.gov.pt/en/cidadaos-europeus-viajar-viver-e-fazer-negocios-em-portugal/impostos-para-atividades-economicas-em-portugal/imposto-sobre-valor-acrescentado-iva-em-portugal",
            ]],
            ["portugal.azores",
                [[4, "reduced"],[9, "intermediate"],[16, "standard"]], [
                "https://www2.gov.pt/en/cidadaos-europeus-viajar-viver-e-fazer-negocios-em-portugal/impostos-para-atividades-economicas-em-portugal/imposto-sobre-valor-acrescentado-iva-em-portugal",
            ]],
            ["portugal.madeira",
                [[5, "reduced"],[12, "intermediate"],[22, "standard"]], [
                "https://www2.gov.pt/en/cidadaos-europeus-viajar-viver-e-fazer-negocios-em-portugal/impostos-para-atividades-economicas-em-portugal/imposto-sobre-valor-acrescentado-iva-em-portugal",
            ]],
            ["romania",
                [[5, "reduced"],[9, "reduced"],[19, "standard"]], [
                "https://mfinante.gov.ro/referinte-tva",
                "https://www.mfinante.gov.ro/static/10/Mfp/legislatie/Ghid_TVA_parteaI.htm"
            ]],
            ["slovakia",
                [[5, "reduced"],[19, "reduced"],[23, "standard"]], [
                "https://www.slovensko.sk/en/life-situation/life-situation/_value-added-tax/",
            ]],
            ["slovenia",
                [[9.5, "reduced"],[22, "standard"]], [
                "https://www.fu.gov.si/en/taxes_and_other_duties/areas_of_work/value_added_tax_vat",
            ]],
            ["spain",
                [[4, "reduced"],[10, "reduced"],[21, "standard"]], [
                "https://sede.agenciatributaria.gob.es/Sede/en_gb/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html"
                "https://sede.agenciatributaria.gob.es/Sede/iva.html",
            ]],
            ["sweden",
                [[6, "reduced"],[12, "reduced"],[25, "standard"]], [
                "https://www.skatteverket.se/servicelankar/otherlanguages/englishengelska/businessesandemployers/startingandrunningaswedishbusiness/declaringtaxesbusinesses/vat/vatratesandvatexemption.4.676f4884175c97df419255d.html",
            ]],
        ]

print(json.dumps(all_vat_data))
