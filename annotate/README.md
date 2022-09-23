# README
# How to import dataset texts from csv
>Make a dataset with the title of your dataset first
>
>in rails console (rails c):
```
import 'csv'
dataset = Dataset.first
csv = CSV.read("path-to-your-data")
csv.each do |row|
  dataset.texts.build(text: row[0])
end
dataset.save
```

