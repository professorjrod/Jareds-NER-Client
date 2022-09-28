# README

# How to import dataset texts from csv

> Make a dataset with the title of your dataset first
> Dataset.create(title: "Dataset 1")
>
> in rails console (rails c):

```
require 'csv'
dataset = Dataset.first
csv = CSV.read("path-to-your-data")
csv.each do |row|
  dataset.texts.build(text: row[0])
end
dataset.save
```

# How to set up python for spacy

# pip install -U spacy

# python -m spacy download en_Core_web_sm

# now you can import spacy
