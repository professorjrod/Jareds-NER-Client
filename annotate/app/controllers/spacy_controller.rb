class SpacyController < ApplicationController
  def test
    input_text = params[:input_text]
    @entities = `python lib/assets/python/spacy_test.py "#{input_text}"`
    render json: @entities, status: :ok
    # input = ' heart'
    # @heart = `python lib/assets/python/spacy_test.py "#{input}"`
    # render json: @heart, status: :ok
  end
end
