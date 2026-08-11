import json
from typing import Optional

"""
[
    [
        country_l10n_key,
        [[rate_value, rate_type_l10n_key], ...],
        [source_url, ...]
    ], ...
]
"""
type VatRateIndex = list[
    tuple[
        str,
        list[
            tuple[int, str]
        ],
        list[str]
    ]
]

# Used in 'templates/elements/input-select.jinja'
type VatRateHtmlSelectCache = list[
    Optional[
        tuple[
            Optional[str],
            list[tuple[int, str, bool, bool]]
        ]
    ]
]


ALL_VAT_RATES: VatRateIndex = list()

VAT_RATES_SIMPLE_CACHE: VatRateHtmlSelectCache = list()
VAT_RATES_DETAILED_CACHE: VatRateHtmlSelectCache = list()


def load_vat_rates_json(file_path: str) -> VatRateIndex:
    global ALL_VAT_RATES
    global VAT_RATES_SIMPLE_CACHE
    global VAT_RATES_DETAILED_CACHE

    with open(file_path) as json_file:
        ALL_VAT_RATES = json.load(json_file)

    VAT_RATES_SIMPLE_CACHE = list()
    VAT_RATES_DETAILED_CACHE = list()

    for country_rates_info in ALL_VAT_RATES:
        VAT_RATES_SIMPLE_CACHE.append(
            (
                "commons.country." + country_rates_info[0],
                [
                    (
                        single_rate_info[0],
                        f"{single_rate_info[0]} %",
                        False, False
                    ) for single_rate_info in country_rates_info[1]
                ],
            )
        )
        VAT_RATES_DETAILED_CACHE.append(
            (
                "commons.country." + country_rates_info[0],
                [
                    (
                        single_rate_info[0],
                        f"{single_rate_info[0]} %",
                        False, False
                    ) for single_rate_info in country_rates_info[1]
                ],
            )
        )

    return ALL_VAT_RATES

# TODO: Implement on with parameters to select possible countries, at some point...
