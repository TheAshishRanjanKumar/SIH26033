"""
SIH26033 - Agricultural ML Pipeline
Module: District Normalization
================================
Harmonizes naming variations and transliterations across Bihar's 38 official
administrative districts for both AGMARKNET mandi data and IMD/NRSC rainfall data.
"""

from typing import Optional, Dict

# Official 38 administrative districts of Bihar
BIHAR_38_DISTRICTS = {
    "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
    "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj",
    "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj",
    "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda",
    "Nawada", "Patna", "Purnea", "Rohtas", "Saharsa", "Samastipur",
    "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul",
    "Vaishali", "West Champaran"
}

# Lookup dictionary mapping lowercase raw variations to canonical Title Case district name
DISTRICT_SYNONYM_MAP: Dict[str, str] = {
    # AGMARKNET variations
    "west chambaran": "West Champaran",
    "east champaran/ motihari": "East Champaran",
    "kaimur/bhabhua": "Kaimur",
    "gopalgang": "Gopalganj",
    "kaithar": "Katihar",
    "munghair": "Munger",
    "luckeesarai": "Lakhisarai",
    "chhapra": "Saran",
    "purnea": "Purnea",
    "jehanabad": "Jehanabad",

    # Rainfall variations
    "pashchim champaran": "West Champaran",
    "pashchimi champaran": "West Champaran",
    "purbi champaran": "East Champaran",
    "kaimur (bhabua)": "Kaimur",
    "purnia": "Purnea",
    "jahanabad": "Jehanabad",
    "lakhisarai": "Lakhisarai",
    "munger": "Munger",
    "gopalganj": "Gopalganj",
    "katihar": "Katihar",
    "saran": "Saran",
    "kaimur": "Kaimur",
}

# Populate exact matches (case-insensitive) for all 38 districts
for dist in BIHAR_38_DISTRICTS:
    DISTRICT_SYNONYM_MAP[dist.lower()] = dist


def normalize_district(raw_name: Optional[str]) -> Optional[str]:
    """
    Normalizes any raw district string into the canonical Bihar district name.
    
    Args:
        raw_name: Raw string from dataset
        
    Returns:
        Canonical district name string, or None if unmappable.
    """
    if not raw_name or not isinstance(raw_name, str):
        return None
    
    clean = raw_name.strip().lower()
    return DISTRICT_SYNONYM_MAP.get(clean, None)


def validate_district_mapping(raw_names):
    """
    Validates that a collection of raw names all map successfully to Bihar 38 districts.
    Raises ValueError if any unknown district is found.
    """
    unmapped = []
    for name in raw_names:
        norm = normalize_district(name)
        if norm is None or norm not in BIHAR_38_DISTRICTS:
            unmapped.append(name)
    if unmapped:
        raise ValueError(f"Unmapped district names found: {set(unmapped)}")
    return True


if __name__ == "__main__":
    test_names = [
        "West Chambaran", "East Champaran/ Motihari", "Kaimur/Bhabhua", "Kaithar",
        "Pashchim Champaran", "Purbi Champaran", "Kaimur (Bhabua)", "Purnia", "Chhapra"
    ]
    for t in test_names:
        print(f"'{t}' -> '{normalize_district(t)}'")
    assert len(BIHAR_38_DISTRICTS) == 38, "Must have exactly 38 Bihar districts"
    print("District normalization module verified successfully.")

