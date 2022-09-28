class DatasetTextAnnotationsController < ApplicationController
  # delete annotation from dataset first and create new annotation
  def post
    pp 'Destroying annotation'
    DatasetText.find(params[:dataset_text_id])&.annotations&.destroy_all
    pp 'Done!'
    params[:annotations].each_with_index do |annotation, i|
      pp 'Creating annotation'
      DatasetTextAnnotation.create!(dataset_text_id: params[:dataset_text_id],
                                    selection_start: annotation[:selection_start], selection_end: annotation[:selection_end], tag: annotation[:tag], text: annotation[:text])
      pp "Created annotation #{i}"
      pp 'Setting is_annotated to true'
      DatasetText.find(params[:dataset_text_id]).update(is_annotated: true)
      pp 'Done!'
    end
    pp 'Done creating annotations'
    render json: { dataset_text_id: params[:dataset_text_id], annotations: params[:annotations] }, status: :created
  end

  private

  def dataset_text_annotation_params
    params.permit(:dataset_text_id, annotations: [])
  end
end
