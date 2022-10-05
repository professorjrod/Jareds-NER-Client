from re import A
from flask import Flask
from flask import request
import spacy

nlp = spacy.load("en_core_web_sm")

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "I'm a little teapot"

@app.route("/demo", methods = ['POST'])
def api():
    if request.method == 'POST':
        # Get the input from the request
        
        input = request.get_json()
        

        # Sanitize the input
        # input['input'] = sanitize_5(input['input'].split(), ['a', 'the', 'an'])
        input = sanitize(input.split(), ['a', 'the', 'an'])
        # print(input['input'])

        # Process the input
        doc = nlp(" ".join(input))
        
        # Get the output
        tokens = []
        labels = []
        for entity in doc.ents:
            tokens.append(entity.text)
            labels.append(entity.label_)
        # print(output)
        # Return the output
        return {"tokens": tokens, "labels": labels}

def sanitize(unsanitized_input, ignored_words):
    """
    Take in two lists and santize first list to ensure it doesn't contain any
    items from the second list, return sanitized list
    """

    # Downsides:
    #   - Requires extra memory usage because original unsanitized_input is
    #     copied.  Also, the final memory usage is increased in this version by
    #     the number of words/characters that are NOT in the ignored_words
    #     because those are removed.

    # Copy input list (various ways to accomplish, but list() syntax is more
    # clear IMO)
    unsanitized_input = list(unsanitized_input)
    # unsanitized_input[:] = unsanitized_input
    # import copy
    # unsanitized_input = copy(unsanitized_input)

    ignored_words = set(ignored_words)
    for ignore in ignored_words.intersection(unsanitized_input):
        while ignore in unsanitized_input:
            unsanitized_input.remove(ignore)

    # Return is required now b/c we didn't touch the original list, we have our
    # own local copy that is unsanitized
    return unsanitized_input