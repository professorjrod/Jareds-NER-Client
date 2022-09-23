# README

```import 'csv'
dataset = Dataset.first
csv = CSV.read("path-to-your-data")
csv.each do |row|
dataset.texts.build(text: row[0])
end```
\*dataset.save
