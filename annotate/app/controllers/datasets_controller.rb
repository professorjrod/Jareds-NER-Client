class DatasetController < ApplicationController
  def index
    render json: Dataset.all
  end

  def show
    render json: Dataset.find(params[:id])
  end
end
