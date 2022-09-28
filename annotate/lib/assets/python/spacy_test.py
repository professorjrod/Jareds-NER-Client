import sys
import spacy
input = sys.argv[1]
nlp = spacy.load('en_core_web_sm')

doc = nlp(input)

print(doc.ents)

