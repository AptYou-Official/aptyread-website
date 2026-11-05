"""Rebuild the web fonts from the licensed originals with fonttools[woff]."""

from pathlib import Path
from string import ascii_letters

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


ASSETS = Path(__file__).resolve().parents[1] / "public" / "homepage"


def write_webfont(font, filename):
    font.flavor = "woff2"
    font.save(ASSETS / filename)


def build_nunito():
    font = TTFont(ASSETS / "NunitoSans-Variable.ttf", recalcTimestamp=False)
    # The site varies weight and optical size. Keep the full character set
    # and layout features, including ss01 for the single-storey brand "a".
    instantiateVariableFont(font, {"wdth": 100, "YTLC": 500}, inplace=True)
    write_webfont(font, "nunito-site.woff2")


def build_teaching_letters():
    font = TTFont(ASSETS / "Andika-Regular.ttf", recalcTimestamp=False)
    options = subset.Options()
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.name_languages = ["*"]
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(text=ascii_letters + " ")
    subsetter.subset(font)

    # The original's OFL reserves its family name. Give the derivative a
    # separate name, retaining the original attribution and license records.
    names = {1: "Apty Teaching Letters", 2: "Regular",
             3: "AptyTeachingLetters-Regular-1", 4: "Apty Teaching Letters",
             6: "AptyTeachingLetters-Regular"}
    for record in font["name"].names:
        if record.nameID in names:
            record.string = names[record.nameID].encode(record.getEncoding())
    write_webfont(font, "apty-teaching-letters.woff2")


if __name__ == "__main__":
    build_nunito()
    build_teaching_letters()
