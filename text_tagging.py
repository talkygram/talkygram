import spacy

def tag_words_and_sentences(text):
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(text)
    
    # iterate through each sentence in the document
    sentences = []
    for sent in doc.sents:
        sentences.append(sent.text)
    
    # iterate through each word in the document
    words = []
    for token in doc:
        word = {
            'text': token.text,
            'pos': token.pos_,
            'dep': token.dep_,
        }
        words.append(word)
    
    return {
        'sentences': sentences,
        'words': words
    }


stuff = tag_words_and_sentences("I am da boi! The top G said im cool. Theres no way im eating chicken today?")

print(stuff)