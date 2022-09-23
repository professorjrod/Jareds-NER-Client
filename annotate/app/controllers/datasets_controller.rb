class DatasetsController < ApplicationController
  def show
    render json: Dataset.all
  end

  def index; end
end
