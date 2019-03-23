class VideosController < ApplicationController
  before_action :set_video, only: [:edit, :update, :destroy]
  before_action :authenticate_user!, exception: [:show]

  def index
    @videos = Video.paginate(page: params[:page])
  end

  def show
    @video = Video.find(params[:id])
  end

  def create
    @video = Video.new(video_params)

    if @video.save
      render :show, status: :created, location: @video
    else
      render json: { errors: @video.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @video.update(video_params)
      render :show, status: :ok, location: @video
    else
      render json: { errors: @video.errors }, status: :unprocessable_entity
    end
  end

  def destroy
    @video.destroy
    head :no_content
  end

  private
    def set_video
      @video = current_user.videos.find(params[:id])
    end

    def video_params
      params.require(:video).permit(:name, :url).merge(user_id: current_user.id)
    end
end
