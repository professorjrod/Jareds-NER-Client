class DatasetTextsController < ApplicationController
  def show
    render json: DatasetText.find(params[:id]), status: :ok
  end
end
